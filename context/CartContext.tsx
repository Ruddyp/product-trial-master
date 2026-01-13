"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Item, Product } from "@/lib/mockData";
import { toast } from "sonner";

type CartContextType = {
  cart: Item[];
  handleAddToCart: (product: Product) => void;
  handleRemoveToCart: (product: Product) => void;
  handleDeleteToCart: (product: Product) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const isProductExist = prevCart.find((item) => item.id === product.id);
      if (isProductExist) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem?.quantity === 1) {
        return prevCart.filter((item) => item.id !== product.id);
      }

      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleDeleteToCart = (product: Product) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== product.id);
    });
    toast.info(`Produit ${product.name} retiré du panier.`);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        handleAddToCart,
        handleRemoveToCart,
        handleDeleteToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
