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

        {/* Header Info - REWORKED FOR MAX ID VISIBILITY */}
        <div className="w-full flex flex-col items-center gap-1 z-10 px-4">
          
          {/* THE TACTICAL STAMP (v19.0) */}
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={isInView ? { scale: 1, opacity: 1 } : {}}
             transition={{ type: "spring", stiffness: 200 }}
             className="bg-primary px-6 py-2 rounded-2xl shadow-[0_20px_40px_rgba(209,35,43,0.6)] border-2 border-white/20 transform -rotate-3 mb-4"
          >
             <span className="text-4xl font-black italic text-white tracking-tighter leading-none">
                {burger.id}
             </span>
          </motion.div>

          <div className="relative text-center flex flex-col items-center justify-center w-full px-2 min-h-[60px]">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="text-[1.7rem] sm:text-4xl md:text-5xl font-black italic font-serif text-white relative z-20 tracking-tighter drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] uppercase text-balance leading-none"
            >
              {burger.name}
            </motion.h2>
          </div>
        </div>

        {/* Central Hero Image - MASSIVE SCALE */}
        <div className="flex-grow w-full flex items-center justify-center relative z-0 my-[-10px] min-h-[35vh]">
          <motion.div 
            animate={isInView ? {
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0]
            } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-[110%] flex items-center justify-center filter drop-shadow-[0_45px_80px_rgba(0,0,0,0.95)]"
          >
            <img 
              src={`/images/products/${burger.id}.webp`} 
              alt={burger.name}
              className="w-[120%] h-[120%] sm:w-full sm:h-full max-w-[500px] object-contain transform scale-[1.15] sm:scale-125 pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Interaction Footer Area */}
        <div className="w-full max-w-[500px] flex flex-col gap-8 z-10 relative">
          
          {/* Ingredients / Instructions */}
          <div className="text-center px-6">
              <p className="text-base sm:text-lg text-snow leading-snug font-bold tracking-wide break-words drop-shadow-md pb-2">
                {burger.ingredients}
              </p>
          </div>

          {/* Action Pill - PURE PRICE */}
          <div className="flex items-center justify-between bg-black/60 backdrop-blur-3xl border border-white/20 rounded-full p-2 pl-4 sm:pl-8 shadow-4xl relative overflow-visible group w-full max-w-[95vw] mx-auto">
            
            <AnimatePresence>
              {showBalloon && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, y: -80, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold py-2 px-4 sm:px-8 rounded-2xl whitespace-nowrap shadow-[0_20px_40px_rgba(209,35,43,0.6)] z-[100] border border-white/30"
                >
                    ¡AÑADIDA! ¿Vemos un EXTRA? 👇
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 border-r border-b border-white/20" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-lg leading-none">
                {burger.price === 0 ? "Consulte" : burger.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
              </span>
            </div>
            
            <div className="flex gap-2">
               <button 
                  onClick={handleAddAction}
                  className="bg-primary hover:bg-[#A32025] text-white font-black h-12 sm:h-16 px-4 sm:px-10 rounded-full flex items-center gap-2 transition-all shadow-[0_15px_35px_rgba(209,35,43,0.4)] hover:scale-105 active:scale-95 min-w-[120px] sm:min-w-[160px] justify-center text-[10px] sm:text-sm tracking-widest whitespace-nowrap"
               >
                  LO QUIERO <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
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
