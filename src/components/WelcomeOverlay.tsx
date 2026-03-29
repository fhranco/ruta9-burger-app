"use client";
import React, { useState, useEffect } from "react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Zap } from "lucide-react";

export const WelcomeOverlay = () => {
  const { userName, setUserName } = useTray();
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Show only if there's no name in the store
    if (!userName) setShow(true);
  }, [userName]);

  const handleStart = () => {
    if (inputValue.trim()) {
      setUserName(inputValue.toUpperCase());
      setShow(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[200] bg-asphalt flex items-center justify-center p-8 overflow-hidden"
        >
           {/* Cinematic Background */}
           <div className="absolute inset-0 z-0">
             <img src="/images/bg/road.jpg" className="w-full h-full object-cover grayscale opacity-30 scale-110" alt="Road" />
             <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/80 to-transparent" />
           </div>

           <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center gap-10">
              {/* Branding */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                  <img src="/images/ui/logo.png" className="w-32 h-32 grayscale brightness-200" alt="Logo" />
                  <div className="text-center">
                    <h1 className="text-sm font-black uppercase tracking-[0.5em] text-primary italic mb-2">PUNTA ARENAS • CHILE</h1>
                    <h2 className="text-4xl font-black italic text-white tracking-tighter uppercase leading-none">
                       ¿QUÉ COMERÁS <br /> <span className="text-primary not-italic">HOY?</span>
                    </h2>
                  </div>
              </motion.div>

              {/* Name Input Box */}
              <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="w-full bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-4xl focus-within:border-primary transition-colors"
              >
                 <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/30">Identifical tu ruta personal</span>
                 </div>
                 <input 
                    type="text" 
                    placeholder="INGRESÁ TU NOMBRE..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                    className="bg-transparent border-none text-3xl font-black text-white placeholder:text-white/10 outline-none w-full uppercase tracking-tighter"
                    autoFocus
                 />
                 
                 <button 
                   onClick={handleStart}
                   className="w-full bg-primary text-white font-black h-18 py-5 rounded-3xl flex items-center justify-center gap-4 shadow-[0_20px_45px_rgba(209,35,43,0.4)] hover:scale-[1.02] active:scale-95 transition-all text-base uppercase tracking-widest disabled:opacity-30 disabled:grayscale"
                   disabled={!inputValue.trim()}
                 >
                    INICIAR EL VIAJE <ChevronRight className="w-6 h-6" />
                 </button>
              </motion.div>

              {/* Footer Quote */}
              <div className="flex items-center gap-4 opacity-30 mt-10">
                  <div className="w-10 h-[1.5px] bg-white/40" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Ruta 9 Original Chile</span>
                  <div className="w-10 h-[1.5px] bg-white/40" />
              </div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
