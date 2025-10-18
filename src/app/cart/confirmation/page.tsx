import { eq } from 'drizzle-orm';
import { House, MailCheck, UserRoundCheck } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { db } from '@/db';
import { shippingAddressTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import CartSummary from '../components/cart-summary';
import Resume from '../components/resume';
import { formatAddress } from '../helpers/address';
import FinishOrderButton from './components/finish-order-button';

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
            
            <div className='gap-5 px-5 flex md:flex-row flex-col'>

                <div className="flex-1">
                    <CartSummary
                        products={cart.items.map((item) => ({
                            id: item.productVariant.id,
                            name: item.productVariant.product.name,
                            variantName: item.productVariant.name,
                            quantity: item.quantity,
                            priceInCents: item.productVariant.priceInCents,
                            imageUrl: item.productVariant.imageUrl[0],
                            cartItemId: item.id
                        }))}
                    />
                </div>

                {/* exibicao do endereço ja selecionado */}
                <div className="flex-1 space-y-5">
                    <Resume
                        subtotalInCents={cartTotalInCents}
                        totalInCents={cartTotalInCents}
                    />
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Identificação
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <Card>
                                <CardContent>
                                    <p className='flex font-semibold gap-2 items-center'>
                                        <UserRoundCheck size={20}/> {cart.shippingAddress.recipientName}
                                    </p>
                                    <Separator className='my-4'/>
                                    <p>
                                        <span className='flex gap-2 font-semibold items-center'> <House size={20}/>Endereço</span> 
                                        {cart.shippingAddress.street}, nº{cart.shippingAddress.number} {cart.shippingAddress.complement ? ', '+ cart.shippingAddress.complement : ''}
                                        <br />
                                        {cart.shippingAddress.city} - {cart.shippingAddress.state}, {cart.shippingAddress.neighborhood}. CEP: {cart.shippingAddress.zipCode}
                                    </p>
                                    <Separator className='my-4'/>
                                    <p>
                                        <span className="flex gap-2 font-semibold items-center">
                                            <MailCheck size={20}/> Informações 
                                        </span>
                                        Email: {cart.shippingAddress.email} <br />
                                        Contato: {cart.shippingAddress.phone} <br />
                                        CPF: {cart.shippingAddress.cpfOrCnpj} <br />
                                    </p>
                                </CardContent>
                            </Card>
                    
                            <FinishOrderButton />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ConfirmationPage;