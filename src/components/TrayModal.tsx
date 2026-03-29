"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MapPin, CheckCircle2, UserCircle, Zap, Plus, ChevronRight, MessageSquareDashed } from "lucide-react";

export const TrayModal = () => {
  const { items, isOpen, toggleTray, removeItem, clearTray, userName, setUserName } = useTray();

  const calculateItemTotal = (item: any) => {
    const burgerPrice = item.product.price;
    const extrasPrice = item.extras.reduce((acc: number, extra: any) => acc + extra.price, 0);
    return (burgerPrice + extrasPrice) * item.quantity;
  };

  const totalPrice = items.reduce((acc, item) => acc + calculateItemTotal(item), 0);

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
            {/* 1. Header Area: Branding & Exit */}
            <div className="px-8 pt-10 pb-6 flex items-center justify-between bg-black/30 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <img src="/images/ui/logo.png" className="w-12 h-12 grayscale brightness-200" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black italic text-white tracking-tighter uppercase">LISTO PARA PEDIR</h2>
                        <div className="flex items-center gap-2 text-primary">
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Resumen de Mi Ruta Personal</span>
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
                
                {/* 2. Personalized Identity Block + NOUN BALLOON */}
                <div className="p-8 pb-4 relative">
                   <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10 shadow-inner flex flex-col gap-4 relative">
                      
                      {/* THE NAME BALLOON / CLOUD */}
                      <AnimatePresence>
                        {!userName && (
                           <motion.div
                             initial={{ opacity: 0, scale: 0.8, y: 10 }}
                             animate={{ opacity: 1, scale: 1, y: -80 }}
                             exit={{ opacity: 0, scale: 0.8 }}
                             className="absolute left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black py-4 px-8 rounded-2xl whitespace-nowrap shadow-[0_20px_40px_rgba(209,35,43,0.6)] z-[160] border border-white/20"
                           >
                              ¡PANTALLA PARA EL GARZÓN! <br />¿CÓMO TE LLAMAS? 🏮✍️
                              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 border-r border-b border-white/20" />
                           </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center gap-3">
                         <UserCircle className="w-5 h-5 text-primary" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">IDENTIDAD DE TU PEDIDO</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="INGRESÁ TU NOMBRE..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-transparent border-none text-3xl font-black text-white placeholder:text-white/10 outline-none w-full uppercase tracking-tighter italic"
                      />
                   </div>
                </div>

                {/* 3. Items Categorized by TICKET BLOCKS */}
                <div className="p-8 pt-4 space-y-6">
                    {items.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center opacity-10 gap-4 border-2 border-dashed border-white/5 rounded-[2.5rem]">
                            <MessageSquareDashed className="w-12 h-12" />
                            <span className="text-sm font-bold uppercase tracking-widest italic">Aún no hay nada en tu ruta</span>
                        </div>
                    ) : (
                        items.map((item) => (
                           <motion.div 
                              key={item.id}
                              layout
                              className="bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-6 flex flex-col gap-6 shadow-2xl relative overflow-hidden"
                           >
                              {/* 1. Burger Line */}
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary text-xl font-black italic shadow-inner">
                                       {item.product.id}
                                    </div>
                                    <div>
                                       <h4 className="text-xl font-black italic text-white leading-tight uppercase tracking-tighter mb-1">{item.product.name}</h4>
                                       <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest italic">Hamburguesa Base</p>
                                    </div>
                                 </div>
                                 <button 
                                    onClick={() => removeItem(item.id)}
                                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-red-500 transition-all active:scale-95"
                                 >
                                    <Trash2 className="w-5 h-5" />
                                 </button>
                              </div>

                              {/* 2. Extras List (Internal Block) */}
                              {item.extras.length > 0 && (
                                 <div className="bg-black/40 rounded-3xl p-5 space-y-3 border border-white/5">
                                    <h5 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">PERSONALIZACIÓN CON EXTRAS:</h5>
                                    {item.extras.map((extra: any, idx: number) => (
                                       <div key={idx} className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                             <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(209,35,43,1)]" />
                                             <span className="text-xs font-bold text-white/70 uppercase tracking-tight">{extra.name}</span>
                                          </div>
                                          <span className="text-[10px] font-black text-primary">
                                             + {extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                          </span>
                                       </div>
                                    ))}
                                 </div>
                              )}

                              {/* 3. Block Total Line */}
                              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                 <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Subtotal de este Ticket</span>
                                 <span className="text-xl font-black italic text-white tracking-tighter">
                                    {calculateItemTotal(item).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                 </span>
                              </div>
                           </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* 4. Grand Total Summary (MAX VISIBILITY) */}
            <div className="p-8 pb-10 sm:p-8 bg-black/80 border-t border-white/10 backdrop-blur-3xl flex flex-col gap-8 shadow-[0_-25px_60px_rgba(0,0,0,0.8)]">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] block mb-2">Total de mi Selección Personal</span>
                        <p className="text-6xl font-black text-white tracking-tighter italic leading-none drop-shadow-xl">
                           {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                </div>

                <div className="bg-primary rounded-[3rem] p-6 flex flex-col gap-4 shadow-[0_25px_50px_rgba(209,35,43,0.5)] relative border border-white/30 transition-all active:scale-[0.98]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white p-1 border border-white/20">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-white italic leading-tight uppercase tracking-tight">PEDIDO LISTO {userName ? `PARA ${userName.toUpperCase()}` : 'EN RUTA'}</h4>
                                <p className="text-[11px] font-bold text-white/60 uppercase tracking-[0.1em] opacity-80">Muestra esta pantalla al garzón</p>
                            </div>
                        </div>
                        <ChevronRight className="w-8 h-8 text-white/30" />
                    </div>
                </div>

                <button 
                    onClick={clearTray}
                    className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] hover:text-red-500 transition-colors flex items-center justify-center gap-2"
                >
                    — REINICIAR MI RUTA —
                </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
