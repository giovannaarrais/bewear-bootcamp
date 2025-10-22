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
  ]);

  return (
    <>
      <div className="hidden p-5 pt-0 sm:block">
        <CategorySelectorDesktop categories={categories} />
      </div>

      <div className="space-y-15">
        <Image
          src="/destaque-dk.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="max-h-[800px] w-full object-cover object-top px-5 md:rounded-l-4xl md:rounded-b-4xl"
        />

        <Parceiros />

        <ProductsList products={products} title="Mais vendidos" />

        <div className="block p-5 sm:hidden">
          <CategorySelector categories={categories} />
        </div>

        <Image
          src="/banner-2.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="block h-auto w-full px-5 sm:hidden"
        />

        <div className="hidden sm:block">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 md:flex-row">
            {/* Coluna Esquerda */}
            <div className="flex flex-1 flex-col gap-4">
              <Image
                src="/destaque-mini-dk.png"
                alt="Nike Therma FIT Headed"
                width={513}
                height={307}
                className="h-auto w-full rounded-lg object-cover shadow-sm"
              />
              <Image
                src="/destaque-mini-dk2.png"
                alt="Nike Therma FIT Headed"
                width={513}
                height={307}
                className="h-auto w-full rounded-lg object-cover shadow-sm"
              />
            </div>

            {/* Coluna Direita */}
            <div className="flex flex-2">
              <Image
                src="/destaque-minibottom-dk.png"
                alt="Nike Therma FIT Headed"
                width={1026}
                height={614}
                className="h-full w-full rounded-lg object-cover shadow-sm"
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
