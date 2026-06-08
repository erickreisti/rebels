"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface TicketItem {
  id: string;
  eventName: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: TicketItem[];
  isCartOpen: boolean;
  addToCart: (item: TicketItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: (open?: boolean) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<TicketItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rebels-cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem("rebels-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem: TicketItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleCart = (open?: boolean) => {
    setIsCartOpen((prev) => (open !== undefined ? open : !prev));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
