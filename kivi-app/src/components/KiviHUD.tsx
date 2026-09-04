import React from 'react';
import { motion } from 'framer-motion';
import { Mode } from '../useKiviInput';

interface KiviHUDProps {
  mode: Mode;
  position: { x: number, y: number };
  degree: number;
}

export default function KiviHUD({ mode, position, degree }: KiviHUDProps) {
  const modes: Mode[] = ['PULSE', 'LEGO', 'FLOW'];
  const degrees = [1, 2, 3];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ left: position.x, top: position.y }}
      className="absolute -translate-x-1/2 -translate-y-1/2 glass-dark rounded-3xl p-6 flex flex-col gap-6 border border-white/20 z-[70] pointer-events-none shadow-2xl min-w-[280px]"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        {modes.map((m) => {
          const isActive = mode === m;
          return (
            <motion.div 
              key={m}
              animate={{ 
                scale: isActive ? 1.15 : 0.9, 
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-full text-center py-2.5 rounded-xl text-lg font-bold tracking-widest ${isActive ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-white'}`}
            >
              {m}
            </motion.div>
          );
        })}
      </div>

      {/* Effort / Complexity Bar */}
      <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/10">
        <div className="flex justify-between w-full text-[9px] text-white/50 uppercase tracking-widest font-bold px-1">
          <span>Low</span>
          <span>Effort</span>
          <span>High</span>
        </div>
        <div className="flex gap-1.5 w-full justify-center">
          {degrees.map((d) => (
            <div 
              key={d} 
              className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${degree >= d ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
