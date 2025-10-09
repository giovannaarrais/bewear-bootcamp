import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import CategorySelectorDesktop from "@/components/common/category-selector-desktop";
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

      <div className="p-5 pt-0 sm:block hidden">
          <CategorySelectorDesktop categories={categories} />
        </div>

      <div className="space-y-15">
        <Image
          src="/destaque-dk.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className=" w-full px-5 object-cover object-top max-h-[800px] md:rounded-b-4xl md:rounded-l-4xl"
        />

        <Parceiros />

        <ProductsList products={products} title="Mais vendidos" />

        <div className="p-5 sm:hidden block">
          <CategorySelector categories={categories} />
        </div>

        <Image
          src="/banner-2.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full px-5 sm:hidden block"
        />

        <div className="sm:block hidden">
          <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto p-4">
            {/* Coluna Esquerda */}
            <div className="flex flex-col gap-4 flex-1">
              <Image
                src="/destaque-mini-dk.png"
                alt="Nike Therma FIT Headed"
                width={513}
                height={307}
                className="w-full h-auto rounded-lg object-cover shadow-sm"
              />
              <Image
                src="/destaque-mini-dk2.png"
                alt="Nike Therma FIT Headed"
                width={513}
                height={307}
                className="w-full h-auto rounded-lg object-cover shadow-sm"
              />
            </div>

            {/* Coluna Direita */}
            <div className="flex-2 flex">
              <Image
                src="/destaque-minibottom-dk.png"
                alt="Nike Therma FIT Headed"
                width={1026}
                height={614}
                className="w-full h-full rounded-lg object-cover shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* EXIBICAO DA LISTA DE PRODUTOS MAIS RECENTES */}
        <ProductsList products={newlyCreatedProducts} title="Novos Produtos" />
      </div>

      <Footer />
    </>
  );
}
