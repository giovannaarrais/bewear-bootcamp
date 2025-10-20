"use client"

import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useRemoveProductFromCart } from '@/hooks/mutations/use-remove-product-from-cart';
import { getUseCartQueryKey } from '@/hooks/queries/use-cart';

interface RemoveToCartProps {
    cartItemId: string;
}

const RemoveToCartButton = ({ cartItemId }: RemoveToCartProps) => {

    const removeProductFromCartMutation = useRemoveProductFromCart(cartItemId)

    const removeCartItem = () => {
        removeProductFromCartMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Produto excluido com sucesso!")
            }, 
            onError: (error) => {
                toast.error("Erro ao deletar produto")
                console.log(' error:', error)
            }
        })
    }

    return (
        <>
            <Button
                onClick={() => removeCartItem() }
                className="absolute -top-3 -left-3 rounded-full"
                size="sm"
                >
                <Trash2 />
            </Button> 
        </>
    );
};

export default RemoveToCartButton;