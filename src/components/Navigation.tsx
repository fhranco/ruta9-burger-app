"use client";
import React from "react";
import { Gauge } from "./Gauge";
import { User, Home, ShoppingBag, List } from "lucide-react";
import { useTray } from "@/store/useTray";

export const Navigation = () => {
  const items = useTray((state) => state.items);
  const toggleTray = useTray((state) => state.toggleTray);
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
              <button className="w-10 h-10 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all backdrop-blur-3xl">
                 <User className="w-5 h-5" />
              </button>
          </div>
        </div>
      </header>

      {/* Bottom Floating Pill Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-4 pointer-events-none flex justify-center">
        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex items-center gap-1 shadow-[0_25px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
           <button className="flex items-center gap-2 bg-primary px-6 py-3 rounded-full text-white shadow-[0_10px_20px_rgba(209,35,43,0.3)] hover:scale-105 active:scale-95 transition-all">
              <Home className="w-4 h-4" />
              <span className="text-[10px] uppercase font-black tracking-widest">Misiones</span>
           </button>

           <button 
              onClick={toggleTray}
              className="relative w-12 h-12 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all overflow-visible"
           >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-[8px] font-black text-white flex items-center justify-center animate-pulse-red border border-black shadow-lg">
                   {totalItems}
                </div>
              )}
           </button>

           <button className="w-12 h-12 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
              <List className="w-5 h-5" />
           </button>
        </div>
      </nav>
    </>
  );
};
