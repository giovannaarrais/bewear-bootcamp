import Image from "next/image";
import Link from "next/link";
import React from "react";

import { productTable, productVariantTable } from "@/db/schema";
import { FormatCentsToBRL } from "@/helpers/money";

interface ProductsItemProps {
    product: typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    };
    }

    const ProductItem = ({ product }: ProductsItemProps) => {
    const firstVariant = product.variants[0];

    return (
        <Link href="/" className="flex flex-col gap-4">
            <Image
                src={firstVariant.imageUrl[0]}
                alt={firstVariant.name}
                width={200}
                height={200}
                className="rounded-3xl"
            />

            <div className="flex flex-col gap-1 max-w-[200px]">
                {/* truncate: tres prontinhos para n ocorre quebra de texto */}
                <p className="truncate text-sm font-medium">
                    {product.name}
                </p>
                <p className="font-muted-foreground truncate text-xs font-medium">
                    {product.description}
                </p>
                <p className="truncate text-sm font-medium">
                    {FormatCentsToBRL(firstVariant.priceInCents)}
                </p>
            </div>
        </Link>
    );    
};

export default ProductItem;
