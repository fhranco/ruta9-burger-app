import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  tag?: string;
  type?: "burger" | "extra";
}

interface TrayItem {
  product: Product;
  quantity: number;
}

interface TrayState {
  items: TrayItem[];
  userName: string;
  setUserName: (name: string) => void;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearTray: () => void;
  isOpen: boolean;
  toggleTray: () => void;
}

export const useTray = create<TrayState>((set) => ({
  items: [],
  userName: "",
  setUserName: (name) => set({ userName: name }),
  isOpen: false,
  addItem: (product) => 
    set((state) => {
      const productId = product.id || product.name;
      const existing = state.items.find(item => (item.product.id || item.product.name) === productId);
      
      if (existing) {
        return {
          items: state.items.map(item => 
            (item.product.id || item.product.name) === productId
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      }
      return { items: [...state.items, { product: { ...product, id: productId }, quantity: 1 }] };
    }),
  removeItem: (id) => 
    set((state) => ({
      items: state.items.map(item => {
        if ((item.product.id || item.product.name) === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0)
    })),
  clearTray: () => set({ items: [], userName: "" }),
  toggleTray: () => set((state) => ({ isOpen: !state.isOpen })),
}));
