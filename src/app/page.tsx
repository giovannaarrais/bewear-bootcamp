import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Parceiros from "@/components/common/parceiros";
import ProductsList from "@/components/common/products-list";
import { getCategories } from "@/data/categories/get";
import { getNewlyCreatedProducts, getProducts } from "@/data/products/get";

export default async function Home() {
  // como uma query nao depende da outra 
  const [products, newlyCreatedProducts, categories] = await Promise.all([
    getProducts(), // capturar produtos do banco e suas variantes e categorias
    getNewlyCreatedProducts(), // ordernacao decrescente das datas de criacao da table de produtos
    getCategories(),
  ])

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
          <CategorySelector categories={categories} />
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
