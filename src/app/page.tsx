import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Header from "@/components/common/header";
import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { desc } from "drizzle-orm";
import { productTable } from "@/db/schema";
import Footer from "@/components/common/footer";
import Parceiros from "@/components/common/parceiros";

export default async function Home() {
  // capturar produtos do banco e suas variantes e categorias
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

  // ordernacao decrescente das datas de criacao da table de produtos
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 4,
    with: {
      variants: true
    }
  })

  const categories = await db.query.categoryTable.findMany({})

  return (
    <>
      <Header />

      <div className="space-y-6">
        <Image
          src="/banner-1.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5"
        />

        <Parceiros />

        <ProductsList products={products} title="Mais vendidos" />

        <div className="p-5">
          <CategorySelector categories={categories}/>
        </div>

        <Image
          src="/banner-2.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5"
        />

          {/* EXIBICAO DA LISTA DE PRODUTOS MAIS RECENTES */}
        <ProductsList products={newlyCreatedProducts} title="Novos Produtos" />
      </div>

      <Footer />
    </>
  );
}
