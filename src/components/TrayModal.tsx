"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MapPin, CheckCircle2, ShoppingBag, Plus, Minus, UserCircle, Zap, ChevronRight } from "lucide-react";

export const TrayModal = () => {
  const { items, isOpen, toggleTray, addItem, removeItem, clearTray, userName, setUserName } = useTray();

  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Group by burgers vs extras
  const burgers = items.filter(i => i.product.type !== 'extra' && !i.product.id?.startsWith('EX-'));
  const extras = items.filter(i => i.product.type === 'extra' || i.product.id?.startsWith('EX-'));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ y: "100%", scale: 1 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: "100%", scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-[550px] h-[92vh] sm:h-[85vh] bg-asphalt border-t sm:border border-white/10 rounded-t-[3rem] sm:rounded-[3rem] shadow-4xl flex flex-col overflow-hidden"
          >
            {/* 1. Header & Branding */}
            <div className="px-8 pt-10 pb-6 flex items-center justify-between bg-black/30 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <img src="/images/ui/logo.png" className="w-12 h-12 grayscale brightness-200" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black italic text-white tracking-tighter uppercase">LISTO PARA PEDIR</h2>
                        <div className="flex items-center gap-2 text-primary">
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Resumen de Mi Ruta</span>
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
                {/* 2. Personalized Input Field */}
                <div className="p-8 pb-4">
                   <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-inner flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                         <UserCircle className="w-5 h-5 text-primary" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Personalizá tu Experiencia</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="INGRESÁ TU NOMBRE..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-transparent border-none text-2xl font-black text-white placeholder:text-white/10 outline-none w-full uppercase tracking-tighter"
                      />
                   </div>
                </div>

                {/* 3. Items Categorized by Block */}
                <div className="p-8 pt-4 space-y-10">
                    
                    {items.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center opacity-10 gap-4 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                            <ShoppingBag className="w-12 h-12" />
                            <span className="text-sm font-bold uppercase tracking-widest">Tu ruta está vacía</span>
                        </div>
                    ) : (
                        <>
                           {/* BURGERS BLOCK */}
                           {burgers.length > 0 && (
                              <div className="space-y-4">
                                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-primary flex items-center gap-2">
                                   <div className="w-4 h-[2px] bg-primary" /> Hamburguesas Elegidas
                                </h3>
                                <div className="space-y-3">
                                   {burgers.map((item) => (
                                     <ItemBlock key={item.product.id} item={item} addItem={addItem} removeItem={removeItem} />
                                   ))}
                                </div>
                              </div>
                           )}

                           {/* EXTRAS BLOCK */}
                           {extras.length > 0 && (
                              <div className="space-y-4">
                                <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30 flex items-center gap-2">
                                   <div className="w-4 h-[2px] bg-white/20" /> Extras & Adicionales
                                </h3>
                                <div className="space-y-3">
                                   {extras.map((item) => (
                                     <ItemBlock key={item.product.id || item.product.name} item={item} addItem={addItem} removeItem={removeItem} isExtra />
                                   ))}
                                </div>
                              </div>
                           )}
                        </>
                    )}
                </div>
            </div>

            {/* 4. Grand Total Summary (HIGH VISIBILITY FOR WAITER) */}
            <div className="p-8 pb-10 sm:p-8 bg-black/60 border-t border-white/10 backdrop-blur-3xl flex flex-col gap-8 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] block mb-2">Total de mi Selección</span>
                        <p className="text-6xl font-black text-white tracking-tighter italic leading-none">
                           {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                </div>

                <div className="bg-primary rounded-[2.5rem] p-6 flex flex-col gap-4 shadow-[0_20px_45px_rgba(209,35,43,0.4)] relative border border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                                <CheckCircle2 className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-white leading-tight uppercase tracking-tight">PEDIDO LISTO {userName ? `PARA ${userName.toUpperCase()}` : ''}</h4>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Muestra esta pantalla al garzón</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6">
                    <button 
                        onClick={clearTray}
                        className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] hover:text-red-500 transition-colors"
                    >
                        — LIMPIAR TODO —
                    </button>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">RUTA 9 CHILE</span>
                </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Internal Sub-component for Item Blocks
const ItemBlock = ({ item, addItem, removeItem, isExtra = false }: any) => (
    <motion.div 
        layout
        className={`rounded-[2rem] p-5 flex items-center justify-between border transition-all ${isExtra ? 'bg-white/5 border-white/5' : 'bg-white/[0.08] border-white/10 shadow-xl'}`}
    >
        <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic shadow-inner ${isExtra ? 'bg-black/40 text-white/40 border border-white/5' : 'bg-primary/20 text-primary border border-primary/20'}`}>
                {isExtra ? "+" : item.product.id}
            </div>
            <div>
                <h4 className={`text-base font-black leading-none mb-1.5 ${isExtra ? 'text-white/60' : 'text-white'}`}>{item.product.name}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                        {item.product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                    </span>
                    {item.quantity > 1 && (
                        <div className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded-full">
                            x{item.quantity}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center bg-black/50 rounded-full p-1 border border-white/10">
                <button 
                    onClick={() => removeItem(item.product.id || item.product.name)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:bg-white/10"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-black text-white leading-none">{item.quantity}</span>
                <button 
                    onClick={() => addItem(item.product)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isExtra ? 'text-white/60 hover:bg-white/10' : 'text-primary hover:bg-primary/10'}`}
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    </motion.div>
);
