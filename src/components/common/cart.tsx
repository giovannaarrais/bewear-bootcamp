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

import { Button } from "../ui/button";

// como os dados mudam frequentement, vamos usar o react query
const Cart = () => {
  //uma chamada q vai obter dados
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(), // funcao q vai pegar os dados do carrinho src\actions\get-cart\index.ts
  });
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
        <div>
          {cart?.items.map((item) => (
            <div key={item.id}>
              <Image
                src={item.productVariant.imageUrl[0]}
                alt={item.productVariant.product.name}
                width={100}
                height={100}
              />
              <div>
                <h3>{item.productVariant.product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
