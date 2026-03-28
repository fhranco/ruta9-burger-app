"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BurgerCard } from "./BurgerCard";
import menuData from "@/data/menu.json";

gsap.registerPlugin(ScrollTrigger);

export const MenuExplorer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <main 
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory flex flex-col scrollbar-hide select-none pt-24"
    >
      {menuData.burgers.map((burger) => (
        <section key={burger.id} className="min-w-full h-[100dvh] flex-shrink-0 snap-start flex items-center justify-center relative border-b border-white/5">
            <BurgerCard burger={burger} />
        </section>
      ))}

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
