import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { FormatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
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

  // diminuir quantidade do produto
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

  // aumentar quantidade do produto
  const increaseCartProductQuantityMutation = useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleIncreaseProductQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto aumentada");
      },
      onError: () => {
        toast.success("Falha ao tentar aumentar quantidade do produto");
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
              onClick={handleIncreaseProductQuantityClick}
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
