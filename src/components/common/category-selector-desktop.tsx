import Link from 'next/link';
import React from 'react';

import { categoryTable } from '@/db/schema';

interface CategorySelectorProps {
    categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelectorDesktop = ({ categories }: CategorySelectorProps) => {
    return (
        <div className="flex gap-3 justify-around border-1 border-gray-100 rounded-full p-2 px-3">
            {categories.map((category) => (
                <Link 
                    href={`/category/${category.slug}`} 
                    key={category.id}
                    className='border-1 border-gray-200 text-center rounded-full font-semibold text-muted-foreground text-xs py-3 bg-white hover:bg-gray-200 w-1/2'
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
};

export default CategorySelectorDesktop;