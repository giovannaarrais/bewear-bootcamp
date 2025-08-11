import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";

import Header from "@/components/common/header";
import { db } from "@/db";
import {  productVariantTable } from "@/db/schema";
import Image from "next/image";

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
                    className="h-auto w-full rounded-3xl"
                />

            </div>
        </div>
    );
};

export default ProductVariantPage;
