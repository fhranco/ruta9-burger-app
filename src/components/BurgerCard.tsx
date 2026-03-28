"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Share2, Award, Zap, Check, Info } from "lucide-react";
import { useTray } from "@/store/useTray";

export const BurgerCard = ({ burger }: { burger: any }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const addItem = useTray((state) => state.addItem);
  const [showBalloon, setShowBalloon] = useState(false);

  const handleAdd = () => {
    addItem(burger);
    setShowBalloon(true);
    setTimeout(() => setShowBalloon(false), 3000);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[100dvh] flex flex-col items-center justify-between pt-24 pb-36 px-8 overflow-hidden snap-start"
    >
      {/* 1. LAYER: DYNAMIC BACKGROUND GLOW */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20 -z-10 transition-colors duration-1000 ${isInView ? "bg-primary" : "bg-white/5"}`} />

      {/* 2. LAYER: BRAND & ID HEADER */}
      <div className="w-full flex flex-col items-center gap-2 z-10">
        <motion.div 
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          className="glass-red px-6 py-2 rounded-full mb-4"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary flex items-center gap-2">
            <Award className="w-3 h-3" /> {burger.tag || "PREMIUM"}
          </span>
        </motion.div>
        
        <div className="relative text-center flex flex-col items-center h-24">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 0.1, y: 0 } : {}}
            className="text-[120px] font-black leading-none tracking-tighter absolute -top-10"
          >
            {burger.id}
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="text-4xl md:text-5xl font-black italic font-serif text-white relative z-20 tracking-tight drop-shadow-2xl"
          >
            {burger.name}
          </motion.h2>
        </div>
      </div>

      {/* 3. LAYER: CENTRAL BURGER HERO */}
      <div className="flex-grow flex items-center justify-center relative w-full h-full max-w-[500px] z-0 -my-10">
        <motion.div 
          animate={isInView ? {
            y: [0, -15, 0],
            rotate: [0, 2, 0, -2, 0]
          } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full aspect-square flex items-center justify-center filter drop-shadow-[0_45px_100px_rgba(0,0,0,0.95)]"
        >
          <img 
            src={`/images/products/${burger.id}.png`} 
            alt={burger.name}
            className="w-full h-full object-contain transform scale-110 pointer-events-none"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800';
            }}
          />
        </motion.div>
      </div>

      {/* 4. LAYER: DETAILS & ACTION FOOTER */}
      <div className="w-full max-w-[500px] flex flex-col gap-6 z-10 relative">
        
        {/* Ingredients Text */}
        <div className="text-center px-4">
            <p className="text-xs md:text-sm text-snow/60 leading-relaxed font-medium tracking-wide">
              {burger.ingredients}
            </p>
        </div>

        {/* Action Pill (Price + Button) */}
        <div className="flex items-center justify-between bg-black/50 backdrop-blur-3xl border border-white/10 rounded-full p-2 pl-8 shadow-2xl relative group">
          
          {/* Notification Balloon */}
          <AnimatePresence>
            {showBalloon && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -80, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold py-3 px-6 rounded-2xl whitespace-nowrap shadow-[0_15px_30px_rgba(209,35,43,0.5)] z-[100] border border-white/20"
              >
                  ¡AÑADIDO! Mirá tu pedido abajo 👇
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 border-r border-b border-white/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-white/30">Precio Chile</span>
            <span className="text-2xl font-black text-white tracking-tighter">
              {burger.price === 0 ? "Consulte" : burger.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </span>
          </div>
          
          <div className="flex gap-2">
             <button className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
             </button>
             <button 
                onClick={handleAdd}
                className="bg-primary hover:bg-[#A32025] text-white font-black h-14 px-8 rounded-full flex items-center gap-3 transition-all shadow-[0_10px_20px_rgba(209,35,43,0.3)] hover:scale-105 active:scale-95 w-48 justify-center"
             >
                {showBalloon ? <Check className="w-5 h-5" /> : "LO QUIERO"}
             </button>
          </div>
        </div>

        {/* Kilometer / Badges Indicator */}
        <div className="flex items-center justify-center gap-6 opacity-20">
            <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-primary" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-snow">Energía Patagónica</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-snow">Ruta 9 Chile</span>
        </div>

      </div>

    </motion.div>
  );
};
