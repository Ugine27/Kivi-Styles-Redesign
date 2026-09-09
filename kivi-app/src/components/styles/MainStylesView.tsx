import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings2, 
  Info,
  ChevronRight,
  Check,
  Plus,
  Palette,
  X,
  Search,
  Zap,
  SlidersHorizontal
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

const DEFAULT_CONTEXT_APPS: Record<string, string[]> = {
  "Formal": ["Teams", "Outlook", "LinkedIn"],
  "Casual": ["Slack", "Discord", "WhatsApp"],
  "Developer": ["VS Code", "Terminal", "GitHub"],
  "Prompts": ["ChatGPT", "Claude", "Midjourney"],
  "Other apps": ["Chrome", "Notion", "Obsidian"]
};

export default function MainStylesView({
  activeStyleName,
  onSelectActiveStyle,
  isAdaptiveMode = true,
  onToggleAdaptive
}: MainStylesViewProps) {
  const [showAdaptInfo, setShowAdaptInfo] = useState(false);
  const [isAddAppsOpen, setIsAddAppsOpen] = useState(false);
  const [contextApps, setContextApps] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('whispurr_context_apps');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CONTEXT_APPS;
  });

  const handleAddApp = (contextName: string, appName: string) => {
    const trimmed = appName.trim();
    if (!trimmed) return;
    setContextApps(prev => {
      const current = prev[contextName] || DEFAULT_CONTEXT_APPS[contextName] || [];
      if (current.some(a => a.toLowerCase() === trimmed.toLowerCase())) {
        return prev;
      }
      const updated = {
        ...prev,
        [contextName]: [...current, trimmed]
      };
      try {
        localStorage.setItem('whispurr_context_apps', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleRemoveApp = (contextName: string, appName: string) => {
    setContextApps(prev => {
      const current = prev[contextName] || DEFAULT_CONTEXT_APPS[contextName] || [];
      const updated = {
        ...prev,
        [contextName]: current.filter(a => a.toLowerCase() !== appName.toLowerCase())
      };
      try {
        localStorage.setItem('whispurr_context_apps', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const activeApps = contextApps[activeStyleName] || DEFAULT_CONTEXT_APPS[activeStyleName] || [];

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
            className="absolute bottom-4 right-4 top-[140px] left-[420px] bg-[#190f0b]/90 border border-[#5d4037]/60 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
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
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-[#5d4037]/20 rounded-xl">
                      <Settings2 className="w-6 h-6 text-[#d7ccc8]" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#f4ece1] tracking-tight">{activeStyleName}</h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsAddAppsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5d4037]/20 hover:bg-[#5d4037]/40 active:scale-95 text-[#f4ece1] rounded-xl font-medium transition-all border border-[#5d4037]/30 hover:border-[#8d6e63] cursor-pointer"
                    title={`Add apps to ${activeStyleName}`}
                  >
                    <Plus className="w-4 h-4 text-orange-400" />
                    <span>Add Apps</span>
                  </button>
                </div>
                
                <div className="flex-1 bg-[#2b1f1a]/50 rounded-2xl border border-[#5d4037]/30 p-4 lg:p-5 overflow-hidden min-h-0 flex flex-col">
                  <ContextOptionsRenderer 
                    activeStyleName={activeStyleName} 
                    apps={activeApps}
                    onRemoveApp={(app) => handleRemoveApp(activeStyleName, app)}
                    onOpenAddApps={() => setIsAddAppsOpen(true)}
                  />
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

      {/* Add Apps Modal */}
      <AddAppsModal 
        isOpen={isAddAppsOpen}
        onClose={() => setIsAddAppsOpen(false)}
        contextName={activeStyleName}
        currentApps={activeApps}
        onAddApp={(app) => handleAddApp(activeStyleName, app)}
        onRemoveApp={(app) => handleRemoveApp(activeStyleName, app)}
      />
    </div>
  );
}

const DEFAULT_CONTEXT_RULES: Record<string, string> = {
  "Formal": "Keep messages under 2 sentences. Avoid emojis. Keep the tone confident, polite, and work-ready.",
  "Casual": "Keep wording natural and conversational. Feel free to use relaxed phrasing and friendly expressions.",
  "Developer": "Format code snippets in markdown blocks. Keep explanations concise, direct, and structured with bullet points.",
  "Prompts": "Specify clear system instructions. Request output strictly in markdown or JSON without chatty filler.",
  "Other apps": "Clean grammar, natural conversational flow without filler words."
};

const CONTEXT_SUGGESTIONS: Record<string, string[]> = {
  "Formal": ["Under 2 sentences", "No emojis", "Workplace polished", "Sign off 'Best regards'"],
  "Casual": ["Natural & conversational", "Light emojis allowed", "Lowercase styling", "Relaxed phrasing"],
  "Developer": ["Markdown code blocks", "Concise bullet points", "No syntax fluff", "Include type hints"],
  "Prompts": ["Output as JSON", "Step-by-step reasoning", "Strict constraints", "Act as Senior Engineer"],
  "Other apps": ["Cut filler words", "Clean grammar", "Straight to the point", "Preserve intent"]
};

const CONTEXT_PLACEHOLDERS: Record<string, string> = {
  "Formal": "E.g. \"Always start with 'Dear Team'\", \"Never use emojis\", \"Keep under 2 sentences\"...",
  "Casual": "E.g. \"Keep it chill\", \"Use friendly emojis\", \"Allow conversational slang\"...",
  "Developer": "E.g. \"Format code snippets in markdown\", \"Use bullet points for changes\", \"Keep concise\"...",
  "Prompts": "E.g. \"Output strictly in valid JSON\", \"Think step-by-step\", \"No conversational filler\"...",
  "Other apps": "E.g. \"Cut filler words like 'um' and 'like'\", \"Clean punctuation\"..."
};

interface ContextOptionsRendererProps {
  activeStyleName: string;
  apps: string[];
  onRemoveApp: (app: string) => void;
  onOpenAddApps: () => void;
}

function ContextOptionsRenderer({ 
  activeStyleName, 
  apps,
  onRemoveApp,
  onOpenAddApps 
}: ContextOptionsRendererProps) {
  const contextModes: Record<string, {n: string, d: string, ex: string}[]> = {
    "Formal": [
      { n: 'clear', d: 'clean sentences, shorthand kept.', ex: 'Please take a look at this.' },
      { n: 'casual', d: 'lowercase workplace shorthand.', ex: 'can you check this out' },
      { n: 'formal', d: 'everything spelled out, properly.', ex: 'I kindly request that you review this material.' }
    ],
    "Casual": [
      { n: 'natural', d: 'light cleanup, your voice kept.', ex: 'I am going to be a bit late.' },
      { n: 'very casual', d: 'lowercase, shorthand, zero fuss.', ex: 'running late' },
      { n: 'polished', d: 'full punctuation and grammar.', ex: 'I will be arriving later than expected.' }
    ],
    "Developer": [
      { n: 'clear', d: 'the full instruction, plainly.', ex: 'Fix the bug in the login module.' },
      { n: 'concise', d: 'the fewest words that still say it.', ex: 'Fix login bug.' },
      { n: 'structured', d: 'goal, changes, validation.', ex: 'Task: Resolve login bug.\nImpact: Critical.' }
    ],
    "Prompts": [
      { n: 'direct', d: 'straight to the instruction.', ex: 'Write a Python script.' },
      { n: 'detailed', d: 'all constraints mapped out.', ex: 'Write a robust Python script using type hints.' },
      { n: 'creative', d: 'open-ended and descriptive.', ex: 'Act as an expert engineer and create...' }
    ],
    "Other apps": [
      { n: 'balanced', d: 'cleaned, but still yours.', ex: 'Yeah, that sounds good to me.' },
      { n: 'minimal', d: 'compressed to fragments.', ex: 'Sounds good.' },
      { n: 'polished', d: 'composed, complete sentences.', ex: 'That sounds perfectly fine with me.' }
    ]
  };

  const currentModes = contextModes[activeStyleName] || contextModes["Other apps"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [customRules, setCustomRules] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('whispurr_context_custom_rules');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_CONTEXT_RULES;
  });
  const [isSaved, setIsSaved] = useState(false);

  const currentRule = customRules[activeStyleName] ?? (DEFAULT_CONTEXT_RULES[activeStyleName] || '');

  const handleRuleChange = (text: string) => {
    setCustomRules(prev => {
      const updated = {
        ...prev,
        [activeStyleName]: text
      };
      try {
        localStorage.setItem('whispurr_context_custom_rules', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  const handleAddChip = (chip: string) => {
    const trimmed = currentRule.trim();
    let updated = '';
    if (trimmed.toLowerCase().includes(chip.toLowerCase())) {
      // Remove chip if already present
      updated = trimmed
        .replace(new RegExp(`(^|\\.\\s*)${chip}(\\.\\s*|$)`, 'gi'), '')
        .trim();
    } else {
      // Append chip cleanly
      updated = trimmed ? `${trimmed}${trimmed.endsWith('.') ? '' : '.'} ${chip}.` : `${chip}.`;
    }
    handleRuleChange(updated);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-0 overflow-y-auto pr-1 select-text">
      {/* Active Apps Row */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <span className="text-[#d7ccc8]/50 text-xs font-bold uppercase tracking-widest">Active In:</span>
        <div className="flex gap-2 flex-wrap items-center">
          {apps.map(app => (
            <span 
              key={app} 
              className="group inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4ece1]/5 hover:bg-[#f4ece1]/10 border border-white/10 hover:border-[#8d6e63]/60 rounded-lg text-xs text-[#d7ccc8] hover:text-[#f4ece1] font-medium shadow-sm transition-all"
            >
              <span>{app}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveApp(app);
                }}
                className="opacity-40 group-hover:opacity-100 hover:text-red-400 p-0.5 rounded transition-all cursor-pointer"
                title={`Remove ${app}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onOpenAddApps}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#8d6e63]/20 hover:bg-[#8d6e63]/40 border border-[#8d6e63]/40 hover:border-[#8d6e63] text-xs text-[#f4ece1] rounded-lg transition-colors cursor-pointer"
            title="Add more apps to this context"
          >
            <Plus className="w-3 h-3 text-orange-400" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Preset Cards with Larger Examples */}
      <div className="flex gap-3.5 w-full shrink-0 min-h-[140px]">
        {currentModes.map((opt, i) => (
          <div 
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative flex-1 rounded-2xl border-2 p-3.5 cursor-pointer transition-all flex flex-col justify-end min-h-0 ${
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
              <p className={`text-[13px] md:text-[14px] font-sans leading-snug italic whitespace-pre-wrap line-clamp-3 ${selectedIndex === i ? 'text-white font-medium' : 'text-[#f4ece1]/90'}`}>
                "{opt.ex}"
              </p>
            </div>
            <h3 className="text-sm md:text-base font-bold mb-0.5 font-sans text-[#f4ece1] tracking-tight shrink-0 truncate">{opt.n}</h3>
            <p className="text-[11px] opacity-80 font-serif italic leading-tight shrink-0 line-clamp-1">{opt.d}</p>
          </div>
        ))}
      </div>

      {/* Spacing & Section Label Pushing Custom Box Down */}
      <div className="flex items-center gap-3 mt-4 shrink-0 px-0.5">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#5d4037]/40 to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#d7ccc8]/50 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3 h-3 text-orange-400/80" />
          <span>Custom Instructions</span>
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#5d4037]/40 to-transparent" />
      </div>

      {/* Custom Rules Box */}
      <div className="bg-[#190f0b]/90 border border-[#5d4037]/50 rounded-2xl p-4 md:p-5 flex flex-col gap-3 shrink-0 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-orange-500/15 text-orange-400 rounded-xl border border-orange-500/25 shadow-sm">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-[#f4ece1] uppercase tracking-wider">
                  Custom Rules for {activeStyleName}
                </h4>
                {isSaved && (
                  <span className="text-[10px] text-emerald-400 font-medium normal-case flex items-center gap-1 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
                    <Check className="w-3 h-3" /> Saved
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#d7ccc8]/60 mt-0.5">
                Instruct WhisPURR to consistently apply specific formatting rules whenever {activeStyleName} is active.
              </p>
            </div>
          </div>
          {currentRule.trim() && (
            <button
              type="button"
              onClick={() => handleRuleChange('')}
              className="text-[11px] text-[#d7ccc8]/50 hover:text-red-400 hover:bg-white/5 transition-colors px-2 py-1 rounded-md cursor-pointer"
              title="Clear rules for this context"
            >
              Clear
            </button>
          )}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={currentRule}
            onChange={(e) => handleRuleChange(e.target.value)}
            placeholder={CONTEXT_PLACEHOLDERS[activeStyleName] || "Enter custom rules for this context..."}
            rows={2}
            className="w-full bg-[#2b1f1a] border border-[#5d4037]/60 focus:border-orange-400/80 rounded-xl p-3 text-xs md:text-sm text-[#f4ece1] placeholder:text-[#d7ccc8]/35 resize-none outline-none font-sans leading-relaxed transition-all shadow-inner"
          />
        </div>

        {/* Quick Rule Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-[#d7ccc8]/40 tracking-wider mr-1">
            Suggestions:
          </span>
          {(CONTEXT_SUGGESTIONS[activeStyleName] || CONTEXT_SUGGESTIONS["Other apps"]).map(chip => {
            const isChipActive = currentRule.toLowerCase().includes(chip.toLowerCase());
            return (
              <button
                key={chip}
                type="button"
                onClick={() => handleAddChip(chip)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                  isChipActive
                    ? 'bg-orange-500/25 border-orange-400/60 text-orange-200 shadow-sm'
                    : 'bg-[#2b1f1a]/80 hover:bg-[#5d4037]/40 border-[#5d4037]/50 text-[#d7ccc8]/70 hover:text-[#f4ece1]'
                }`}
                title={isChipActive ? "Click to remove" : "Click to add rule"}
              >
                {isChipActive ? '✓ ' : '+ '}{chip}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface AddAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextName: string;
  currentApps: string[];
  onAddApp: (appName: string) => void;
  onRemoveApp: (appName: string) => void;
}

function AddAppsModal({
  isOpen,
  onClose,
  contextName,
  currentApps,
  onAddApp,
  onRemoveApp
}: AddAppsModalProps) {
  const [inputValue, setInputValue] = useState('');

  const suggestedApps = [
    "Slack", "Discord", "Teams", "Outlook", "Apple Mail", "Gmail",
    "VS Code", "Terminal", "iTerm2", "Cursor", "GitHub", "Xcode",
    "Notion", "Obsidian", "Figma", "Linear", "Jira", "Trello",
    "Chrome", "Safari", "Arc", "Firefox", "Brave",
    "ChatGPT", "Claude", "Perplexity", "Midjourney",
    "WhatsApp", "Telegram", "Zoom", "Google Meet", "Word", "Excel"
  ];

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddApp(inputValue.trim());
      setInputValue('');
    }
  };

  const filteredSuggested = suggestedApps.filter(app => 
    !currentApps.some(c => c.toLowerCase() === app.toLowerCase()) &&
    (!inputValue.trim() || app.toLowerCase().includes(inputValue.toLowerCase()))
  );

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="bg-[#190f0b] border border-[#5d4037] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6 text-[#f4ece1] relative max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#5d4037]/40 pb-4 shrink-0">
          <div>
            <h3 className="text-2xl font-bold text-[#f4ece1] flex items-center gap-2.5">
              <span>Add Apps to</span>
              <span className="text-orange-400 font-extrabold">{contextName}</span>
            </h3>
            <p className="text-xs text-[#d7ccc8]/70 mt-1">
              Select or type apps that should automatically trigger the {contextName} context.
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-[#d7ccc8]/60 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleFormSubmit} className="flex gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#d7ccc8]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search or enter app name (e.g. Safari, Figma, Cursor)..."
              className="w-full bg-[#2b1f1a] border border-[#5d4037]/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f4ece1] placeholder:text-[#d7ccc8]/40 focus:border-orange-400 focus:outline-none transition-all"
              autoFocus
            />
          </div>
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2.5 bg-[#8d6e63] hover:bg-[#795548] disabled:opacity-40 disabled:cursor-not-allowed text-[#f4ece1] font-semibold text-sm rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>

        {/* Content Body: Scrollable */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5 min-h-0">
          {/* Currently Assigned */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#d7ccc8]/60 mb-2.5 flex items-center justify-between">
              <span>Currently Assigned ({currentApps.length})</span>
            </div>
            {currentApps.length === 0 ? (
              <p className="text-xs text-white/40 italic bg-white/5 p-3 rounded-xl">No apps assigned yet. Add some below!</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {currentApps.map(app => (
                  <span 
                    key={app}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5d4037]/30 border border-[#5d4037]/60 rounded-xl text-xs font-semibold text-[#f4ece1]"
                  >
                    <span>{app}</span>
                    <button 
                      type="button"
                      onClick={() => onRemoveApp(app)}
                      className="text-white/40 hover:text-red-400 transition-colors p-0.5 cursor-pointer"
                      title={`Remove ${app}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Suggestions */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#d7ccc8]/60 mb-2.5">
              <span>Popular & Suggested Apps</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredSuggested.map(app => (
                <button
                  key={app}
                  type="button"
                  onClick={() => onAddApp(app)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2b1f1a]/80 hover:bg-[#5d4037]/40 border border-[#5d4037]/30 hover:border-orange-400/50 rounded-xl text-xs text-[#d7ccc8] hover:text-[#f4ece1] font-medium transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-orange-400/70" />
                  <span>{app}</span>
                </button>
              ))}
              {filteredSuggested.length === 0 && (
                <p className="text-xs text-white/40 italic">
                  {inputValue.trim() ? `Press Enter or click Add to add "${inputValue.trim()}".` : 'All suggested apps are currently added.'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#5d4037]/40 pt-4 flex justify-end shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#8d6e63] hover:bg-[#795548] text-[#f4ece1] font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
