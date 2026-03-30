"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BurgerCard } from "./BurgerCard";
import menuData from "@/data/menu.json";
import { useTray } from "@/store/useTray";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Construction, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const MenuExplorer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSection = useTray((state) => state.activeSection);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {}, containerRef);
    return () => ctx.revert();
  }, []);

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
        
        {/* CASE 1: BURGER FACTORY (DEJA APARTE) */}
        {activeSection === "factory" && (
           <motion.div 
             key="factory"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="min-h-[100dvh] flex flex-col items-center justify-center p-8 text-center relative snap-start"
           >
              <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 overflow-hidden pointer-events-none max-w-[100vw]">
                 <h1 className="text-[120px] md:text-[250px] font-black text-white/5 whitespace-nowrap -rotate-12 translate-x-[-10%] translate-y-[-10%]">
                    FACTORY
                 </h1>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6 max-w-[400px]">
                  <div className="bg-primary p-4 rounded-3xl shadow-2xl mb-2">
                     <Construction className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
                     BURGER <br /> <span className="text-primary not-italic">FACTORY</span>
                  </h2>
                  <p className="text-snow/60 text-sm leading-relaxed font-medium">
                     {menuData.factory.description} <br />
                     <span className="text-white/80 font-bold mt-2 block">
                        INCLUYE: {menuData.factory.includes}
                     </span>
                  </p>
                  
                  <div className="w-full mt-4">
                     <BurgerCard burger={{ ...menuData.factory, price: menuData.factory.basePrice }} />
                  </div>

                  <div className="mt-10 animate-bounce opacity-20">
                     <ChevronDown className="w-6 h-6 text-white" />
                  </div>
              </div>
           </motion.div>
        )}

        {/* CASE 2: REGULAR SECTIONS (SNACKS, POSTRES) WITH GIGANTIC TITLES */}
        {(activeSection === "burgers" || activeSection === "snacks" || activeSection === "sandwiches" || activeSection === "postres") && (
           <motion.div 
             key={activeSection}
             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
             className="flex flex-col"
           >
              {/* HEADING GIGANTE DE FONDO PARA CATEGORÍAS */}
              {activeSection !== "burgers" && (
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[-1] max-w-[100vw] overflow-hidden opacity-5">
                   <h1 className="text-[120px] md:text-[250px] font-black text-white uppercase whitespace-nowrap">
                      {activeSection}
                   </h1>
                </div>
              )}

              {currentItems.map((item) => (
                <section key={item.id} className="min-w-full h-[100dvh] flex-shrink-0 snap-start flex items-center justify-center relative border-b border-white/5">
                    <BurgerCard burger={item} />
                </section>
              ))}
           </motion.div>
        )}

        {/* CASE 3: DRINKS (LA HIDRATACIÓN) GIGANTE */}
        {activeSection === "drinks" && (
           <motion.div 
             key="drinks"
             initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
             className="min-h-[100dvh] pt-10 px-8 pb-32 space-y-12"
           >
              <div className="fixed inset-0 flex items-start justify-center pointer-events-none z-[-1] opacity-[0.03] overflow-hidden pt-40">
                 <h1 className="text-[250px] font-black text-white uppercase whitespace-nowrap rotate-90">
                    DRINKS
                 </h1>
              </div>

              <div className="flex flex-col items-center gap-2 mb-10 text-center">
                 <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter leading-none">LA <br /> HIDRATACIÓN</h2>
                 <p className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] mt-2">EL REPOSTAJE DEL VIAJERO</p>
              </div>

              {Object.keys(menuData.drinks).map((cat) => (
                 <div key={cat} className="space-y-6">
                     <h3 className="text-xl font-black italic text-white/40 uppercase tracking-[0.2em] border-l-4 border-primary pl-4 py-1">
                        {cat}
                     </h3>
                     <div className="grid grid-cols-1 gap-4">
                         {(menuData.drinks as any)[cat].map((drink: any) => (
                            <DrinkCard key={drink.name} drink={drink} />
                         ))}
                     </div>
                 </div>
              ))}
           </motion.div>
        )}
      </AnimatePresence>

      {/* Road background */}
      <div className="fixed inset-0 z-[-10] opacity-30 pointer-events-none">
          <img src="/images/bg/road.jpg" alt="BG" className="w-full h-full object-cover grayscale-[0.5]" />
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
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:border-primary transition-all active:scale-95 text-left group shadow-lg"
     >
        <div className="max-w-[70%]">
           <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none mb-1">{drink.name}</h4>
           <div className="flex items-center gap-2 opacity-30">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[8px] font-black uppercase tracking-widest">Premium Selection</span>
           </div>
        </div>
        <div className="text-right">
           <span className="text-2xl font-black italic text-primary tracking-tighter block mb-1">
              {drink.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
           </span>
           <div className="bg-primary/10 text-primary text-[8px] font-black px-3 py-1 rounded-full border border-primary/20">
              + AÑADIR
           </div>
        </div>
     </button>
   );
};
