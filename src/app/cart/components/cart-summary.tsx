import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { removeProductFromCart } from '@/actions/remove-cart-product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormatCentsToBRL } from '@/helpers/money';

import RemoveToCartButton from './remove-to-cart-button';


// recebendo os dados a serem exibidos no resumo do pedido
interface CartSummaryProps {
    products: Array<{ // vai receber uma lista de produtos
        id: string;
        name: string;
        variantName: string;
        quantity: number;
        priceInCents: number;
        imageUrl: string;
        cartItemId: string
    }>
}

const CartSummary = ({ 
    products
}: CartSummaryProps) => {

    
    return (
    <Card className="flex-1 h-max">
        <CardHeader>
            <CardTitle>
                Carrinho
            </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            {products.map(product => (
                <div className="mb-4 flex items-center justify-between relative" key={product.id}>
                    <div className="flex items-center gap-4">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={120}
                            height={120}
                            className='rounded-md sm:w-[130px] w-[80px]'
                        />

                        <div className="flex flex-col gap-2">
                            <div>
                            <p className="mb-0 text-sm font-semibold line-clamp-2">{product.name}</p>
                            <p className="text-muted-foreground text-xs font-medium">
                                {product.variantName}
                            </p>
                            </div>
                
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                        {/* QUANTIDADE DESEJADA */}
                        <div className="rounded-lg border-0 border-gray-100">
                            <span className=" text-xs">x{product.quantity}</span>
                        </div>
                        <div className="text-md font-semibold">
                            {FormatCentsToBRL(product.priceInCents)}
                        </div>
                    </div>

                    <RemoveToCartButton
                        cartItemId={product.cartItemId}
                    />
                    
                </div>
            ))}
        </CardContent>
    </Card>
  );
};

export default CartSummary;