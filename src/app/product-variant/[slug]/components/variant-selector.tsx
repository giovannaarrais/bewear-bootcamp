import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { productVariantTable } from '@/db/schema';

// Essa interface significa que variants deve ser um array contendo registros retornados pelo SELECT na tabela productVariantTable.
interface VariantSelectorProps{
    variants: (typeof productVariantTable.$inferSelect[])
}

const VariantSelector = async ({ variants }: VariantSelectorProps) => {

    return (
        <div className='flex items-center gap-2 mt-3'>
            {variants.map((variant) => (
                <Link 
                    href={`/product-variant/${variant.slug}`} 
                    key={variant.id}
                >
                    <Image
                        src={variant.imageUrl[0] || ''}
                        alt={variant.name}
                        width={60}
                        height={60}
                        className='rounded-xl'
                    />
                </Link>
            ))}
        </div>
    );
};

export default VariantSelector;