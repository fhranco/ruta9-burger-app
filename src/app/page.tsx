import React from "react";
import { Navigation } from "@/components/Navigation";
import { MenuExplorer } from "@/components/MenuExplorer";
import { TrayModal } from "@/components/TrayModal";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] bg-[#08080A] flex flex-col overflow-hidden">
      
      {/* HUD Layers (Heads-Up Display) */}
      <Navigation />
      <TrayModal />

      {/* Main Content Area: Horizontal Scroll of Burgers */}
      <MenuExplorer />

      {/* Gamification Floating Elements (Kilometers etc.) */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 opacity-20 pointer-events-none">
          <div className="w-px h-32 bg-primary" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary italic origin-left rotate-90 -translate-x-1/2 translate-y-16">
            PATAGONIAN ROAD R9
          </span>
      </div>

    </div>
  );
}
