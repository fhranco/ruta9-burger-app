"use client";
import React, { useState } from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MapPin, CheckCircle2, ShoppingBag, Plus, Minus, ChevronRight, Zap } from "lucide-react";
import menuData from "@/data/menu.json";

export const TrayModal = () => {
  const { items, isOpen, toggleTray, addItem, removeItem, clearTray } = useTray();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const categories = Object.keys(menuData.extras);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ y: "100%", scale: 1 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: "100%", scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-[550px] h-[92vh] sm:h-[80vh] bg-asphalt border-t sm:border border-white/10 rounded-t-[3rem] sm:rounded-[3rem] shadow-4xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-4">
                    <img src="/images/ui/logo.png" className="w-10 h-10 grayscale brightness-200" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black italic text-white tracking-tighter uppercase">LISTO PARA PEDIR</h2>
                        <div className="flex items-center gap-2 text-primary">
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mesa Detectada • Ruta 9</span>
                        </div>
                    </div>
                </div>
                <button 
                  onClick={toggleTray}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto scrollbar-hide">
                {/* 1. SELECCIÓN ACTUAL (Burgers + Extras seleccionados) */}
                <div className="p-8 pb-4">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                        <ShoppingBag className="w-3 h-3" /> Tu Selección Actual
                    </h3>
                    
                    {items.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center opacity-20 gap-4 border-2 border-dashed border-white/5 rounded-[2rem]">
                            <ShoppingBag className="w-12 h-12" />
                            <span className="text-xs font-bold uppercase tracking-widest">Aún no has añadido nada</span>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <motion.div 
                                    key={item.product.id || item.product.name}
                                    layout
                                    className="bg-white/5 border border-white/5 rounded-3xl p-5 flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black italic">
                                            {item.product.id ? item.product.id : "EX"}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white leading-none mb-1">{item.product.name}</h4>
                                            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">
                                                {item.product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} c/u
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/5">
                                            <button 
                                                onClick={() => removeItem(item.product.id || item.product.name)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:bg-white/5"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-black text-white">{item.quantity}</span>
                                            <button 
                                                onClick={() => addItem(item.product)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. AGREGAR MÁS EXTRAS (Explorer) */}
                <div className="p-8 pt-4">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                        <Plus className="w-3 h-3" /> Potenciá tu Experiencia (Extras)
                    </h3>

                    <div className="space-y-8">
                        {categories.map((cat) => (
                            <div key={cat} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black italic text-white/80 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {cat}
                                    </h4>
                                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Seleccioná para añadir</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                    {(menuData.extras as any)[cat].map((extra: any) => (
                                        <button
                                            key={extra.name}
                                            onClick={() => addItem({ ...extra, type: 'extra', id: `EX-${extra.name}` })}
                                            className="bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 rounded-2xl p-4 flex flex-col items-start gap-1 transition-all text-left group active:scale-95"
                                        >
                                            <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">{extra.name}</span>
                                            <span className="text-[9px] font-black text-white/30">
                                                +{extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Total Footer: High visibility for Waiter */}
            <div className="p-8 pb-10 sm:pb-8 bg-black/60 border-t border-white/10 flex flex-col gap-6">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] block mb-2">Total de mi Selección</span>
                        <p className="text-5xl font-black text-white tracking-tighter italic">
                           {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                </div>

                <div className="bg-primary border border-primary/20 rounded-3xl p-5 flex items-center justify-between shadow-[0_15px_40px_rgba(209,35,43,0.3)]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-black text-white leading-tight uppercase tracking-tight">
                            Muestra esta pantalla <br /> para confirmar tu pedido
                        </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/50" />
                </div>
                
                <button 
                    onClick={clearTray}
                    className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] hover:text-red-500 transition-colors self-center"
                >
                    — VACÍAR MI BANDEJA —
                </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
