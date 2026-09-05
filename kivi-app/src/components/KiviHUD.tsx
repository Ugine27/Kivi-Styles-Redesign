import { motion, AnimatePresence } from 'framer-motion';
import { Mode } from '../useKiviInput';

export default function KiviHUD({ mode, position, degree }: { mode: Mode, position: { x: number, y: number }, degree: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed z-50 pointer-events-none"
      style={{ left: position.x, top: position.y }}
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="relative w-48 h-48 border border-white/10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md shadow-2xl">
          {/* Degree Indicator Bar */}
          <div className="absolute -top-12 flex flex-col items-center gap-2">
            <div className="text-xs font-bold uppercase tracking-widest text-white/50">Degree of Effort</div>
            <div className="flex gap-2">
              {[1, 2, 3].map(d => (
                <div key={d} className={`w-3 h-3 rounded-full transition-colors ${degree >= d ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-white/20'}`}></div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-2xl font-black text-orange-400 text-center tracking-tight leading-tight"
              >
                {mode}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
