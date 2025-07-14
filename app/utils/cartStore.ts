import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.slug === product.slug
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.slug === product.slug
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },
      removeFromCart: (slug) => {
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        }));
      },
      updateQuantity: (slug, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slug ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "mini-commerce-cart",
    }
  )
);
