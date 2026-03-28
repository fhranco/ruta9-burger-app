import { create } from "zustand";

interface Burger {
  id: string;
  name: string;
  price: number;
  tag?: string;
}

interface TrayState {
  items: { product: Burger; quantity: number }[];
  addItem: (product: Burger) => void;
  removeItem: (id: string) => void;
  clearTray: () => void;
  isOpen: boolean;
  toggleTray: () => void;
}

export const useTray = create<TrayState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (product) => 
    set((state) => {
      const existing = state.items.find(item => item.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeItem: (id) => 
    set((state) => ({
      items: state.items.filter(item => item.product.id !== id)
    })),
  clearTray: () => set({ items: [] }),
  toggleTray: () => set((state) => ({ isOpen: !state.isOpen })),
}));
