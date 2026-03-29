"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ChevronRight, Check } from "lucide-react";
import menuData from "@/data/menu.json";

interface UpsellDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  burgerName: string;
}

export const UpsellDrawer = ({ isOpen, onClose, burgerName }: UpsellDrawerProps) => {
  const addItem = useTray((state) => state.addItem);
  
  // Suggested extras for quick upsell (top sellers)
  const suggestions = [
    ...menuData.extras.Quesos.slice(0, 3),
    ...menuData.extras.Carnes.slice(0, 3),
    ...menuData.extras.Verduras.slice(5, 6) // Palta trozada
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[120] bg-asphalt/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[3rem] p-8 pb-12 sm:pb-8 flex flex-col gap-6 shadow-[0_-25px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-primary mb-1">¡BUENA ELECCIÓN!</h3>
                   <h2 className="text-xl font-black italic text-white tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px]">
                      ¿POTENCIÁS TU {burgerName}?
                   </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Suggestions Horizontal Scroller / Grid */}
            <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide -mx-8 px-8">
                {suggestions.map((extra: any) => (
                    <button
                        key={extra.name}
                        onClick={() => addItem({ ...extra, type: 'extra', id: `EX-${extra.name}` })}
                        className="flex-shrink-0 bg-white/5 border border-white/5 rounded-3xl p-5 w-40 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all active:scale-95 text-left group"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                            <Plus className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white leading-tight group-hover:text-primary transition-colors">{extra.name}</span>
                        <span className="text-[10px] font-black text-white/30">
                            +{extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </span>
                    </button>
                ))}
            </div>

            {/* Finalize Action */}
            <button 
                onClick={onClose}
                className="w-full bg-primary text-white font-black h-16 rounded-3xl flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(209,35,43,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
                LISTO, ASÍ ESTÁ PERFECTA <Check className="w-4 h-4" />
            </button>

            <p className="text-center text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
               — PODÉS REVISAR TODA TU RUTA ABAJO —
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
