"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Share2, Award, Zap, Check, ChevronUp } from "lucide-react";
import { useTray } from "@/store/useTray";
import { UpsellDrawer } from "./UpsellDrawer";

export const BurgerCard = ({ burger }: { burger: any }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const addItem = useTray((state) => state.addItem);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);

  const handleAddAction = () => {
    addItem(burger);
    setShowUpsell(true);
    setShowBalloon(true);
    setTimeout(() => setShowBalloon(false), 3000);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative w-full h-[100dvh] flex flex-col items-center justify-between pt-24 pb-36 px-8 overflow-hidden snap-start"
      >
        {/* Glow Background */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-25 -z-10 transition-colors duration-1000 ${isInView ? "bg-primary" : "bg-white/5"}`} />

        {/* Header Info */}
        <div className="w-full flex flex-col items-center gap-2 z-10 px-4">
          
          <div className="relative text-center flex flex-col items-center h-24">
            <motion.h3 
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 0.15, y: 0 } : {}}
              className="text-[120px] font-black leading-none tracking-tighter absolute -top-10"
            >
              {burger.id}
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="text-4xl md:text-5xl font-black italic font-serif text-white relative z-20 tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {burger.name}
            </motion.h2>
          </div>
        </div>

        {/* Central Hero Image */}
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
              src={`/images/products/${burger.id}.webp`} 
              alt={burger.name}
              className="w-full h-full object-contain transform scale-110 pointer-events-none"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Interaction Footer Area - PRICE CLARITY REWORKED */}
        <div className="w-full max-w-[500px] flex flex-col gap-8 z-10 relative">
          
          {/* Ingredients */}
          <div className="text-center px-4">
              <p className="text-sm md:text-base text-snow/70 leading-relaxed font-medium tracking-wide">
                {burger.ingredients}
              </p>
          </div>

          {/* Action Pill - High Contrast Price */}
          <div className="flex items-center justify-between bg-black/60 backdrop-blur-3xl border border-white/20 rounded-full p-2.5 pl-10 shadow-4xl relative overflow-visible group">
            
            <AnimatePresence>
              {showBalloon && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -100, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold py-3 px-8 rounded-2xl whitespace-nowrap shadow-[0_20px_40px_rgba(209,35,43,0.6)] z-[100] border border-white/30"
                >
                    ¡AÑADIDA! ¿Vemos un EXTRA? 👇
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 border-r border-b border-white/20" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-black tracking-[0.3em] text-primary mb-1">PRECIO CHILE</span>
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-lg">
                {burger.price === 0 ? "Consulte" : burger.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </span>
            </div>
            
            <div className="flex gap-2">
               <button 
                  onClick={handleAddAction}
                  className="bg-primary hover:bg-[#A32025] text-white font-black h-16 px-10 rounded-full flex items-center gap-3 transition-all shadow-[0_15px_35px_rgba(209,35,43,0.4)] hover:scale-105 active:scale-95 min-w-[160px] justify-center text-sm tracking-widest"
               >
                  LO QUIERO <ChevronUp className="w-5 h-5 animate-bounce" />
               </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-6 opacity-40">
              <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-snow italic">Energía Patagónica</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-snow italic">Ruta 9 Original Chile</span>
          </div>
        </div>
      </motion.div>

      {/* STEP 2: UPSELL DRAWER */}
      <UpsellDrawer 
        isOpen={showUpsell} 
        onClose={() => setShowUpsell(false)} 
        burgerName={burger.name}
      />
    </>
  );
};
