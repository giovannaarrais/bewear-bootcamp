"use client";

import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

import { createCheckoutSession } from "@/actions/create-checkout-session";
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
        if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key is not set");
        }

        const checkoutSession = await createCheckoutSession({
        orderId,
        });

        const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        );

        if (!stripe) {
        throw new Error("Failed to load Stripe");
        }

        await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
        });
    };

    return (
        <>
        {orders.map((order) => (
            <Card key={order.id} className="py-3">
            <CardContent>
                <Accordion type="single" collapsible>
                <Button 
                    size="sm"
                    onClick={() => handlePayOrder(order.id)}
                >
                    Realizar Pagamento
                </Button>
                <AccordionItem value={order.id}>
                    <AccordionTrigger>
                    <div className="flex flex-col items-start space-y-1">
                        <p>
                        Pedido feito em {""}
                        {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                        )} às {""}
                        {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        </p>

                        {order.status === "paid" && <Badge>Pago</Badge>}

                        {order.status === "pending" && (
                            <Badge variant="outline">Pagamento pendente</Badge>
                        )}

                        {order.status === "canceled" && (
                        <Badge variant="destructive">Cancelado</Badge>
                        )}
                    </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    <CardContent className="px-0">
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
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </CardContent>
            </Card>
        ))}
        </>
    );
};

export default Orders;
