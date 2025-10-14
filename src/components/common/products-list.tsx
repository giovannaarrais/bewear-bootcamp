"use client"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ChevronsLeft } from 'lucide-react';
import { ChevronsRight } from 'lucide-react';
import React from 'react';
import {Navigation, Pagination}from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

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
        <div className='space-y-6 relative'>
            <h3 className='font-semibold px-5 '>{title}</h3>
                <div className='mx-2'>
                    <Swiper 
                        modules={[Navigation, Pagination]}
                        navigation
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            992: {
                                slidesPerView: 5
                            },
                            768: {
                                slidesPerView: 3
                            },
                            576: {
                                slidesPerView: 2
                            }

                        }}
                        onInit={() => console.log('swiper initialized')}
                    >
                        {/* para cada produto ele vai renderizar a estruta ProductItem */}
                        {products.map(product => (
                            <SwiperSlide key={product.id} className='swiper-slide'>
                                <ProductItem 
                                    product={product}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                
        </div>
    );
};

export default ProductsList;