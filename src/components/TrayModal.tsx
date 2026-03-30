"use client";
import React from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MapPin, CheckCircle2, UserCircle, Zap, Plus, ChevronRight, MessageSquareDashed, AtSign, Store, Send } from "lucide-react";

export const TrayModal = () => {
  const { items, isOpen, toggleTray, removeItem, removeExtraFromItem, clearTray, userName, setUserName } = useTray();

  const calculateItemTotal = (item: any) => {
    const burgerPrice = item.product.price;
    const extrasPrice = item.extras.reduce((acc: number, extra: any) => acc + extra.price, 0);
    return (burgerPrice + extrasPrice) * item.quantity;
  };

  const totalPrice = items.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  const handleWhatsAppDelivery = () => {
    let text = `*📍 NUEVO PEDIDO DELIVERY RUTA 9*\n`;
    if (userName) text += `*🗣️ Cliente:* ${userName}\n`;
    text += `--------------------------\n`;
    
    items.forEach(item => {
      text += `*▶ ${item.quantity}x ${item.product.name}*\n`;
      if (item.extras.length > 0) {
        item.extras.forEach((ex: any) => {
          text += `   + ${ex.name}\n`;
        });
      }
    });

    text += `--------------------------\n`;
    text += `*💰 TOTAL: ${totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}*\n\n`;
    text += `_Pedido generado desde la SuperApp_ 📲🍔\n`;

    const phone = "56957636076";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

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
            className="w-full max-w-[550px] h-[100dvh] sm:h-[90vh] bg-asphalt sm:border border-white/10 sm:rounded-[3rem] shadow-4xl flex flex-col overflow-hidden"
          >
            {/* 1. Header Area: Branding & Exit */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between bg-black/30 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <img src="/images/ui/logo.png" className="w-8 h-8 grayscale brightness-200" alt="Logo" />
                    <div>
                        <h2 className="text-xl font-black italic text-white tracking-tighter uppercase leading-none">
                            RUTA <span className="text-primary animate-pulse">9</span>
                        </h2>
                        <div className="flex items-center gap-1 text-primary mt-1">
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">PEDIDO ACTUAL</span>
                        </div>
                    </div>
                </div>
                <button 
                  onClick={toggleTray}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto scrollbar-hide">
                
                {/* 2. Personalized Identity Block + NOUN BALLOON */}
                <div className="p-4 pb-2 mt-4 relative">
                   <div className="bg-white/5 rounded-[2rem] p-5 border border-white/10 shadow-inner flex flex-col gap-2 relative">
                      
                      {/* THE NAME BALLOON / CLOUD */}
                      <AnimatePresence>
                        {!userName && (
                           <motion.div
                             initial={{ opacity: 0, scale: 0.8, y: 10 }}
                             animate={{ opacity: 1, scale: 1, y: -45 }}
                             exit={{ opacity: 0, scale: 0.8 }}
                             className="absolute left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black py-3 px-6 rounded-2xl whitespace-nowrap shadow-[0_15px_30px_rgba(209,35,43,0.6)] z-[160] border border-white/20"
                           >
                               ¡PANTALLA PARA EL ANFITRIÓN! <br />¿CÓMO TE LLAMAS? 🏮✍️
                               <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 border-r border-b border-white/20" />
                           </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center gap-2">
                         <UserCircle className="w-4 h-4 text-primary" />
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">IDENTIDAD DE TU PEDIDO</span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="INGRESÁ TU NOMBRE..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-transparent border-none text-xl font-black text-white placeholder:text-white/10 outline-none w-full uppercase tracking-tighter italic"
                      />
                   </div>
                </div>

                {/* 3. Items Categorized by TICKET BLOCKS */}
                <div className="p-4 pt-2 space-y-3">
                    {items.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center opacity-10 gap-3 border-2 border-dashed border-white/5 rounded-3xl">
                            <MessageSquareDashed className="w-8 h-8" />
                            <span className="text-xs font-bold uppercase tracking-widest italic">Aún no hay nada en tu ruta</span>
                        </div>
                    ) : (
                        items.map((item) => (
                           <motion.div 
                              key={item.id}
                              layout
                              className="bg-white/[0.04] border border-white/10 rounded-3xl p-4 flex flex-col gap-3 shadow-xl relative overflow-hidden"
                           >
                              {/* 1. Burger Line */}
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary text-sm font-black italic shadow-inner">
                                       {item.product.id}
                                    </div>
                                    <div className="flex flex-col">
                                       <h4 className="text-base font-black italic text-white leading-none uppercase tracking-tighter mb-0.5">{item.product.name}</h4>
                                       <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic">{item.product.type || 'Producto Base'}</span>
                                    </div>
                                 </div>
                                 <button 
                                    onClick={() => removeItem(item.id)}
                                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 hover:text-red-500 transition-all active:scale-95"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>

                              {/* 2. Extras List (Internal Block) */}
                              {item.extras.length > 0 && (
                                 <div className="bg-black/40 rounded-2xl p-3 space-y-1.5 border border-white/5">
                                    <h5 className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">PERSONALIZACIÓN CON EXTRAS:</h5>
                                      {item.extras.map((extra: any, idx: number) => (
                                       <div key={idx} className="flex items-center justify-between group">
                                          <div className="flex items-center gap-2">
                                             <button 
                                                onClick={() => removeExtraFromItem(item.id, extra.name)}
                                                className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/80 transition-colors shrink-0"
                                             >
                                                <X className="w-2.5 h-2.5 text-white" />
                                             </button>
                                             <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(209,35,43,1)] opacity-50" />
                                             <span className="text-[10px] font-bold text-white/70 uppercase tracking-tight">{extra.name}</span>
                                          </div>
                                          <span className="text-[9px] font-black text-primary">
                                             + {extra.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                          </span>
                                       </div>
                                    ))}
                                 </div>
                              )}

                              {/* 3. Block Total Line */}
                              <div className="flex items-center justify-between border-t border-white/5 pt-2">
                                 <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Subtotal Ticket</span>
                                 <span className="text-sm font-black italic text-white tracking-tighter">
                                    {calculateItemTotal(item).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                 </span>
                              </div>
                           </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* 4. Grand Total Summary (MAX VISIBILITY) & ACTIONS */}
            <div className="p-6 pb-8 bg-black/90 border-t border-white/10 backdrop-blur-3xl flex flex-col gap-4 shadow-[0_-25px_60px_rgba(0,0,0,0.8)]">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] block mb-1">Total Selección</span>
                        <p className="text-4xl font-black text-white tracking-tighter italic leading-none drop-shadow-xl">
                           {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                        </p>
                    </div>
                </div>

                {/* ACTION BUTTONS (SPLIT GRID) */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                   {/* DINE-IN (ANFITRIÓN) */}
                   <div className="bg-primary/20 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-primary/30 relative overflow-hidden group">
                       <Store className="w-5 h-5 text-primary" />
                       <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-0.5">LOCAL</span>
                           <span className="text-[7.5px] font-bold text-white/50 uppercase tracking-[0.1em]">Muestra al Anfitrión</span>
                       </div>
                   </div>
                   
                   {/* DELIVERY (WHATSAPP) */}
                   <button 
                     onClick={handleWhatsAppDelivery}
                     className="bg-[#25D366] rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-2 border border-[#25D366]/50 shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:scale-105 active:scale-95 transition-all group overflow-hidden relative"
                   >
                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                       <Send className="w-5 h-5 text-white relative z-10 -rotate-12 group-hover:rotate-0 transition-transform" />
                       <div className="flex flex-col relative z-10">
                           <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none mb-0.5">DELIVERY</span>
                           <span className="text-[7.5px] font-bold text-white/90 uppercase tracking-[0.1em]">Enviar por WhatsApp</span>
                       </div>
                   </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                   <button 
                       onClick={clearTray}
                       className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] hover:text-red-500 transition-colors flex items-center gap-2"
                   >
                       <Trash2 className="w-3 h-3" /> BORRAR RUTA
                   </button>

                   <a href="https://www.instagram.com/ruta9.burgers" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-[#E1306C] transition-colors">
                       <AtSign className="w-4 h-4" /> @RUTA9.BURGERS
                   </a>
                </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
