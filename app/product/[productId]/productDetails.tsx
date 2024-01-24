"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useCart } from "@/hooks/useCart";
import { SetColor } from "@/components/SetColor";
import { SetQuantity } from "@/components/SetQuantity";
import { ProductImage } from "@/components/ProductImage";
import { CartProductType, SelectedGridType } from "@/types/cart";
import { CustomButton } from "@/components/ProductAddButton";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { IProduct } from "@/types/product";

interface ProductDetailsProps {
  product: IProduct | any;
}

export const Horizontal = () => {
  return <hr className="w-full my-3" />;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [buyDisabled, setBuyDisabled] = useState(false);

  const router = useRouter();

  const [cartItem, setCartItem] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    grid: { ...product.grid[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedGridType) => {
    setCartItem((prev) => {
      return { ...prev, grid: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartItem.quantity < 99) {
      setCartItem((prev) => {
        return { ...prev, quantity: ++prev.quantity };
      });
    }
  }, [cartItem]);

  const handleQtyDecrease = useCallback(() => {
    if (cartItem.quantity > 1) {
      setCartItem((prev) => {
        return { ...prev, quantity: --prev.quantity };
      });
    }
  }, [cartItem]);

  useEffect(() => {
    setCartItem((prev) => {
      return { ...prev, quantity: 1 };
    });

    if (product.grid.length === 1 && product.grid[0].stock === 0) {
      setBuyDisabled(true);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage product={product} />

      <div className="flex flex-col gap-1 text-shop-link text-sm">
        <h2 className="text-3xl font-medium text-shop-title">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>
            {product.reviews.length}{" "}
            {product.reviews.length === 1 ? "avaliação" : "avaliações"}
          </div>
        </div>

        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />

        <div>
          <div className="flex gap-3">
            <span className="font-semibold">Categoria:</span>
            <span>{product.category}</span>
          </div>
        </div>

        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-shop-link flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Produto adicionado ao carrinho</span>
            </p>

            <div>
              <CustomButton
                outline
                label="Ver carrinho"
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartItem}
              grid={product.grid}
              handleColorSelect={handleColorSelect}
            />

            {buyDisabled && (
              <>
                <Horizontal />
                <span className="text-rose-500">Sem Estoque</span>
              </>
            )}

            <Horizontal />
            <SetQuantity
              cartProduct={cartItem}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />

            <div className="flex gap-3 items-center">
              <span className="font-semibold">Preço: </span>
              <span className="font-medium text-lg">
                {formatPrice(product.price)}
              </span>
            </div>

            <Horizontal />

            <div className="max-w-[300px]">
              <CustomButton
                label="Comprar"
                disabled={buyDisabled}
                onClick={() => handleAddProductToCart(cartItem)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
