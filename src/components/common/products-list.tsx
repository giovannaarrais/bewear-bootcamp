"use client"

import React from 'react';

import { productTable, productVariantTable } from '@/db/schema';

import ProductItem from './product-item';

// tipagem de informacoes
// resgata table de products e informa q vai ter uma lista da própria
// tbm informa os produtos possuem variants (cor, modelo, tamanho)
interface ProductsListProps {
    title: string;
    products: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[];
    })[];
}


const ProductsList = ({ title, products }: ProductsListProps) => {
    return (
        <div className='space-y-6'>
            <h3 className='font-semibold px-5 '>{title}</h3>
                <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden ">
                    {/* para cada produto ele vai renderizar a estruta ProductItem */}
                    {products.map(product => (
                        <ProductItem 
                            key={product.id}                    
                            product={product}
                        />
                    ))}
            </div>

        </div>
    );
};

export default ProductsList;