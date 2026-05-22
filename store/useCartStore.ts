import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─────────────────────────────────────────────────────────────
// CartItem — Özelleştirme detaylarıyla genişletildi
// ─────────────────────────────────────────────────────────────

export interface CartItemCustomization {
  color?: string;
  colorHex?: string;
  size?: number;
  soleType?: string;
  yarnType?: string;
  ankleHeight?: string;
  knitPattern?: string;
  accessories?: string[];
  giftBox?: boolean;
  inscription?: string;
}

export interface CartItem {
  id: string;           // productId + timestamp (benzersiz)
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization?: CartItemCustomization;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          // Özelleştirmeli ürünler her zaman ayrı sepet kalemi olarak eklenir
          // (aynı ürünü farklı özelleştirmelerle birden fazla sipariş edebilmek için)
          if (item.customization) {
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }
          // Özelleştirmesiz ürünlerde aynı id varsa miktarı artır
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, amount) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, i.quantity + amount) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
