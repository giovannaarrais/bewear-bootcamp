import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FormatCentsToBRL } from '@/helpers/money';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


// recebendo os dados a serem exibidos no resumo do pedido
interface CartSummaryProps {
    subtotalInCents: number;
    totalInCents: number;
    products: Array<{ // vai receber uma lista de produtos
        id: string;
        name: string;
        variantName: string;
        quantity: number;
        priceInCents: number;
        imageUrl: string;
    }>
}

const CartSummary = ({ 
    subtotalInCents, 
    totalInCents, 
    products
}: CartSummaryProps) => {
    return (
    <Card>
        <CardHeader>
            <CardTitle>
                Resumo da compra
            </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            <div className="flex justify-between">
                <p className='text-sm'>Subtotal</p>
                <p className='text-sm text-foreground font-medium'>
                    {FormatCentsToBRL(subtotalInCents)}
                </p>
            </div>

            <div className="flex justify-between">
                <p className='text-sm'>Frete</p>
                <p className='text-sm text-foreground font-medium'>
                    Grátis
                </p>
            </div>

            <div className="flex justify-between">
                <p className='text-sm'>Total</p>
                <p className='text-sm text-foreground font-medium'>
                    {FormatCentsToBRL(totalInCents)}
                </p>
            </div>

            <Separator className='my-6'/>

            {products.map(product => (
                <div className="mb-4 flex items-center justify-between" key={product.id}>
                    <div className="flex items-center gap-4">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={78}
                            height={78}
                        />
            
                        <div className="flex flex-col gap-2">
                            <div>
                            <p className="mb-0 text-sm font-semibold">{product.name}</p>
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
                </div>
            ))}
        </CardContent>
    </Card>
  );
};

export default CartSummary;