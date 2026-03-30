import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  tag?: string;
  type?: "burger" | "extra" | "snack" | "sandwich" | "postre" | "drink";
  ingredients?: string;
}

interface TrayItem {
  id: string;
  product: Product;
  quantity: number;
  extras: Product[];
}

interface TrayState {
  items: TrayItem[];
  userName: string;
  activeSection: "factory" | "burgers" | "snacks" | "sandwiches" | "postres" | "drinks";
  setActiveSection: (section: "factory" | "burgers" | "snacks" | "sandwiches" | "postres" | "drinks") => void;
  setUserName: (name: string) => void;
  addItem: (product: Product) => void;
  addExtraToLastItem: (extra: Product) => void;
  removeItem: (id: string) => void;
  removeProduct: (productId: string) => void;
  removeExtraFromItem: (itemId: string, extraName: string) => void;
  clearTray: () => void;
  isOpen: boolean;
  toggleTray: () => void;
}

export const useTray = create<TrayState>((set) => ({
  items: [],
  userName: "",
  activeSection: "burgers",
  isOpen: false,
  
  setActiveSection: (section) => set({ activeSection: section }),
  setUserName: (name) => set({ userName: name }),
  
  addItem: (product) => 
    set((state) => {
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
      const existingExtras = updatedItems[lastIndex].extras;
      const extraExists = existingExtras.some(e => e.name === extra.name);
      
      updatedItems[lastIndex] = {
        ...updatedItems[lastIndex],
        extras: extraExists 
          ? existingExtras.filter(e => e.name !== extra.name)
          : [...existingExtras, extra]
      };
      return { items: updatedItems };
    }),

  removeItem: (id) => 
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    })),

  removeProduct: (productId) =>
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId)
    })),

  removeExtraFromItem: (itemId, extraName) =>
    set((state) => ({
      items: state.items.map(item => 
        item.id === itemId 
          ? { ...item, extras: item.extras.filter(extra => extra.name !== extraName) }
          : item
      )
    })),
    
  clearTray: () => set({ items: [], userName: "" }),
  toggleTray: () => set((state) => ({ isOpen: !state.isOpen })),
}));
