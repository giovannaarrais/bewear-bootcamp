import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { cartItemTable, cartTable, orderTable } from "@/db/schema";

export const POST = async (request: Request) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.error();
    }

    // verifica se a requisicao veio do stripe
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.error();
    }

    const text = await request.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Event type:", event.type);

    // se o pagamento for concluido com sucesso ele atualiza o status do pedido
    if (event.type == "checkout.session.completed") {
        console.log("Checkout session completed!");

        const session = event.data.object;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
            return NextResponse.error();
        }

        // Busca o pedido para obter o userId
        const order = await db.query.orderTable.findFirst({
            where: eq(orderTable.id, orderId),
        });

        if (!order) {
            console.error("Order not found:", orderId);
            return NextResponse.error();
        }

        // Atualiza o status do pedido para "paid"
        await db
            .update(orderTable)
            .set({
                status: "paid",
            })
            .where(eq(orderTable.id, orderId));

        // Busca o carrinho do usuário para excluir
        const cart = await db.query.cartTable.findFirst({
            where: eq(cartTable.userId, order.userId),
        });

        if (cart) {
            // Exclui os itens do carrinho e o carrinho em uma transação
            await db.transaction(async (tx) => {
                // Deleta os itens do carrinho
                await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));

                // Deleta o carrinho
                await tx.delete(cartTable).where(eq(cartTable.id, cart.id));
            });

            console.log("Cart cleared for user:", order.userId);
        }
    }

    return NextResponse.json({ received: true });
};
