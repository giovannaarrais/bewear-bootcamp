"use client"

import { Loader2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { useFinishOrder } from '@/hooks/mutations/use-finish-order';

const FinishOrderButton = () => {

    const finishOrderMutation = useFinishOrder();

    return (
        <Button 
            className='mt-3 w-full rounded-full' 
            size="lg"
            onClick={() => finishOrderMutation.mutate()}
            disabled={finishOrderMutation.isPending}
        >
            {finishOrderMutation.isPending && (
                <Loader2  className='h-4 w-4 animate-spin'/>
            )}
            Finalizar Compra
        </Button>
    );
};

export default FinishOrderButton;