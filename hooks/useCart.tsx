import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { CartProductType } from "@/types/cart";
import { useLocalStorage } from "./useLocal";
import { AddedProduct } from "@/components/AddedProduct";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmout: number;
  paymentIntent: string | null;
  cartProducts: CartProductType[] | null;
  handleClearCart: () => void;
  handleSetPaymentIntent: (value: string | null) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const { getItem, setItem } = useLocalStorage();

  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmout, setCartTotalAmout] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = getItem("eShopCartItems");
    const cProducts: CartProductType[] | null = cartItems;
    const eShopPaymentIntent: any = getItem("eShopPaymentIntent");
    const paymentIntent: string | null = eShopPaymentIntent;

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmout(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = (product: CartProductType) => {
    const alreadyAdded = cartProducts?.find(
      (item) =>
        item.grid?.color === product.grid?.color && item.id === product.id
    );

    if (alreadyAdded) {
      toast((t) => <AddedProduct />);
      toast.error("Essa cor já está no carrinho!");
    } else {
      setCartProducts((prev) => {
        let updatedCart = [];

        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }

        toast((t) => <AddedProduct />);
        toast.success("Produto adicionado ao carrinho!");

        setItem("eShopCartItems", updatedCart);
        return updatedCart;
      });
    }
  };

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.grid?.image !== product.grid?.image;
        });

        setCartProducts(filteredProducts);
        toast.success("Produto removido!");
        setItem("eShopCartItems", filteredProducts);
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99) {
        return toast.error("Quantidade máxima atingida!");
      }

      if (product?.quantity < product?.grid?.stock!) {
        if (cartProducts) {
          updatedCart = [...cartProducts];

          const existingIndex = cartProducts.findIndex(
            (item) => item.grid?.image === product.grid?.image
          );

          if (existingIndex > -1) {
            updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
              .quantity;
          }

          setCartProducts(updatedCart);
          setItem("eShopCartItems", updatedCart);
        }
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity > 1) {
        if (cartProducts) {
          updatedCart = [...cartProducts];

          const existingIndex = cartProducts.findIndex(
            (item) => item.grid?.image === product.grid?.image
          );

          if (existingIndex > -1) {
            updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
              .quantity;
          }

          setCartProducts(updatedCart);
          setItem("eShopCartItems", updatedCart);
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    setItem("eShopCartItems", null);
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      setItem("eShopPaymentIntent", value);
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartProducts,
    paymentIntent,
    cartTotalAmout,
    handleClearCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleSetPaymentIntent,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };

  return <CartContext.Provider value={value} {...props}></CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
