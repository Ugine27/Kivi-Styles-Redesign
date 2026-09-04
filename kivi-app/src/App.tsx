import React, { useEffect } from 'react';
import { useKiviInput } from './useKiviInput';
import KiviHUD from './components/KiviHUD';
import MockOS from './components/MockOS';
import { Bird } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const { isAltPressed, isScrolling, isLoading, hudPos, mode, degree, transcript, translatedText } = useKiviInput();

  // Enter full screen on first user interaction to sell the OS feel
  useEffect(() => {
    const goFullscreen = async () => {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (e) {}
      }
    };
    window.addEventListener('click', goFullscreen, { once: true });
    return () => window.removeEventListener('click', goFullscreen);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-neutral-900 overflow-hidden flex flex-col font-sans">
      <MockOS activeText={(!isAltPressed && !isLoading && translatedText) ? translatedText : ''} />
      
      <AnimatePresence>
        {isAltPressed && isScrolling && (
          <KiviHUD mode={mode} position={hudPos} degree={degree} />
        )}
      </AnimatePresence>
      
      {/* Transcribing Indicator - Bird */}
      <AnimatePresence>
        {(isAltPressed || isLoading) && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 z-[60]"
          >
            <div className="p-3 rounded-full glass-dark text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              <Bird className={`w-6 h-6 ${isLoading ? 'animate-bounce' : 'animate-pulse'}`} />
            </div>
            <span className="text-xs text-white/50 font-medium tracking-widest uppercase bg-black/40 px-2 py-1 rounded">
              {isLoading ? 'Thinking...' : 'Listening'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
