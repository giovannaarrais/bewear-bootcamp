import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { any, string } from "zod";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { FormatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: number;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  // utilizado para quando add produto ele ja ser visivel no cart sem necessidade de reload
  const queryClient = useQueryClient();

  // remover produto do carirnho
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: () => {
        toast.success("Falha ao tentar remover produto do carrinho");
      },
    });
  };

  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleDecreaseProductQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto diminuída");
      },
    });
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
        />

        <div className="flex flex-col gap-2">
          <div>
            <p className="mb-0 text-sm font-semibold">{productName}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {productVariantName}
            </p>
          </div>

          {/* QUANTIDADE DESEJADA */}
          <div className="h-[27px] rounded-lg border-0 border-gray-100">
            <Button
              onClick={handleDecreaseProductQuantityClick}
              variant="outline"
              className="h-[26px] px-2 py-1"
            >
              -
            </Button>

            <span className="px-2 text-xs">{quantity}</span>

            <Button
              onClick={() => {}}
              variant="outline"
              className="h-[26px] px-2 py-1"
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2">
        <Button
          variant="ghost"
          className="text-gray-700"
          onClick={handleDeleteClick}
        >
          <Trash2Icon size={20} />
        </Button>
        <div className="text-md font-semibold">
          {FormatCentsToBRL(productVariantPriceInCents)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
