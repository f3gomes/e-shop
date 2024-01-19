import Link from "next/link";
import Image from "next/image";
import { CartProductType } from "@/types/cart";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";

import { SetQuantity } from "../SetQuantity";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: CartProductType;
}

export function CartItem({ item }: CartItemProps) {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 pr-2 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 ml-2">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              fill
              alt={item.name}
              src={item.selectedImg!.image}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          {truncateText(item.name)}
          <div>{item.selectedImg?.color}</div>

          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remover
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center ml-4">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}
