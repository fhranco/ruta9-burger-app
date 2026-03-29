"use client";
import React from "react";
import { Gauge } from "./Gauge";
import { User, Home, ShoppingBag, List, Coffee, Beef, Cookie, Hammer } from "lucide-react";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "factory", icon: <Hammer className="w-5 h-5" />, label: "Factory" },
  { id: "burgers", icon: <Beef className="w-5 h-5" />, label: "Menu" },
  { id: "snacks", icon: <List className="w-5 h-5" />, label: "Snacks" },
  { id: "postres", icon: <Cookie className="w-5 h-5" />, label: "Postres" },
  { id: "drinks", icon: <Coffee className="w-5 h-5" />, label: "Drinks" },
] as const;

export const Navigation = () => {
  const items = useTray((state) => state.items);
  const toggleTray = useTray((state) => state.toggleTray);
  const activeSection = useTray((state) => state.activeSection);
  const setActiveSection = useTray((state) => state.setActiveSection);
  const totalItems = items.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 drop-shadow-lg pointer-events-auto">
             <div className="w-16 h-16 relative p-1 group">
                <img 
                  src="/images/ui/logo.png" 
                  alt="Ruta 9 Logo" 
                  className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 rounded-full" 
                />
             </div>
             <div className="flex flex-col h-full -ml-1">
                <span className="text-[12px] font-black tracking-[0.3rem] opacity-30 leading-none text-white italic">PATAGONIA</span>
             </div>
          </div>
          
          <div className="flex gap-4 pointer-events-auto items-center">
              <Gauge value={Math.min(100, Math.max(20, (totalItems * 25)))} />
          </div>
        </div>
      </header>

      {/* Bottom Floating Nav - THE GIANT COMPASS (v23.0) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] p-4 pb-6 pointer-events-none flex justify-center">
        <div className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex items-center gap-1 shadow-[0_25px_60px_rgba(0,0,0,1)] pointer-events-auto relative overflow-visible">
           
           {/* Section Selector */}
           <div className="flex items-center gap-1">
             {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                const isFactory = section.id === "factory";

                return (
                   <button 
                     key={section.id}
                     onClick={() => setActiveSection(section.id as any)}
                     className={`relative px-4 py-3 rounded-3xl flex flex-col items-center gap-1 transition-all active:scale-90 ${isActive ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                   >
                      <div className={`transition-transform duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}>
                        {section.icon}
                      </div>
                      
                      {isActive && (
                         <motion.div 
                           layoutId="nav-active-pill" 
                           className={`absolute inset-0 border rounded-3xl -z-10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${isFactory ? 'bg-primary/20 border-primary/40' : 'bg-white/10 border-white/20'}`} 
                         />
                      )}

                      <span className={`text-[8px] font-black uppercase tracking-[0.1em] pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                         {section.label}
                      </span>
                   </button>
                );
             })}
           </div>

           {/* Divider */}
           <div className="w-[1.5px] h-10 bg-white/5 mx-2" />

           {/* Tray Trigger */}
           <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTray}
              className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all group ${totalItems > 0 ? 'bg-primary text-white shadow-[0_15px_45px_rgba(209,35,43,0.6)] animate-pulse-red' : 'bg-white/5 text-white/40 border border-white/10'}`}
           >
              <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white text-[10px] font-black text-primary flex items-center justify-center border-2 border-primary shadow-xl"
                  >
                     {totalItems}
                  </motion.div>
                )}
              </AnimatePresence>
           </motion.button>
        </div>
      </nav>
    </>
  );
};
