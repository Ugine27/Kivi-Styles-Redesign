import React from 'react';
import { motion } from 'framer-motion';
import { Mode } from '../useKiviInput';

interface KiviHUDProps {
  mode: Mode;
  degree: number;
  transcript: string;
  translatedText: string;
}

export default function KiviHUD({ mode, degree, transcript, translatedText }: KiviHUDProps) {
  const degrees = [1, 2, 3, 4, 5];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] glass-dark rounded-2xl p-6 flex flex-col gap-5 border border-white/10 z-50 pointer-events-none"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {(['PULSE', 'LEGO', 'FLOW'] as Mode[]).map((m) => (
            <div 
              key={m}
              className={`px-3 py-1 rounded-md text-xs font-bold tracking-wider ${mode === m ? 'bg-white text-black' : 'text-white/40'}`}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="text-white/30 text-xs">Scroll to switch</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-xs text-white/40 uppercase tracking-widest">Raw Input</div>
        <div className="text-sm text-white/60 italic leading-relaxed">
          "{transcript}"
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
        <div className="text-xs text-emerald-400 uppercase tracking-widest flex justify-between">
          <span>Translation</span>
          <span className="text-white/30 lowercase">release Alt to drop</span>
        </div>
        <div className="text-base text-white font-medium leading-relaxed bg-white/5 p-3 rounded-lg">
          {translatedText}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="text-white/30 text-xs">Arrow keys to adjust</div>
        <div className="flex gap-2">
          {degrees.map((d) => (
            <div 
              key={d} 
              className={`w-8 h-2 rounded-full transition-all duration-300 ${degree >= d ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
