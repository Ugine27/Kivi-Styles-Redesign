import React from 'react';
import { useKiviInput } from './useKiviInput';
import KiviHUD from './components/KiviHUD';
import MockOS from './components/MockOS';
import { Bird } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const { isAltPressed, mode, degree, transcript, translatedText } = useKiviInput();

  return (
    <div className="relative w-screen h-screen bg-neutral-900 overflow-hidden flex flex-col font-sans">
      <MockOS activeText={!isAltPressed ? translatedText : ''} />
      
      <AnimatePresence>
        {isAltPressed && (
          <KiviHUD mode={mode} degree={degree} transcript={transcript} translatedText={translatedText} />
        )}
      </AnimatePresence>
      
      {/* Transcribing Indicator - Bird */}
      <AnimatePresence>
        {isAltPressed && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2"
          >
            <div className="p-3 rounded-full glass-dark text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              <Bird className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xs text-white/50 font-medium tracking-widest uppercase">Listening</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
