"use server"

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from 'stripe'

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
    CreateCheckoutSessionSchema,
    createCheckoutSessionSchema,
} from "./schema";

export const createCheckoutSession = async ( data: CreateCheckoutSessionSchema ) => {
    if(!process.env.STRIPE_SECRET_KEY){
        throw new Error("Unauthorized")
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user.id) {
        throw new Error("Unauthorized");
    }

    const { orderId } = createCheckoutSessionSchema.parse(data)

    const order = await db.query.orderTable.findFirst({
        where: eq(orderTable.id, orderId)
    })
    if (!order){
        throw new Error("Order not found")
    }
    if (order.userId != session.user.id){
        throw new Error("Unauthorized")
    }

    // pega os itens do carrinho do usuário
    const orderItems = await db.query.orderItemTable.findMany({
        where: eq(orderItemTable.orderId, orderId),
        with: {
            productVariant: {
                with: {
                    product: true
                }
            }
        }
    })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // CRIAÇÃO DA SESSION e Configs de pagamento
    const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`, // se o pedido for concluido com sucesso
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`, // se cancelar o pagamento
        metadata: {
            orderId
        },
        line_items: orderItems.map(orderItem => {
            return {
                // INFORMAÇÕES
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
                        description: orderItem.productVariant.product.description,
                        images: orderItem.productVariant.imageUrl,
                    },
                    // em centavos
                    unit_amount: orderItem.priceInCents,
                },
                // QUANTIDADE
                quantity: orderItem.quantity
            }
        })
    })

    return checkoutSession;
};
