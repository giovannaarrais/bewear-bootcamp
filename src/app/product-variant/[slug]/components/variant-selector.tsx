import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { productVariantTable } from "@/db/schema";

// Essa interface significa que variants deve ser um array contendo registros retornados pelo SELECT na tabela productVariantTable.
interface VariantSelectorProps {
    selectedVariantSlug: string; // variavel q carrega a variante selecionado: 
    variants: (typeof productVariantTable.$inferSelect)[];
}


const VariantSelector =  ({ variants, selectedVariantSlug }: VariantSelectorProps) => {
    // selectorVariants - indentifica qual a variante selecionada

    return (
        <div className="mt-3 flex items-center gap-2">
        {variants.map((variant) => (
            <Link 
                href={`/product-variant/${variant.slug}`} 
                key={variant.id}
                className={selectedVariantSlug == variant.slug ? 'border-gray-500 border-2 rounded-xl' : ''}
            >
            <Image
                src={variant.imageUrl[0] || ""}
                alt={variant.name}
                width={60}
                height={60}
                className="rounded-xl"
            />
            </Link>
        ))}
        </div>
    );
};

export default VariantSelector;
