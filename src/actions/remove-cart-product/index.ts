"use server"

import { eq } from 'drizzle-orm';
import { headers } from "next/headers"

import { db } from '@/db';
import { auth } from "@/lib/auth"

import { cartItemTable } from './../../db/schema';
import { removeProductFromCartSchema } from './schema';
import { revalidatePath } from 'next/cache';

// Função para remover um produto do carrinho
export const removeProductFromCart = async (data: removeProductFromCartSchema) => {
    
    // Primeiro, verificamos se os dados que chegaram estão corretos
    removeProductFromCartSchema.parse(data)
    
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

    // se essa carrinho n for do user logado ele gera erro
    const cartDoesNotBelongToUser = cartItem?.cart.userId !== session.user.id;
    if(cartDoesNotBelongToUser){
        throw new Error("Unauthorized")
    }

    if(!cartItem){
        throw new Error("Cart Item not found in cart")
    }

    // Deletar o produto com o id clicado
    if(cartItem){
        await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id))

        revalidatePath("/cart") // força revalidação da rota (por exemplo: /cart)
    }
}
