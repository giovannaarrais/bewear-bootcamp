import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Header from "@/components/common/header";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Addresses from "./components/addresses";

const IdentificatonPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session?.user.id),
    with: {
      items: true,
    },
  });


  // verifica se user possui carrinho ou itens no carrinho
  // se nao redireciona para a pagina home
  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  return(
    <>
      <Header />

      <div className="px-5">
        <Addresses />
      </div>

    </>
  )
  ;
};

export default IdentificatonPage;
