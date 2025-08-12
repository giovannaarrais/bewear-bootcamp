import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductsList from "@/components/common/products-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import {  productTable, productVariantTable } from "@/db/schema";
import { FormatCentsToBRL } from "@/helpers/money";

interface ProductVariantPageProps {
    params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
    const { slug } = await params;

    // tras as variantes do produto
    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.slug, slug),
        with: {
            // e tras o produto a qm essa variante pertence
            product: true
        }
    });

    if (!productVariant) {
        return notFound();
    }

    // captura os produtos dessa mesma categoria que pertence ao produto visualizado
    const likelyProducts = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: {
            variants: true
        }
    })

    return (
        <div>
            <Header />
            
            <div className="flex flex-col space-y-6 px-5">
                <Image
                    src={productVariant.imageUrl[0] || ''}
                    alt={productVariant.name}
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="h-auto w-full"
                />
            </div>

            {/* VARIANTES */}
            <div className="px-5">
                
            </div>

            <div className="px-5 space-y-7 mb-6">
                {/* DESCRICAO */}   
                <div className="desc">
                    <h3 className="text-lg font-semibold">
                        {productVariant.product.name}
                    </h3>
                    <h2 className="text-muted-foreground text-sm">
                        {productVariant.name}
                    </h2>
                    <h3 className="text-lg font-semibold">
                        {FormatCentsToBRL(productVariant.priceInCents)}
                    </h3>
                </div>

                {/* QUANTIDADE DESEJADA */}
                <div>

                </div>
                
                {/* ACOES */}
                <div className="space-y-3 flex flex-col">
                    <Button variant="outline" className="rounded-3xl py-6 font-semibold"> 
                        Adicionar à sacola 
                    </Button>
                    <Button variant="default" className="rounded-3xl py-6 font-semibold"> 
                        Comprar Agora 
                    </Button>
                </div>

                <div className="">
                    <p className="text-sm">
                        {productVariant.product.description}
                    </p>
                </div>
            </div>

            {/* Lista de produtos com a mesma categoria */}
            <ProductsList products={likelyProducts} title="Você tambêm pode gostar"/>

            <Footer />

        </div>
    );
};

export default ProductVariantPage;
