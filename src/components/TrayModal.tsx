"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MapPin, CheckCircle2 } from "lucide-react";

export const TrayModal = () => {
  const { items, isOpen, toggleTray, removeItem, clearTray } = useTray();
  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.95 }}
            className="w-full max-w-[500px] h-[80vh] bg-asphalt border border-white/5 rounded-[3rem] shadow-4xl flex flex-col overflow-hidden relative"
          >
            {/* Header: Branding para Garzón */}
            <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <img src="/images/ui/logo.png" className="w-12 h-12 grayscale brightness-200" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black italic text-white tracking-tighter">LISTO PARA PEDIR</h2>
                        <div className="flex items-center gap-2 text-primary">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFF]/50">Mesa Detectada</span>
                        </div>
                    </div>
                </div>
                <button 
                  onClick={toggleTray}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* List of Selections */}
            <div className="flex-grow overflow-y-auto px-8 py-6 space-y-4">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 gap-4">
                        <ShoppingBag className="w-12 h-12" />
                        <span className="text-sm font-bold uppercase tracking-widest">Tu ruta está vacía</span>
                    </div>
                ) : (
                    items.map((item) => (
                        <motion.div 
                            key={item.product.id}
                            layout
                            className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-black text-primary opacity-40">{item.product.id}</span>
                                <div>
                                    <h4 className="text-lg font-bold text-white leading-none mb-1">{item.product.name}</h4>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">x{item.quantity} raciones</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-md font-black text-white">{(item.product.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                                <button 
                                  onClick={() => removeItem(item.product.id)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Total Footer: High visibility for Waiter */}
            <div className="p-8 bg-black/40 border-t border-white/5 flex flex-col gap-6">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] block mb-1">TOTAL ACUMULADO en Ruta</span>
                        <p className="text-4xl font-black text-white tracking-tighter italic">
                           {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                    <button 
                        onClick={clearTray}
                        className="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-primary transition-colors pb-2"
                    >
                        Limpiar Todo
                    </button>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <p className="text-[11px] font-bold text-white leading-tight opacity-70">
                        Muestra esta pantalla para confirmar los productos de tu ruta.
                    </p>
                </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Internal Import helper
import { ShoppingBag } from "lucide-react";
