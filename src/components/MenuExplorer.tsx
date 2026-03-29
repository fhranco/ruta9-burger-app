"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BurgerCard } from "./BurgerCard";
import menuData from "@/data/menu.json";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export const MenuExplorer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSection = useTray((state) => state.activeSection);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".noise-overlay", {
         x: -40,
         y: -20,
         duration: 4,
         repeat: -1,
         yoyo: true,
         ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Map section key to items list
  const getItems = () => {
    switch(activeSection) {
      case "burgers": return menuData.burgers;
      case "snacks": return menuData.snacks;
      case "sandwiches": return menuData.sandwiches;
      case "postres": return menuData.postres;
      default: return [];
    }
  };

  const currentItems = getItems();

  return (
    <main 
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory flex flex-col scrollbar-hide select-none pt-24"
    >
      <AnimatePresence mode="wait">
        {activeSection !== "drinks" ? (
           <motion.div 
             key={activeSection}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="flex flex-col"
           >
              {currentItems.map((item) => (
                <section key={item.id} className="min-w-full h-[100dvh] flex-shrink-0 snap-start flex items-center justify-center relative border-b border-white/5">
                    <BurgerCard burger={item} />
                </section>
              ))}
           </motion.div>
        ) : (
           <motion.div 
             key="drinks"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="min-h-[100dvh] pt-10 px-8 pb-32 space-y-12"
           >
              {/* Specialized Drinks Rendering */}
              <div className="flex flex-col items-center gap-2 mb-10">
                 <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">¿Y PARA ACOMPAÑAR?</h2>
                 <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">LA HIDRATACIÓN DEL VIAJERO</p>
              </div>

              {Object.keys(menuData.drinks).map((cat) => (
                 <div key={cat} className="space-y-4">
                     <h3 className="text-sm font-black italic text-white/50 uppercase tracking-widest border-b border-white/5 pb-2">
                        {cat}
                     </h3>
                     <div className="grid grid-cols-1 gap-3">
                         {(menuData.drinks as any)[cat].map((drink: any) => (
                            <DrinkCard key={drink.name} drink={drink} />
                         ))}
                     </div>
                 </div>
              ))}
           </motion.div>
        )}
      </AnimatePresence>

      {/* Road background for the whole trip */}
      <div className="fixed inset-0 z-[-10] opacity-30 pointer-events-none">
          <img 
              src="/images/bg/road.jpg" 
              alt="Background Road" 
              className="w-full h-full object-cover grayscale-[0.5]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt via-transparent to-asphalt" />
      </div>
    </main>
  );
};

const DrinkCard = ({ drink }: { drink: any }) => {
   const addItem = useTray((state) => state.addItem);
   
   return (
     <button 
        onClick={() => addItem({ ...drink, id: 'DR-'+drink.name, type: 'drink' })}
        className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-primary/40 transition-all active:scale-95 text-left group"
     >
        <div>
           <h4 className="text-base font-bold text-white uppercase tracking-tight">{drink.name}</h4>
           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">Calidad Selección Ruta 9</p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-lg font-black italic text-primary tracking-tighter">
              {drink.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
           </span>
           <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-[8px] font-black text-white px-2 py-0.5 rounded-full mt-1">
              + AÑADIR
           </div>
        </div>
     </button>
   );
};
