import Link from 'next/link';
import React from 'react';

import { categoryTable } from '@/db/schema';

import { Button } from '../ui/button';

interface CategorySelectorProps {
    categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
    return (
        <div className='rounded-3xl p-6 bg-[#F4EFFF]'>
            <div className="grid grid-cols-2 gap-3">
{/* // logica para levar a pagina de categorias esta dentro de category/[slug]/page.tsx */}
                {categories.map((category) => (
                    <Link 
                        href={`/category/${category.slug}`} 
                        key={category.id}
                        className='text-center rounded-full font-semibold text-xs py-3 bg-white hover:bg-gray-200 '
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;