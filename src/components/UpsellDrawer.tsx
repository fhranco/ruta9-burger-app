"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check, Zap, ShoppingBag } from "lucide-react";
import menuData from "@/data/menu.json";

interface UpsellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  burgerName: string;
}

export const UpsellDrawer = ({ isOpen, onClose, burgerName }: UpsellDrawerProps) => {
  const addItem = useTray((state) => state.addItem);
  const items = useTray((state) => state.items);
  
  const categories = Object.keys(menuData.extras);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with heavy blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md"
          />

          {/* Drawer - Higher and more robust */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[120] bg-asphalt border-t-2 border-primary/30 rounded-t-[3.5rem] h-[85vh] flex flex-col shadow-[0_-30px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* 1. Header Area: Branding & Exit */}
            <div className="px-8 pt-10 pb-6 flex items-start justify-between bg-gradient-to-b from-black/40 to-transparent">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-primary animate-pulse" />
                      <h3 className="text-[10px] uppercase font-black tracking-[0.4em] text-primary">POTENCIADOR DE RUTA</h3>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-black italic text-white tracking-tighter uppercase leading-tight mt-1">
                      ¿SUMAMOS EXTRAS <br /><span className="text-primary not-italic">A TU {burgerName}?</span>
                   </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all shadow-xl"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* 2. Scrollable Content: All Categories */}
            <div className="flex-grow overflow-y-auto px-8 pb-12 scrollbar-hide space-y-10">
                {categories.map((cat) => (
                    <div key={cat} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                           <h4 className="text-sm font-black italic text-white/50 uppercase tracking-widest flex items-center gap-2">
                               {cat}
                           </h4>
                           <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">{ (menuData.extras as any)[cat].length } opciones</span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {(menuData.extras as any)[cat].map((extra: any) => {
                                const isAdded = items.find(i => i.product.name === extra.name);
                                return (
                                    <button
                                        key={extra.name}
                                        onClick={() => {
                                           addItem({ ...extra, type: 'extra', id: `EX-${extra.name}` });
                                        }}
                                        className={`relative bg-white/5 border ${isAdded ? 'border-primary bg-primary/10' : 'border-white/5'} rounded-2xl p-4 flex flex-col items-start gap-1 transition-all text-left group active:scale-95`}
                                    >
                                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-all ${isAdded ? 'bg-primary text-white scale-110' : 'bg-white/5 text-white/20'}`}>
                                            {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                        </div>
                                        <span className={`text-[12px] font-bold leading-tight pr-4 ${isAdded ? 'text-white' : 'text-white/80'} transition-colors mb-1`}>
                                            {extra.name}
                                        </span>
                                        <span className={`text-sm font-black tracking-tighter ${isAdded ? 'text-white' : 'text-primary'}`}>
                                            + {extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                        </span>
                                        {isAdded && (
                                           <div className="absolute -bottom-1 -right-1 bg-primary text-[9px] font-black px-2 py-0.5 rounded-full text-white shadow-lg">
                                               x{isAdded.quantity}
                                           </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Action Footer: Finalize Order */}
            <div className="px-8 py-8 bg-black/60 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                <button 
                    onClick={onClose}
                    className="w-full bg-primary text-white font-black h-18 py-5 rounded-3xl flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(209,35,43,0.4)] hover:scale-[1.02] active:scale-95 transition-all text-base uppercase tracking-widest group"
                >
                    <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    LISTO, CONTINUAR NAVEGANDO <Check className="w-5 h-5" />
                </button>
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-6">
                   PRECIOS EN PESOS CHILENOS • RUTA 9
                </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
