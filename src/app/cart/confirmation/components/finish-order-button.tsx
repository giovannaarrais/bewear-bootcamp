"use client"

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useFinishOrder } from '@/hooks/mutations/use-finish-order';

const FinishOrderButton = () => {

    const [successDialogIsOpen, setSuccessDialogIsOpen ] = useState(true)
    const finishOrderMutation = useFinishOrder();

    return (
        <>
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

            <Dialog 
                open={successDialogIsOpen} 
                onOpenChange={setSuccessDialogIsOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <Image 
                            src="/msgs/illustration.png" 
                            alt='Imagem ilustrativa de sucesso' 
                            width={251}
                            height={233}
                            className='pb-7 m-auto'
                        />
                        <DialogTitle>Pedido Efetuado</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className='font-medium text-center'>
                        Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na seção de “Meus Pedidos”.
                    </DialogDescription>
                    <DialogFooter>
                        <Button 
                        variant='default'
                        size='lg'
                        className='mt-3 w-full rounded-full'>
                            Ver meus pedidos
                        </Button>

                        <Button 
                        variant='outline'
                        className='mt-3 w-full rounded-full'
                        size='lg'>
                            Página Inicial
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FinishOrderButton;