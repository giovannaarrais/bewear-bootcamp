import { desc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { db } from '@/db';
import { orderTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import Orders from './components/orders';

const MyOrdersPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user.id){
        redirect('/login')
    }

    const orders = await db.query.orderTable.findMany({
        where: eq(orderTable.userId, session?.user.id),
        orderBy: [desc(orderTable.createdAt)], // ordena do pedido mais recente para o ultimo
        with: {
            items: {
                with: {
                productVariant: {
                    with: {
                    product: true,
                    },
                },
                },
            },
        },
    });


    return (
        <>
            <Header />
            <div className='mx-5 space-y-3'>
                <Orders 
                    orders={orders.map((order) => ({
                        id: order.id,
                        totalPriceInCents: order.totalPriceInCents,
                        status: order.status,
                        createdAt: order.createdAt,
                        recipientName: order.recipientName,
                        street: order.street,
                        number: order.number,
                        complement: order.complement,
                        city: order.city,
                        state: order.state,
                        neighborhood: order.neighborhood,
                        zipCode: order.zipCode, 
                        country: order.country,
                        phone: order.phone,
                        items: order.items.map((item) => ({
                            id: item.id,
                            imageUrl: item.productVariant.imageUrl,
                            productName: item.productVariant.product.name,
                            productVariantName: item.productVariant.name,
                            priceInCents: item.productVariant.priceInCents,
                            quantity: item.quantity,
                        }))

                    }))}
                />
            </div>
            <Footer />
        </>
    );
};

export default MyOrdersPage;