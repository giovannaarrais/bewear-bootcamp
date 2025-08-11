import Image from "next/image";
import Link from "next/link";
import React from "react";

import { productTable, productVariantTable } from "@/db/schema";
import { FormatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductsItemProps {
    product: typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    };
// variavel q carrega estilo para outros components
    textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductsItemProps) => {
    const firstVariant = product.variants[0];

    return (
        <Link 
            href={`/product-variant/${firstVariant.slug}`} className="flex flex-col gap-4"
        >
            <Image
                src={firstVariant.imageUrl[0]}
                alt={firstVariant.name}
                sizes="100vw"
                width={0}
                height={0}
                className="h-auto w-full rounded-3xl"
            />

{/* permite q em outros lugares q for reutilizar esse component seja possivel add mais estilo */}
            <div className={cn(
                "flex flex-col gap-1 max-w-[200px]",
                textContainerClassName,
                )}
                >
                {/* truncate: tres prontinhos para n ocorre quebra de texto */}
                <p className="truncate text-sm font-medium">
                    {product.name}
                </p>
                <p className="text-muted-foreground truncate text-xs font-medium">
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
