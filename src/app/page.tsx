import Image from "next/image";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import ProductsList from "@/components/common/products-list";

export default async function Home() {
  // capturar produtos do banco
  const products = await db.query.productTable.findMany({})

  return (
    <>
      <Header/> 

      <div className="px-5 space-y-6">
        <Image
          src="/banner-1.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full "
        />

        <ProductsList products={products} title="Meus produtos"/>

        <Image
          src="/banner-2.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full "
        />
      </div>
    </>
  );
}