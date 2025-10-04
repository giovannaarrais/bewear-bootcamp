"use client"

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
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

const CheckoutSuccessPage = () => {
    return (
        <>
        <Header></Header>
        <Dialog 
                open={true} 
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
                    <DialogFooter className='flex sm:flex-col'>
                        <Button
                        variant='default'
                        size='lg'
                        className='mt-3 w-full rounded-full'
                        asChild>
                            <Link href='/checkout/my-orders'>
                                Ver Meus Pedidos
                            </Link>
                        </Button>

                        <Button 
                        variant='outline'
                        className='mt-3 w-full rounded-full'
                        size='lg'
                        asChild>
                            <Link href="/">
                                Voltar para a loja 
                            </Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CheckoutSuccessPage;