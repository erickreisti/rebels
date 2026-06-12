"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";

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
    try {
      const saved = localStorage.getItem("rebels-cart");
      if (saved) setCartItems(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to parse cart", e);
    }
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("rebels-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((newItem: TicketItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    },
    [removeFromCart]
  );

  const toggleCart = useCallback((open?: boolean) => {
    setIsCartOpen((prev) => (open !== undefined ? open : !prev));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      clearCart,
      cartTotal,
      cartCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
