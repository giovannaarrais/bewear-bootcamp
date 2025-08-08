"use client"

import React from 'react';

import { productTable, productVariantTable } from '@/db/schema';

// tipagem de informacoes
// resgata table de products e informa q vai ter uma lista da própria
// tbm informa os produtos possuem variants (cor, modelo, tamanho)
interface ProductsListProps {
    title: string
    products: (typeof productTable.$inferSelect & {
        variant: (typeof productVariantTable.$inferSelect)[];
    })[];
}


const ProductsList = ({ title, products }) => {
    return (
        <div className='space-y-6'>
            <h3>{title}</h3>

        </div>
    );
};

export default ProductsList;