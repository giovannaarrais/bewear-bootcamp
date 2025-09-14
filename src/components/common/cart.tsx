import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

import { getCart } from "@/actions/get-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import CartItem from "./cart-item";
import Link from "next/link";
import IdentificatonPage from "@/app/cart/identification/page";

// como os dados mudam frequentement, vamos usar o react query
const Cart = () => {
  //uma chamada q vai obter dados
  // utilizando o hook useCart do arq src\hooks\queries\use-cart.ts
  const { data: cart, isPending: cartIsLoading } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col gap-8 p-3 pt-0">
          <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col">
                {cartIsLoading && <div>Caregando...</div>}
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productVariantId={item.productVariant.id}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl[0]}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{FormatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total</p>
                <p>{FormatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
              </div>

              <Button variant="default" className="mt-4 rounded-full" asChild>
                <Link href='/cart/identification'>
                  Finalizar Compra
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
