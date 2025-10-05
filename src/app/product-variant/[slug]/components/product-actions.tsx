"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
    productVariantId: string;
}

const ProductActions = ({productVariantId}: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(1)

    // funcao para diminuir quantidade, so funcionar se for mais que 1
    function subNumber(){
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
    }

    // funcao para aumentar quantidade
    function moreNumber(){
        setQuantity((prev) => prev + 1)
    }

    return (
        <>
            {/* QUANTIDADE DESEJADA */}
            <div className="mb-4">
                <div className='border-1 border-gray-100 w-max rounded-lg'>
                    <Button onClick={subNumber} variant='outline'>
                        -
                    </Button>
                        <span className='px-3'>{quantity}</span>
                    <Button onClick={moreNumber} variant='outline'>
                        +
                    </Button>
                </div>
            </div>

            {/* ACOES */}
            <div className="space-y-3 flex sm:flex-row flex-col gap-3">
                <AddToCartButton
                    productVariantId={productVariantId}
                    quantity={quantity}
                />
                <Button variant="default" className="rounded-3xl sm:py-6 py-4 font-semibold flex-1">
                    Comprar Agora
                </Button>
            </div>
        </>
    );
};

export default ProductActions;