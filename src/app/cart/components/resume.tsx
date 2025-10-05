import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormatCentsToBRL } from '@/helpers/money';
import { Separator } from '@/components/ui/separator';


// recebendo os dados a serem exibidos no resumo do pedido
interface CartSummaryProps {
    subtotalInCents: number;
    totalInCents: number;
}

const Resume = ({ 
    subtotalInCents, 
    totalInCents, 
}: CartSummaryProps) => {
    return (
    <Card className="flex-1">
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

            <Separator />
            
            <div className="flex justify-between">
                <p className='text-sm text-primary font-semibold uppercase'>Total</p>
                <p className='text-sm text-primary font-semibold uppercase'>
                    {FormatCentsToBRL(totalInCents)}
                </p>
            </div>
        </CardContent>
    </Card>
  );
};

export default Resume;