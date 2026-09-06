import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Mic, 
  Square, 
  Check, 
  Plus, 
  ChevronRight, 
  Settings2, 
  HelpCircle,
  BarChart2,
  Info
} from 'lucide-react';
import { StyleItem, WeeklyStats, transformLocally } from './StylesData';

interface MainStylesViewProps {
  styles: StyleItem[];
  activeStyleName: string;
  onSelectActiveStyle: (name: string) => void;
  onOpenStyleDetail: (style: StyleItem) => void;
  onOpenCreateModal: () => void;
  onRevisitIntro?: () => void;
  weeklyStats?: WeeklyStats;
  isAdaptiveMode?: boolean;
  onToggleAdaptive?: () => void;
  moodsEnabled: boolean;
  setMoodsEnabled: (val: boolean) => void;
}

export default function MainStylesView({
  styles,
  activeStyleName,
  onSelectActiveStyle,
  onOpenStyleDetail,
  onOpenCreateModal,
  onRevisitIntro,
  weeklyStats,
  isAdaptiveMode = true,
  onToggleAdaptive,
  moodsEnabled,
  setMoodsEnabled
}: MainStylesViewProps) {
  // Playground state for "Try a Style"
  const defaultPhrase = "hey can you check this when you get time and tell me if everything looks okay";
  const [youSayText, setYouSayText] = useState(defaultPhrase);
  const [isListening, setIsListening] = useState(false);
  const [showMoodsInfo, setShowMoodsInfo] = useState(false);
  const [showAdaptInfo, setShowAdaptInfo] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is supported in Chromium browsers like Chrome, Edge, and Arc.");
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        if (text.trim()) setYouSayText(text.trim());
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full relative p-4">
      {/* Title and Description */}
      <div className="max-w-xl mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Context</h1>
        <p className="text-lg text-white/60 font-medium">
          Context decides how your words land. Choose your Tone and Mood for each and every App!
        </p>
      </div>

      {/* Context List */}
      <div className="flex flex-col gap-3 max-w-sm mt-4">
        {["Formal", "Casual", "Developer", "Prompts", "Other apps"].map((item) => (
          <button 
            key={item}
            onClick={() => onSelectActiveStyle(item)}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
              activeStyleName === item 
                ? 'bg-orange-500/10 border-orange-500/40 text-orange-100 shadow-[0_0_15px_rgba(249,115,22,0.15)]' 
                : 'bg-black/20 border-white/5 text-white/60 hover:bg-black/40 hover:text-white/90 hover:border-white/10'
            }`}
          >
            <span className="text-lg font-semibold">{item}</span>
            {activeStyleName === item && <Check className="w-5 h-5 text-orange-400" />}
          </button>
        ))}
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-4 items-end">
        
        {/* Moods Toggle */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4 bg-[#190f0b]/90 border border-[#5d4037]/60 p-2.5 px-4 rounded-2xl shadow-inner w-fit">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d7ccc8]">
              Moods
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={moodsEnabled}
                onClick={() => setMoodsEnabled(!moodsEnabled)}
                className={`relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out p-0.5 items-center focus:outline-none ${
                  moodsEnabled
                    ? 'bg-gradient-to-r from-[#8d6e63] to-[#6d4c41] border-[#a1887f] shadow-[0_0_18px_rgba(141,110,99,0.5)]'
                    : 'bg-[#2b1f1a] border-[#5d4037]/60'
                }`}
                title={moodsEnabled ? "Disable Moods" : "Enable Moods"}
              >
                <span className="sr-only">Toggle Moods</span>
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 600, damping: 35 }}
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-[#f4ece1] shadow-md flex items-center justify-center ${
                    moodsEnabled ? 'ml-auto text-[#3e2723]' : 'mr-auto text-[#8d6e63]'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${moodsEnabled ? 'bg-[#5d4037]' : 'bg-[#8d6e63]/60'}`} />
                </motion.span>
              </button>
              <button 
                onClick={() => setShowMoodsInfo(!showMoodsInfo)}
                className="p-1.5 rounded-full text-[#8d6e63] hover:text-[#d7ccc8] hover:bg-[#5d4037]/40 transition-colors"
                title="Info"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {showMoodsInfo && (
              <motion.span 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] text-white/50 max-w-[280px] text-right font-medium overflow-hidden"
              >
                WhisPURR aptly adds expressive emojis based on your Emotions and Undertones
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        {/* Adapt Toggle */}
        <div className="flex flex-col items-end gap-2 mt-4">
          <div className="flex items-center gap-4 bg-[#190f0b]/90 border border-[#5d4037]/60 p-2.5 px-4 rounded-2xl shadow-inner w-fit">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d7ccc8]">
              Adapt
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={isAdaptiveMode}
                onClick={onToggleAdaptive}
                className={`relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out p-0.5 items-center focus:outline-none ${
                  isAdaptiveMode
                    ? 'bg-gradient-to-r from-[#8d6e63] to-[#6d4c41] border-[#a1887f] shadow-[0_0_18px_rgba(141,110,99,0.5)]'
                    : 'bg-[#2b1f1a] border-[#5d4037]/60'
                }`}
                title={isAdaptiveMode ? "Disable Adaptive Mode" : "Enable Adaptive Mode"}
              >
                <span className="sr-only">Toggle Adaptive Mode</span>
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 600, damping: 35 }}
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-[#f4ece1] shadow-md flex items-center justify-center ${
                    isAdaptiveMode ? 'ml-auto text-[#3e2723]' : 'mr-auto text-[#8d6e63]'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${isAdaptiveMode ? 'bg-[#5d4037]' : 'bg-[#8d6e63]/60'}`} />
                </motion.span>
              </button>
              <button 
                onClick={() => setShowAdaptInfo(!showAdaptInfo)}
                className="p-1.5 rounded-full text-[#8d6e63] hover:text-[#d7ccc8] hover:bg-[#5d4037]/40 transition-colors"
                title="Info"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
          <AnimatePresence>
            {showAdaptInfo && (
              <motion.span 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] text-white/50 max-w-[280px] text-right font-medium overflow-hidden"
              >
                WhisPURR adapts your speech by automatically detecting the app you are currently using
              </motion.span>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
