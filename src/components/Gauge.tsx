"use client";
import React from "react";
import { Fuel } from "lucide-react";

export const Gauge = ({ value = 75 }) => {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-default h-full">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* SVG Circle Gauge */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * value) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-primary leading-none">{value}%</span>
          <Fuel className="w-2 h-2 text-white/40" />
        </div>
      </div>
      <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors">Fuel</span>
    </div>
  );
};
