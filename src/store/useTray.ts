import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  tag?: string;
  type?: "burger" | "extra";
}

interface TrayItem {
  id: string; // Internal unique ID (timestamp based)
  product: Product;
  quantity: number;
  extras: Product[]; // Attached extras for this specific item block
}

interface TrayState {
  items: TrayItem[];
  userName: string;
  setUserName: (name: string) => void;
  addItem: (product: Product) => void;
  addExtraToLastItem: (extra: Product) => void;
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
      // Create a unique block for each item added (even if it's the same burger, for customization)
      const newItem: TrayItem = {
        id: Math.random().toString(36).substring(7),
        product,
        quantity: 1,
        extras: []
      };
      return { items: [...state.items, newItem] };
    }),

  addExtraToLastItem: (extra) =>
    set((state) => {
      if (state.items.length === 0) return state;
      const lastIndex = state.items.length - 1;
      const updatedItems = [...state.items];
      updatedItems[lastIndex] = {
        ...updatedItems[lastIndex],
        extras: [...updatedItems[lastIndex].extras, extra]
      };
      return { items: updatedItems };
    }),

  removeItem: (id) => 
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    })),
    
  clearTray: () => set({ items: [], userName: "" }),
  toggleTray: () => set((state) => ({ isOpen: !state.isOpen })),
}));
