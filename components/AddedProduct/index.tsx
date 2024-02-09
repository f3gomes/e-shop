import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export function AddedProduct() {
  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <Link
        href={"/cart"}
        className="bg-shop-btn-bg rounded-md hover:opacity-80 transition duration-300 p-2 flex gap-1 w-fit"
      >
        Ir para o carrinho
        <FiShoppingCart />
      </Link>
    </div>
  );
}
