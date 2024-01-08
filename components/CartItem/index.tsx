import { CartProductType } from "@/types/cart";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import Link from "next/link";
import { SetQuantity } from "../SetQuantity";

interface CartItemProps {
  item: CartProductType;
}

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              fill
              alt={item.name}
              src={item.selectedImg.image}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}
            <div>{item.selectedImg.color}</div>

            <div className="w-[70px]">
              <button className="text-slate-500 underline" onClick={() => {}}>
                Remover
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrease={() => {}}
          handleQtyDecrease={() => {}}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}
