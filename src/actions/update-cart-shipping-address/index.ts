"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

/**
 * Atualiza o endereço de entrega associado ao carrinho do usuário
 * @param data - Dados contendo o ID do endereço de entrega
 * @returns Objeto com sucesso da operação
 */
export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  // Valida os dados de entrada usando o schema Zod
  updateCartShippingAddressSchema.parse(data);

  // Obtém a sessão do usuário autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Verifica se o usuário está autenticado
  if (!session?.user) {
    throw new Error("Unauthorized!");
  }

  // Busca o endereço de entrega no banco de dados
  // Verifica se o endereço pertence ao usuário autenticado
  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: (shippingAddress, { eq, and }) =>
      and(
        eq(shippingAddress.id, data.shippingAddressId),
        eq(shippingAddress.userId, session.user.id),
      ),
  });

  // Valida se o endereço foi encontrado e pertence ao usuário
  if (!shippingAddress) {
    throw new Error("Shipping Address not found ou unauthorized!");
  }

  // Busca o carrinho do usuário no banco de dados
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
  });

  // Verifica se o carrinho existe
  if (!cart) {
    throw new Error("Cart not found!");
  }

  // Atualiza o carrinho com o novo endereço de entrega
  await db
    .update(cartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(cartTable.id, cart.id));

  // Retorna confirmação de sucesso
  return { success: true };
};
