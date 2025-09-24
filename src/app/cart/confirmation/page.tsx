import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { db } from '@/db';
import { shippingAddressTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import CartSummary from '../components/cart-summary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAddress } from '../helpers/address';
import { Button } from '@/components/ui/button';

const ConfirmationPage = async() => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    if (!session?.user.id) {
        redirect("/");
    }
    
    const cart = await db.query.cartTable.findFirst({
        where: (cart, {eq}) => eq(cart.userId, session.user.id),
        with:{
          shippingAddress: true, // trazer informacoes do endereço do carrinho
            items: {
                with: {
                    productVariant:{
                        with:{
                            product: true,
                        }
                    }
                }
            }
        }
    })
    
      // verifica se user possui carrinho ou itens no carrinho
      // se nao redireciona para a pagina home
    if (!cart || cart.items.length === 0) {
        redirect("/");
    }
    
    const cartTotalInCents = cart.items.reduce(
        (acc, item) => acc + item.productVariant.priceInCents * item.quantity, 
        0 // ← VALOR INICIAL AQUI
    );
 
    if (!cart.shippingAddress){
        redirect("cart/identification")
    }
    return (
        <>
            <Header />
            
            <div className='space-y-4 px-5'>
                {/* exibicao do endereço ja selecionado */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Identificação
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <Card>
                            <CardContent>
                                {formatAddress(cart.shippingAddress)}
                            </CardContent>
                        </Card>
                
                        <Button 
                            className='mt-3 w-full rounded-full' 
                            size="lg"
                        >
                            Finalizar Compra
                        </Button>
                    </CardContent>
                </Card>

                <CartSummary
                    subtotalInCents={cartTotalInCents}
                    totalInCents={cartTotalInCents}
                    products={cart.items.map((item) => ({
                        id: item.productVariant.id,
                        name: item.productVariant.product.name,
                        variantName: item.productVariant.name,
                        quantity: item.quantity,
                        priceInCents: item.productVariant.priceInCents,
                        imageUrl: item.productVariant.imageUrl[0]
                    }))}
                />
            </div>

            <Footer />
        </>
    );
};

export default ConfirmationPage;