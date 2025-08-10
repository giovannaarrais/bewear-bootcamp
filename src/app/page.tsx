import Image from "next/image";

import Header from "@/components/common/header";
import ProductsList from "@/components/common/products-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

export default async function Home() {
  
  // capturar produtos do banco e suas variantes e categorias
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    }
  })

  return (
    <>
      <Header/> 

      <div className="space-y-6">
        <Image
          src="/banner-1.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5 "
        />

        <ProductsList products={products} title="Mais vendidos"/>

        <Image
          src="/banner-2.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5 "
        />
      </div>
    </>
  );
}