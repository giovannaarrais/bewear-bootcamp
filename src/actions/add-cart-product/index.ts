"use server"
import { eq } from 'drizzle-orm';
import { headers } from "next/headers"

import { db } from '@/db';
import { auth } from "@/lib/auth"

import { cartItemTable, cartTable } from './../../db/schema';
import { addProductToCartSchema } from "./schema"

// Função para adicionar um produto ao carrinho
export const addProductToCart = async (data: addProductToCartSchema) => {
    
    // Primeiro, verificamos se os dados que chegaram estão corretos
    addProductToCartSchema.parse(data)
    
    // Agora, vamos ver quem é o usuário que está tentando adicionar ao carrinho
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    // Se não tiver ninguém logado, não podemos continuar
    if(!session?.user){
        throw new Error("Unauthorized") // "Você não pode fazer isso sem estar logado!"
    }

    // Verifica se o produto que queremos adicionar existe de verdade
    const productVariant = await db.query.productVariantTable.findFirst({
        where: (productVariant, {eq}) => eq(productVariant.id, data.productVariantId)
    })
    
    // Se o produto não existe, damos um erro
    if(!productVariant){
        throw new Error("Product Variant not found") // "Produto não encontrado!"
    }

    // Vamos ver se o usuário já tem um carrinho criado
    const cart = await db.query.cartTable.findFirst({
        where: (cart, {eq}) => eq(cart.userId, session.user.id)
    });
    
    // Precisamos do ID do carrinho para colocar o produto
    let cartId: string;

    // Se o usuário não tem carrinho, criamos um novo
    if(!cart){
        const [newCart] = await db
            .insert(cartTable)
            .values({
                userId: session.user.id, // colocamos que esse carrinho é do usuário
            })
            .returning();
        cartId = newCart.id // guardamos o ID do novo carrinho
    } else {
        cartId = cart.id; // Se já existe, usamos o ID do carrinho antigo
    }

    // Agora vamos ver se o produto já está no carrinho
    const cartItem = await db.query.cartItemTable.findFirst({
        where: (cartItem, { eq }) => 
            eq(cartItem.cartId, cartId) && // dentro do carrinho certo
            eq(cartItem.productVariantId, data.productVariantId) // e é o produto certo
    })

    // Se o produto já está no carrinho, só aumentamos a quantidade
    if(cartItem){
        await db
            .update(cartItemTable)
            .set({
                quantity: cartItem.quantity + data.quantity // somamos a quantidade nova
            })
            .where(eq(cartItemTable.id, cartItem.id))

        return; // terminamos aqui, não precisa adicionar de novo
    }

    // Se o produto não está no carrinho, adicionamos como novo item
    await db.insert(cartItemTable).values({
        cartId, // dentro do carrinho certo
        productVariantId: data.productVariantId, // qual produto é
        quantity: data.quantity // quantos produtos
    })
}
