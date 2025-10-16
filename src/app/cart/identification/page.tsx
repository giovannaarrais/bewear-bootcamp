import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { useState } from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";
import { cartItemTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Resume from "../components/resume";
import Addresses from "./components/addresses";

const IdentificatonPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true, // trazer informacoes do endereço do carrinho
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });


  // verifica se user possui carrinho ou itens no carrinho
  // se nao redireciona para a pagina home
  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0, // ← VALOR INICIAL AQUI
  );

  // Tecnica para evitar refresh demorado de pagina
  // envia os dados do server component para o component addresses diretamente
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });


  return (
    <div className="space-y-12">
      <Header />

      <div className="flex flex-col gap-6 space-y-3 px-5 lg:flex-row-reverse">
        <div className="flex-1 space-y-5">
          <Resume
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
          />
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddress?.id || null}
          />
        </div>

        <CartSummary
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl[0],
            cartItemId: item.id
          }))}
        />
      </div>

      <Footer />
    </div>
  );
};

export default IdentificatonPage;
