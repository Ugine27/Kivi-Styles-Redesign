import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings2, 
  Info,
  ChevronRight,
  Check,
  Plus,
  Palette
} from 'lucide-react';
import { StyleItem, WeeklyStats } from './StylesData';

interface MainStylesViewProps {
  styles?: StyleItem[];
  activeStyleName: string;
  onSelectActiveStyle: (name: string) => void;
  onOpenStyleDetail?: (style: StyleItem) => void;
  onOpenCreateModal?: () => void;
  onRevisitIntro?: () => void;
  weeklyStats?: WeeklyStats;
  isAdaptiveMode?: boolean;
  onToggleAdaptive?: () => void;
}

export default function MainStylesView({
  activeStyleName,
  onSelectActiveStyle,
  isAdaptiveMode = true,
  onToggleAdaptive
}: MainStylesViewProps) {
  const [showAdaptInfo, setShowAdaptInfo] = useState(false);

  return (
    <div className="flex-1 w-full h-full relative p-4">
      {/* Title and Description */}
      <div className="px-2 shrink-0 mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Palette className="text-orange-400 w-8 h-8" />
          Context
        </h1>
        <p className="text-white/50 text-sm">
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
            {activeStyleName === item && <ChevronRight className="w-5 h-5 text-orange-400" />}
          </button>
        ))}
      </div>

      {/* Selected Context Dialogue Window */}
      <AnimatePresence>
        {activeStyleName && ["Formal", "Casual", "Developer", "Prompts", "Other apps"].includes(activeStyleName) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-4 right-4 top-[180px] left-[420px] bg-[#190f0b]/90 border border-[#5d4037]/60 rounded-3xl p-8 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStyleName}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col h-full w-full min-h-0"
              >
                <div className="flex items-center justify-between mb-6 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#5d4037]/20 rounded-xl">
                      <Settings2 className="w-6 h-6 text-[#d7ccc8]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#f4ece1] tracking-tight">{activeStyleName}</h2>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#5d4037]/20 hover:bg-[#5d4037]/40 text-[#f4ece1] rounded-xl font-medium transition-colors border border-[#5d4037]/30">
                    <Plus className="w-4 h-4" />
                    <span>Add Apps</span>
                  </button>
                </div>
                
                <div className="flex-1 bg-[#2b1f1a]/50 rounded-2xl border border-[#5d4037]/30 p-4 lg:p-6 overflow-hidden min-h-0">
                  <ContextOptionsRenderer activeStyleName={activeStyleName} />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 right-4 flex flex-col gap-4 items-end">
        
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

function ContextOptionsRenderer({ activeStyleName }: { activeStyleName: string }) {
  const contextOptions: Record<string, {apps: string[], modes: {n: string, d: string, ex: string}[]}> = {
    "Formal": {
      apps: ["Teams", "Outlook", "LinkedIn"],
      modes: [
        { n: 'clear', d: 'clean sentences, shorthand kept.', ex: 'Please take a look at this.' },
        { n: 'casual', d: 'lowercase workplace shorthand.', ex: 'can you check this out' },
        { n: 'formal', d: 'everything spelled out, properly.', ex: 'I kindly request that you review this material.' }
      ]
    },
    "Casual": {
      apps: ["Slack", "Discord", "WhatsApp"],
      modes: [
        { n: 'natural', d: 'light cleanup, your voice kept.', ex: 'I am going to be a bit late.' },
        { n: 'very casual', d: 'lowercase, shorthand, zero fuss.', ex: 'running late' },
        { n: 'polished', d: 'full punctuation and grammar.', ex: 'I will be arriving later than expected.' }
      ]
    },
    "Developer": {
      apps: ["VS Code", "Terminal", "GitHub"],
      modes: [
        { n: 'clear', d: 'the full instruction, plainly.', ex: 'Fix the bug in the login module.' },
        { n: 'concise', d: 'the fewest words that still say it.', ex: 'Fix login bug.' },
        { n: 'structured', d: 'goal, changes, validation.', ex: 'Task: Resolve login bug.\nImpact: Critical.' }
      ]
    },
    "Prompts": {
      apps: ["ChatGPT", "Claude", "Midjourney"],
      modes: [
        { n: 'direct', d: 'straight to the instruction.', ex: 'Write a Python script.' },
        { n: 'detailed', d: 'all constraints mapped out.', ex: 'Write a robust Python script using type hints.' },
        { n: 'creative', d: 'open-ended and descriptive.', ex: 'Act as an expert engineer and create...' }
      ]
    },
    "Other apps": {
      apps: ["Chrome", "Notion", "Obsidian"],
      modes: [
        { n: 'balanced', d: 'cleaned, but still yours.', ex: 'Yeah, that sounds good to me.' },
        { n: 'minimal', d: 'compressed to fragments.', ex: 'Sounds good.' },
        { n: 'polished', d: 'composed, complete sentences.', ex: 'That sounds perfectly fine with me.' }
      ]
    }
  };

  const currentOption = contextOptions[activeStyleName] || contextOptions["Other apps"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-0">
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[#d7ccc8]/50 text-xs font-bold uppercase tracking-widest">Active In:</span>
        <div className="flex gap-2">
          {currentOption.apps.map(app => (
            <span key={app} className="px-3 py-1 bg-[#f4ece1]/5 border border-white/5 rounded-lg text-xs text-[#d7ccc8] font-medium shadow-sm">
              {app}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-4 w-full flex-1 min-h-0">
        {currentOption.modes.map((opt, i) => (
          <div 
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative flex-1 rounded-2xl border-2 p-3 cursor-pointer transition-all flex flex-col justify-end min-h-0 ${
              selectedIndex === i
                ? 'border-[#8d6e63] bg-[#8d6e63]/20 text-[#f4ece1] shadow-lg' 
                : 'border-[#5d4037]/30 bg-[#190f0b]/50 text-[#d7ccc8]/70 hover:border-[#5d4037]/80 hover:bg-[#2b1f1a]'
            }`}
          >
            {selectedIndex === i && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#8d6e63] rounded-full flex items-center justify-center text-[#f4ece1] shadow-md z-10 shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
            <div className={`flex-1 rounded-xl mb-3 p-3 flex flex-col justify-center border min-h-0 overflow-hidden ${selectedIndex === i ? 'bg-[#f4ece1]/20 border-[#f4ece1]/30' : 'bg-[#f4ece1]/10 border-[#f4ece1]/10'}`}>
              <p className={`text-xs md:text-[13px] font-sans leading-tight italic whitespace-pre-wrap line-clamp-3 ${selectedIndex === i ? 'text-white font-medium' : 'text-[#f4ece1]/90'}`}>
                "{opt.ex}"
              </p>
            </div>
            <h3 className="text-sm md:text-base font-bold mb-1 font-sans text-[#f4ece1] tracking-tight shrink-0 truncate">{opt.n}</h3>
            <p className="text-[10px] md:text-[11px] opacity-80 font-serif italic leading-tight shrink-0 line-clamp-2">{opt.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
