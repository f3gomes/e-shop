"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useCart } from "@/hooks/useCart";
import { SetColor } from "@/components/SetColor";
import { SetQuantity } from "@/components/SetQuantity";
import { ProductImage } from "@/components/ProductImage";
import { CartProductType, SelectedImgType } from "@/types/cart";
import { CustomButton } from "@/components/ProductAddButton";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: any;
}

const Horizontal = () => {
  return <hr className="w-full my-3" />;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const router = useRouter();

  const [cartItem, setCartItem] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.grid[0] },
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartItem((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartItem.quantity < 99) {
      setCartItem((prev) => {
        return { ...prev, quantity: prev.quantity++ };
      });
    }
  }, [cartItem]);

  const handleQtyDecrease = useCallback(() => {
    if (cartItem.quantity > 1) {
      setCartItem((prev) => {
        return { ...prev, quantity: prev.quantity-- };
      });
    }
  }, [cartItem]);

  useEffect(() => {
    setCartItem((prev) => {
      return { ...prev, quantity: 1 };
    });
  }, []);

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
      <ProductImage
        product={product}
        cartProduct={cartItem}
        handleColorSelect={handleColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>

        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />

        <div>
          <span className="font-semibold">Categoria: {product.brand}</span>
        </div>

        {/* Atualizar informação de estoque */}
        {/* <div
          className={cn(product.inStock ? "text-teal-400" : "text-rose-400")}
        >
          {product.inStock ? "Em estoque" : "Sem estoque"}
        </div> */}
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
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
            <Horizontal />
            <SetQuantity
              cartProduct={cartItem}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />

            <div className="max-w-[300px]">
              <CustomButton
                label="Comprar"
                onClick={() => handleAddProductToCart(cartItem)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
