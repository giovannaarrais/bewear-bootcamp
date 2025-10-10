import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import React from 'react';

import Header from '@/components/common/header';
import ProductItem from '@/components/common/product-item';
import { db } from '@/db';
import { categoryTable, productTable } from '@/db/schema';

interface CategoryPageProps {
    // slug vem do nome da pasta pai desse arqv [slug] 
    // -> obrigatoriamente igual
    params: Promise<{slug: string}>
}


const CategoryPage = async ({ params }: CategoryPageProps) => {
    
    // captura as categorias
    const {slug} = await params;
    const category =  await db.query.categoryTable.findFirst({
        where: eq(categoryTable.slug, slug)
    })
    // se nao existir a categoria, joga o user para page de 404
    if (!category){
        return notFound()
    }

    //captura os produtos relacionados a essa categoria
    const products = await db.query.productTable.findMany({
        where: eq(productTable.categoryId,  category.id),
        with: {
            variants: true,
        }
    })

    return (
        <>
            <Header />

            <div className='px-5 space-y-6'>
                <h2 className='font-semibold text-xl'>{category.name}</h2>

                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            textContainerClassName='max-w-full'
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryPage;