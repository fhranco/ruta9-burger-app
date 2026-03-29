"use client";
import React from "react";
import { Navigation } from "@/components/Navigation";
import { MenuExplorer } from "@/components/MenuExplorer";
import { TrayModal } from "@/components/TrayModal";
import { WelcomeOverlay } from "@/components/WelcomeOverlay";

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh]">
      {/* 1. INITIAL CHECK-IN */}
      <WelcomeOverlay />

      {/* 2. THE NAVIGATION COMPASS */}
      <Navigation />
      
      {/* 3. THE DISCOVERY ENGINE */}
      <MenuExplorer />
      
      {/* 4. THE LIVE TICKET */}
      <TrayModal />
    </div>
  );
}
