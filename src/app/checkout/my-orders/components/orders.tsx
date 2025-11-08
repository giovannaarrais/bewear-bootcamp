"use client";

import { loadStripe } from "@stripe/stripe-js";
import { House, MailCheck, UserRoundCheck } from "lucide-react";
import Image from "next/image";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { POST } from "@/app/api/stripe/webhook/route";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";
import { FormatCentsToBRL } from "@/helpers/money";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

interface OrdersProps {
    orders: Array<{
        id: string;
        totalPriceInCents: number;
        status: (typeof orderTable.$inferSelect)["status"]; // pega os enuns dos status
        createdAt: Date;
        recipientName: string;
        street: string;
        number: string;
        complement: string | null;
        city: string;
        state: string;
        neighborhood: string;
        zipCode: string;
        country: string;
        phone: string;
        email: string;
        cpfOrCnpj: string;
        items: Array<{
        id: string;
        imageUrl: string[];
        productName: string;
        productVariantName: string;
        priceInCents: number;
        quantity: number;
        }>;
    }>;
}

const Orders = ({ orders }: OrdersProps) => {

    const handlePayOrder = async (orderId: string) => {
        try {
            // Verifica se a chave pública está definida
            if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
                throw new Error("Stripe publishable key not set");
            }
        
            // 🔹 Chama a server action diretamente
            const checkoutSession = await createCheckoutSession({ orderId });
        
            // 🔹 Carrega Stripe no navegador
            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            );
        
            if (!stripe) {
                throw new Error("Failed to load Stripe");
            }
        
            // 🔹 Redireciona para o checkout
            await stripe.redirectToCheckout({
                sessionId: checkoutSession.id,
            });

            } catch (error) {
                console.error("Erro ao iniciar pagamento:", error);
                alert("Erro ao tentar iniciar pagamento. Tente novamente.");
            }
    };

    return (
        <>
        {orders.length === 0 && (
            <div className="flex flex-col items-center gap-3 bg-amber-100 p-5 rounded-2xl justify-center w-max mx-auto">
                <div className="">
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="h-20 text-yellow-600">
                        <path d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                </div>
                <div className="m-auto">
                    <h3 className="font-semibold">Você ainda não possui pedidos!!!</h3>
                </div>
            </div>
        )}

        {orders.map((order, i) => (
            <Card key={order.id} className="py-3">
            <CardContent>
                <Accordion type="single" collapsible >
                <AccordionItem value={order.id} >
                    <AccordionTrigger >
                    <div className="flex justify-between items-start space-y-1 w-full">
                        <div>
                            <strong>Número do Pedido</strong> <br />
                            #{i + 1}
                        </div>

                        <div className="flex flex-col text-center">
                            <strong>Data/Hora</strong> 
                            {""}
                            {new Date(order.createdAt).toLocaleDateString(
                                "pt-BR",
                            )} às {""}
                            {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>

                        <div className="flex flex-col text-center">
                            <strong>Status:</strong>
                            {order.status === "paid" && <span className="text-green-600">Pago</span>}

                            {order.status === "pending" && (
                                <span className="text-yellow-600">Pagamento pendente</span>
                            )}

                            {order.status === "canceled" && (
                            <span className="text-red-700">Cancelado</span>
                            )}
                        </div>
                    </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex gap-3">

                        <Card className="flex-1">
                            <CardContent>
                                {order.items.map((item) => (
                                <div
                                    className="mb-4 flex items-center justify-between"
                                    key={item.id}
                                >
                                    <div className="flex items-center gap-4">
                                    <Image
                                        src={item.imageUrl[0]}
                                        alt={item.productName}
                                        width={78}
                                        height={78}
                                    />

                                    <div className="flex flex-col gap-2">
                                        <div>
                                        <p className="mb-0 text-sm font-semibold">
                                            {item.productName}
                                        </p>
                                        <p className="text-muted-foreground text-xs font-medium">
                                            {item.productVariantName}
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between gap-2">
                                    {/* QUANTIDADE DESEJADA */}
                                    <div className="rounded-lg border-0 border-gray-100">
                                        <span className="text-xs">x{item.quantity}</span>
                                    </div>
                                    <div className="text-md font-semibold">
                                        {FormatCentsToBRL(item.priceInCents)}
                                    </div>
                                    </div>
                                </div>
                                ))}

                                <Separator className="my-6" />

                                <div>
                                <div className="flex justify-between">
                                    <p className="text-sm">Subtotal</p>
                                    <p className="text-foreground text-sm font-medium">
                                    {FormatCentsToBRL(order.totalPriceInCents)}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm">Frete</p>
                                    <p className="text-foreground text-sm font-medium">
                                    Grátis
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm">Total</p>
                                    <p className="text-foreground text-sm font-medium">
                                    {FormatCentsToBRL(order.totalPriceInCents)}
                                    </p>
                                </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="flex-1">
                            <CardContent>
                                <p className='flex font-semibold gap-2 items-center'>
                                    <UserRoundCheck size={20}/> {order.recipientName}
                                </p>
                                <Separator className='my-4'/>
                                <p>
                                    <span className='flex gap-2 font-semibold items-center'> <House size={20}/>Endereço</span> 
                                    {order.street}, nº{order.number} {order.complement ? ', '+ order.complement : ''}
                                    <br />
                                    {order.city} - {order.state}, {order.neighborhood}. CEP: {order.zipCode}
                                </p>
                                <Separator className='my-4'/>
                                <p>
                                    <span className="flex gap-2 font-semibold items-center">
                                        <MailCheck size={20}/> Informações 
                                    </span>
                                    Email: {order.email} <br />
                                    Contato: {order.phone} <br />
                                    CPF: {order.cpfOrCnpj} <br />
                                </p>
                            </CardContent>
                        </Card>
                    </AccordionContent>

                    {order.status == 'pending' && (
                        <div className="flex justify-end">
                            <Button 
                                size="sm"
                                variant='secondary'
                                className="text-[12px]"
                                onClick={() => handlePayOrder(order.id)}
                            >
                                Realizar Pagamento
                            </Button>
                        </div>
                    )}
                </AccordionItem>
                </Accordion>
            </CardContent>
            </Card>
        ))}
        </>
    );
};

export default Orders;
