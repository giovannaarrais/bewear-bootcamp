"use client"

import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import AddToCartButton from "./add-to-cart-button";
import ComprarAgora from "./comprar-agora";

interface ProductActionsProps {
    productVariantId: string;
}

const ProductActions = ({productVariantId}: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(1)
    const [userUnauthorized, setUserUnauthorized] = useState(false);
    
    const handleAddToCartError = (error: Error) => {
        if(error.message.includes("Unauthorized")){
            setUserUnauthorized(true)
        }
    }


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
                    onError={handleAddToCartError}
                />
                <ComprarAgora 
                    productVariantId={productVariantId}
                    quantity={quantity}
                />
            </div>

            <Dialog 
                open={userUnauthorized} 
                onOpenChange={setUserUnauthorized}
            >
                <DialogContent>
                    <DialogHeader>
                        <Image
                            src='/msgs/authentication.svg'
                            alt="Imagem de autenticação"
                            width={250}
                            height={250}
                            className="m-auto"
                        />
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <DialogDescription className='font-medium text-center'>
                        Realize seu login ou acesse a sua conta para possuir uma experiencia completa aqui na BEWEAR
                    </DialogDescription>
                    <DialogFooter>
                        <Button 
                        variant='default'
                        size='lg'
                        className='mt-3 w-full rounded-full'>
                            Fazer login
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductActions;