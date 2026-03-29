"use client";
import React from "react";
import { Gauge } from "./Gauge";
import { User, Home, ShoppingBag, List, Coffee, Beef, Cookie, UtensilsCrossed } from "lucide-react";
import { useTray } from "@/store/useTray";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "burgers", icon: <Beef className="w-4 h-4" />, label: "Burgers" },
  { id: "snacks", icon: <UtensilsCrossed className="w-4 h-4" />, label: "Snacks" },
  { id: "postres", icon: <Cookie className="w-4 h-4" />, label: "Postres" },
  { id: "drinks", icon: <Coffee className="w-4 h-4" />, label: "Bebidas" },
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
                  className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" 
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

      {/* Bottom Floating Nav - THE COMPASS (v20.0) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] p-6 pb-6 pointer-events-none flex justify-center">
        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-1.5 flex items-center gap-1 shadow-[0_25px_60px_rgba(0,0,0,0.9)] pointer-events-auto relative overflow-hidden">
           
           {/* Section Selector */}
           <div className="flex items-center gap-0.5">
             {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                   <button 
                     key={section.id}
                     onClick={() => setActiveSection(section.id)}
                     className={`relative px-4 py-3 rounded-[1.5rem] flex flex-col items-center gap-1 transition-all active:scale-90 ${isActive ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                   >
                      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-90'}`}>
                        {section.icon}
                      </div>
                      <span className={`text-[7px] font-black uppercase tracking-[0.1em] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                         {section.label}
                      </span>
                      {isActive && (
                         <motion.div 
                           layoutId="nav-active-pill" 
                           className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-[1.5rem] -z-10 shadow-[0_10px_20px_rgba(209,35,43,0.3)]" 
                         />
                      )}
                   </button>
                );
             })}
           </div>

           {/* Divider */}
           <div className="w-[1px] h-8 bg-white/5 mx-1" />

           {/* Tray Trigger */}
           <button 
              onClick={toggleTray}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all group active:scale-95 ${totalItems > 0 ? 'bg-primary text-white shadow-[0_15px_30px_rgba(209,35,43,0.5)]' : 'bg-white/5 text-white/40'}`}
           >
              <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {totalItems > 0 && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white text-[9px] font-black text-primary flex items-center justify-center animate-pulse border border-black/10">
                   {totalItems}
                </div>
              )}
           </button>
        </div>
      </nav>
    </>
  );
};
