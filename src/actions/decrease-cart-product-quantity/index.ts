"use server"

import { eq } from 'drizzle-orm';
import { headers } from "next/headers"

import { db } from '@/db';
import { auth } from "@/lib/auth"

import { cartItemTable } from './../../db/schema';
import { decreaseCartProductQuantitySchema } from './schema';

// Função para adicionar um produto ao carrinho
export const decreaseCartProductQuantity = async (data: decreaseCartProductQuantitySchema) => {
    
    // Primeiro, verificamos se os dados que chegaram estão corretos
    decreaseCartProductQuantitySchema.parse(data)
    
    // Agora, vamos ver quem é o usuário que está tentando adicionar ao carrinho
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    // Se não tiver ninguém logado, não podemos continuar
    if(!session?.user){
        throw new Error("Unauthorized") // "Você não pode fazer isso sem estar logado!"
    }

    // Agora vamos ver se o produto já está no carrinho
    const cartItem = await db.query.cartItemTable.findFirst({
        where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
        // verificar se é o carrinho do usuario
        with: {
            cart: true,
        }
    })

    if(!cartItem){
        throw new Error("Cart Item not found in cart")
    }

    // se essa carrinho n for do user logado ele gera erro
    const cartDoesNotBelongToUser = cartItem.cart.userId !== session.user.id;
    if(cartDoesNotBelongToUser){
        throw new Error("Unauthorized")
    }

   // Deletar o produto com o id clicado
    if(cartItem.quantity == 1){
        await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
        return;
    }

    // se a quantidade for maior do que 1 ele diminui a quantidade
    await db.
        update(cartItemTable)
        .set({ quantity: cartItem.quantity - 1 })
        .where(eq(cartItemTable.id, cartItem.id))
}
