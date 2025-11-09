import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CheckoutCancelPage = () => {
  return (
    <>
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <Image
              src="/msgs/cancel_pay.svg"
              alt="Imagem ilustrativa de sucesso"
              width={251}
              height={233}
              className="m-auto pb-7"
            />
            <DialogTitle>Pagamento Cancelado</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center font-medium">
            Seu pedido não foi efetuado. Para tentar novamente, clique no botão
            abaixo.
          </DialogDescription>
          <DialogFooter className="flex sm:flex-col">
            <Button
              variant="default"
              className="mt-3 w-full rounded-full"
              size="lg"
              asChild
            >
              <Link href="/cart/confirmation">Tentar novamente</Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="mt-3 w-full rounded-full"
              asChild
            >
              <Link href="/checkout/my-orders">Ver Meus Pedidos</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutCancelPage;
