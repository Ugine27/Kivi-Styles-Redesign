import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Check, Copy, X, Sparkles, CornerDownLeft } from 'lucide-react';

export interface FloatingDictationHUDProps {
  isOpen: boolean;
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  transformedText: string;
  mode: string;
  degree?: number;
  destinationApp: string | null;
  onClose: () => void;
  onSimulateSpeech?: (sampleText: string) => void;
  onTogglePersonaDial?: () => void;
}

export default function FloatingDictationHUD({
  isOpen,
  isListening,
  isProcessing,
  transcript,
  transformedText,
  mode,
  destinationApp,
  onClose,
  onTogglePersonaDial,
}: FloatingDictationHUDProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Reset copy state on new transformed text
  useEffect(() => {
    setIsCopied(false);
  }, [transformedText]);

  // Close on Escape key or Scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const handleWheel = (e: WheelEvent) => {
      const hudElement = document.getElementById('whispurr-floating-hud');
      if (hudElement && hudElement.contains(e.target as Node)) {
        return; // allow scrolling inside HUD
      }
      onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    const textToCopy = transformedText || transcript;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Remove the early return so AnimatePresence can handle the exit animation
  // if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 25, x: "-50%", scale: 0.96 }}
        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
        exit={{ opacity: 0, y: 25, x: "-50%", scale: 0.96 }}
        transition={{ type: "spring", mass: 0.8, stiffness: 280, damping: 24 }}
        className="fixed bottom-16 md:bottom-20 left-1/2 z-[9999] w-[92vw] max-w-md select-none"
      >
        <motion.div 
          layoutId="whispurr-morph" 
          transition={{ type: "spring", mass: 0.8, stiffness: 280, damping: 24 }}
          id="whispurr-floating-hud" 
          className="bg-[#190f0b]/95 backdrop-blur-2xl border border-[#5d4037]/80 rounded-3xl p-4 md:p-5 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(249,115,22,0.15)] text-[#f4ece1] flex flex-col gap-4 relative overflow-hidden h-[260px]"
        >
          {/* Subtle glowing aura */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#5d4037]/50 pb-3 shrink-0 relative z-10">
            <div className="flex items-center gap-2.5">
              {/* Animated status indicator */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isListening 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                  : isProcessing
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                    : destinationApp
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                      : 'bg-[#5d4037]/30 text-orange-400 border border-[#5d4037]/60'
              }`}>
                {isListening ? (
                  <div className="flex items-center gap-0.5 h-3.5 px-1">
                    <motion.span animate={{ height: [4, 14, 6, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-orange-400 rounded-full" />
                    <motion.span animate={{ height: [10, 4, 14, 8, 10] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.1 }} className="w-0.5 bg-amber-400 rounded-full" />
                    <motion.span animate={{ height: [6, 14, 8, 12, 6] }} transition={{ repeat: Infinity, duration: 0.75, delay: 0.2 }} className="w-0.5 bg-orange-300 rounded-full" />
                    <motion.span animate={{ height: [12, 6, 14, 4, 12] }} transition={{ repeat: Infinity, duration: 0.85, delay: 0.15 }} className="w-0.5 bg-amber-300 rounded-full" />
                  </div>
                ) : isProcessing ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : destinationApp ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight text-[#f4ece1]">
                    {isListening 
                      ? 'WhisPURR Listening...' 
                      : isProcessing 
                        ? `Polishing with ${mode}...` 
                        : destinationApp 
                          ? `Typed into ${destinationApp}` 
                          : 'Speech Refined'}
                  </h3>
                </div>
                <p className="text-[11px] text-[#d7ccc8]/70">
                  {isListening
                    ? 'Speak now · Release option to finish'
                    : isProcessing
                      ? 'Adapting tone and custom rules...'
                      : destinationApp
                        ? `Inserted at cursor in ${destinationApp}`
                        : 'No destination app open · Ready to copy'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode Tag */}
              <span 
                onClick={onTogglePersonaDial}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-300 border border-orange-500/30 cursor-pointer hover:bg-orange-500/30 transition-colors"
                title="Click or use option + Arrow keys to switch personas"
              >
                {mode}
              </span>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#d7ccc8]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Dismiss (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Spoken Text / Output Box */}
          <div className="flex flex-col gap-2.5 relative z-10 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {/* Raw Speech / Listening Preview */}
            {isListening && (
              <div className="bg-[#2b1f1a]/80 border border-orange-500/30 rounded-2xl p-4 min-h-[70px] flex items-center shadow-inner">
                {transcript ? (
                  <p className="text-sm md:text-[15px] font-medium text-[#f4ece1] leading-relaxed italic select-text">
                    "{transcript}"
                  </p>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-[#d7ccc8]/50 italic">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                    <span>Listening to your voice... (speak now · release option to finish)</span>
                  </div>
                )}
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="bg-[#2b1f1a]/80 border border-amber-500/30 rounded-2xl p-4 flex flex-col gap-2 shadow-inner">
                {transcript && (
                  <p className="text-xs text-[#d7ccc8]/60 italic line-clamp-2">
                    Spoke: "{transcript}"
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Applying {mode} formatting & custom rules...</span>
                </div>
              </div>
            )}

            {/* Final Transformed Output */}
            {!isListening && !isProcessing && (
              <div className="flex flex-col gap-2">
                {transcript && transcript !== transformedText && (
                  <div className="text-[11px] text-[#d7ccc8]/50 italic px-1 flex items-center gap-1 truncate">
                    <span>Spoke:</span>
                    <span className="truncate">"{transcript}"</span>
                  </div>
                )}

                <div className="bg-[#2b1f1a]/95 border border-[#5d4037] rounded-2xl p-4 shadow-inner text-[#f4ece1] text-sm md:text-[15px] font-sans leading-relaxed select-text">
                  {transformedText || transcript || (
                    <span className="text-white/40 italic">No speech captured yet.</span>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Actions Bar */}
          {!isListening && !isProcessing && (
            <div className="flex items-center justify-between pt-1 border-t border-[#5d4037]/40 relative z-10 gap-3 shrink-0">
              {destinationApp ? (
                // Case 1: In an app -> Typed directly, offer secondary copy + close
                <>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Typed directly into {destinationApp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5d4037]/30 hover:bg-[#5d4037]/60 border border-[#5d4037]/50 hover:border-orange-400/50 rounded-xl text-xs font-semibold text-[#f4ece1] transition-all active:scale-95 cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-orange-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3 py-1.5 bg-[#8d6e63]/30 hover:bg-[#8d6e63]/50 border border-[#8d6e63]/40 rounded-xl text-xs font-semibold text-[#f4ece1] transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </>
              ) : (
                // Case 2: No active app (Desktop) -> Prominent Copy Button!
                <div className="w-full flex items-center justify-between gap-3">
                  <span className="text-xs text-[#d7ccc8]/70">
                    No app active. Copy output to paste anywhere:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-white" />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick instructions hint while listening */}
          {isListening && (
            <div className="flex items-center justify-between text-[11px] text-[#d7ccc8]/50 pt-1 border-t border-[#5d4037]/30 shrink-0">
              <span>Hold option to dictate</span>
              <span className="flex items-center gap-1 text-orange-400/80">
                <span>Release option to process & type</span>
                <CornerDownLeft className="w-3 h-3" />
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
