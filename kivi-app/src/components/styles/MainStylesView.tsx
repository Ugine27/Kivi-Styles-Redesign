import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info,
  Check,
  Plus,
  Palette,
  X,
  Search,
  Sparkles,
  Briefcase,
  Coffee,
  Code2,
  Bot,
  Layers
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

const CONTEXT_ITEMS = [
  { name: "Formal", icon: Briefcase, desc: "Workplace & business" },
  { name: "Casual", icon: Coffee, desc: "Chats & social" },
  { name: "Developer", icon: Code2, desc: "Code, git & bugs" },
  { name: "Prompts", icon: Bot, desc: "AI assistant instructions" },
  { name: "Other apps", icon: Layers, desc: "Everyday general typing" },
];

const CONTEXT_ICONS: Record<string, any> = {
  "Formal": Briefcase,
  "Casual": Coffee,
  "Developer": Code2,
  "Prompts": Bot,
  "Other apps": Layers
};

const CONTEXT_TAGLINES: Record<string, string> = {
  "Formal": "Polished workplace and professional communications.",
  "Casual": "Relaxed, natural conversations and team chats.",
  "Developer": "Precise engineering syntax, code snippets, and bug reports.",
  "Prompts": "Structured constraints and clear AI instructions.",
  "Other apps": "Clean, balanced wording for everyday typing."
};

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
  onToggleAdaptive,
  onRevisitIntro
}: MainStylesViewProps) {
  const [showAdaptInfo, setShowAdaptInfo] = useState(false);
  const adaptInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAdaptInfo) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (adaptInfoRef.current && !adaptInfoRef.current.contains(e.target as Node)) {
        setShowAdaptInfo(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAdaptInfo(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdaptInfo]);

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
  const ActiveIcon = CONTEXT_ICONS[activeStyleName] || Palette;

  return (
    <div className="flex-1 w-full h-full flex flex-col font-sans overflow-hidden gap-4 select-none">
      {/* 1. Page Title + Compact Subtitle & Top Controls */}
      <div className="flex items-center justify-between px-1 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#f4ece1] tracking-tight">
            Context Studio
          </h1>
          <p className="text-xs text-[#d7ccc8]/70 font-normal mt-0.5">
            WhisPURR understands the context and lets you control how you sound.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onRevisitIntro && (
            <button
              type="button"
              onClick={onRevisitIntro}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#5d4037]/40 text-[#d7ccc8] hover:text-[#f4ece1] text-xs font-medium transition-colors cursor-pointer"
              title="Open interactive Meet Styles demo"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400/80" />
              <span>Demo</span>
            </button>
          )}

          {/* Auto-Adapt Toggle Bar */}
          <div className="flex items-center gap-2.5 bg-[#1a110c]/80 border border-[#5d4037]/40 py-1.5 px-3 rounded-xl shrink-0 relative">
            <div className="flex flex-col text-right">
              <span className="text-xs font-medium text-[#f4ece1]">
                Auto-Adapt
              </span>
              <span className="text-[10px] text-[#d7ccc8]/60 font-normal">
                {isAdaptiveMode ? 'App Sensing Active' : 'Manual'}
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isAdaptiveMode}
              onClick={onToggleAdaptive}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border transition-all duration-200 ease-in-out p-0.5 items-center focus:outline-none ${
                isAdaptiveMode
                  ? 'bg-[#8d6e63] border-[#a1887f]'
                  : 'bg-[#2b1f1a] border-[#5d4037]/60'
              }`}
              title={isAdaptiveMode ? "Disable Adaptive Mode" : "Enable Adaptive Mode"}
            >
              <span className="sr-only">Toggle Adaptive Mode</span>
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 600, damping: 35 }}
                className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-[#f4ece1] shadow-sm flex items-center justify-center ${
                  isAdaptiveMode ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${isAdaptiveMode ? 'bg-[#5d4037]' : 'bg-[#8d6e63]/60'}`} />
              </motion.span>
            </button>
            <div ref={adaptInfoRef} className="relative">
              <button 
                type="button"
                onClick={() => setShowAdaptInfo(!showAdaptInfo)}
                className="p-1 rounded-full text-[#8d6e63] hover:text-[#f4ece1] hover:bg-white/[0.05] transition-colors cursor-pointer"
                title="Adaptive Mode Info"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
              <AnimatePresence>
                {showAdaptInfo && (
                  <motion.div 
                    initial={{ opacity: 0, y: -4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    className="absolute top-full mt-2 right-0 w-64 bg-[#231711] border border-[#5d4037]/70 rounded-xl p-3 shadow-2xl z-50 text-xs text-[#f4ece1] leading-relaxed font-normal"
                  >
                    WhisPURR adapts your tone and formatting automatically by sensing which foreground app you are currently typing in.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Work Area */}
      <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
        {/* 2. Left Column: Context Profiles (Clean, secondary, low density) */}
        <div className="w-52 md:w-56 shrink-0 flex flex-col h-full overflow-hidden">
          <div className="text-xs font-semibold text-[#d7ccc8]/70 px-2 mb-2">
            Context Profiles
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto pr-1">
            {CONTEXT_ITEMS.map(({ name, icon: Icon }) => {
              const isActive = activeStyleName === name;
              const apps = contextApps[name] || DEFAULT_CONTEXT_APPS[name] || [];
              return (
                <button 
                  key={name}
                  type="button"
                  onClick={() => onSelectActiveStyle(name)}
                  className={`group relative flex items-center justify-between p-2.5 px-3 rounded-xl border transition-all text-left cursor-pointer ${
                    isActive 
                      ? 'bg-[#3e2723]/50 border-[#8d6e63]/50 text-[#f4ece1] shadow-sm' 
                      : 'bg-transparent border-transparent text-[#d7ccc8]/70 hover:bg-white/[0.04] hover:text-[#f4ece1]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isActive ? 'bg-orange-500/20 text-orange-300' : 'bg-white/[0.04] text-[#d7ccc8]/60 group-hover:text-[#f4ece1]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className={`text-sm font-medium tracking-tight truncate ${isActive ? 'text-[#f4ece1]' : 'text-[#d7ccc8]/85 group-hover:text-[#f4ece1]'}`}>
                        {name}
                      </span>
                      <span className="text-[11px] truncate text-[#d7ccc8]/50">
                        {apps.slice(0, 2).join(', ')}{apps.length > 2 ? ` +${apps.length - 2}` : ''}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-4.5 rounded-full bg-orange-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unified Context Workspace */}
        <div className="flex-1 min-h-0 h-full flex flex-col bg-[#1c120d]/85 border border-[#5d4037]/35 rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-xl overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStyleName}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex flex-col h-full w-full min-h-0 gap-5"
            >
              {/* Context Header & Active Apps */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#5d4037]/25 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-300 rounded-xl border border-orange-500/20 shrink-0">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#f4ece1] tracking-tight leading-tight">
                      {activeStyleName}
                    </h2>
                    <p className="text-xs text-[#d7ccc8]/70 font-normal leading-normal mt-0.5">
                      {CONTEXT_TAGLINES[activeStyleName] || "Tailored tone, examples, and custom instructions."}
                    </p>
                  </div>
                </div>

                {/* Secondary Controls: Active Apps Chips & Add Button */}
                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                  <span className="text-xs text-[#d7ccc8]/50 font-normal mr-1">Active in:</span>
                  {activeApps.slice(0, 3).map(app => (
                    <span 
                      key={app} 
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.04] border border-[#5d4037]/30 rounded-lg text-xs text-[#d7ccc8] font-normal"
                    >
                      <span>{app}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveApp(activeStyleName, app)}
                        className="opacity-40 hover:opacity-100 hover:text-red-400 p-0.5 transition-opacity cursor-pointer"
                        title={`Remove ${app}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {activeApps.length > 3 && (
                    <span className="text-xs text-[#d7ccc8]/50 font-normal px-1">
                      +{activeApps.length - 3}
                    </span>
                  )}
                  <button 
                    type="button"
                    onClick={() => setIsAddAppsOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white/[0.04] hover:bg-white/[0.08] text-[#f4ece1] rounded-lg font-medium transition-colors border border-[#5d4037]/40 hover:border-[#8d6e63] cursor-pointer text-xs shrink-0 ml-1"
                    title={`Add apps to ${activeStyleName}`}
                  >
                    <Plus className="w-3 h-3 text-orange-400/80" />
                    <span>Apps</span>
                  </button>
                </div>
              </div>

              {/* Context Options Body: Output Cards & Custom Rules */}
              <ContextOptionsRenderer 
                activeStyleName={activeStyleName} 
              />
            </motion.div>
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
}

function ContextOptionsRenderer({ 
  activeStyleName 
}: ContextOptionsRendererProps) {
  const contextModes: Record<string, {n: string, d: string, ex: string}[]> = {
    "Formal": [
      { n: 'Clear', d: 'Clean sentences with natural professional cadence.', ex: 'Please take a look at this.' },
      { n: 'Casual', d: 'Conversational workplace shorthand.', ex: 'Can you check this out?' },
      { n: 'Formal', d: 'Fully composed, executive-ready phrasing.', ex: 'I kindly request that you review this material.' }
    ],
    "Casual": [
      { n: 'Natural', d: 'Light cleanup, preserving your spoken voice.', ex: 'I am going to be a bit late.' },
      { n: 'Very Casual', d: 'Lowercase, relaxed shorthand, zero fuss.', ex: 'running late' },
      { n: 'Polished', d: 'Full punctuation and natural conversational grammar.', ex: 'I will be arriving slightly later than expected.' }
    ],
    "Developer": [
      { n: 'Clear', d: 'Plain instruction with exact technical intent.', ex: 'Fix the bug in the authentication module.' },
      { n: 'Concise', d: 'Brief summary stripped of conversational filler.', ex: 'Fix auth module bug.' },
      { n: 'Structured', d: 'Standard ticket format with goal and impact.', ex: 'Task: Resolve auth bug.\nImpact: Critical.' }
    ],
    "Prompts": [
      { n: 'Direct', d: 'Direct instruction with immediate task parameters.', ex: 'Write a Python script for CSV parsing.' },
      { n: 'Detailed', d: 'Exhaustive parameters, edge cases, and type hints.', ex: 'Write a robust Python script using type hints and error handling.' },
      { n: 'Role-Based', d: 'Clear system persona and structured reasoning.', ex: 'Act as a Principal Engineer and review this architecture.' }
    ],
    "Other apps": [
      { n: 'Balanced', d: 'Cleaned grammar with your personal tone preserved.', ex: 'Yeah, that sounds good to me.' },
      { n: 'Minimal', d: 'Compressed down to key words and fragments.', ex: 'Sounds good.' },
      { n: 'Polished', d: 'Composed, complete sentences ready to publish.', ex: 'That sounds perfectly fine with me.' }
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
      updated = trimmed
        .replace(new RegExp(`(^|\\.\\s*)${chip}(\\.\\s*|$)`, 'gi'), '')
        .trim();
    } else {
      updated = trimmed ? `${trimmed}${trimmed.endsWith('.') ? '' : '.'} ${chip}.` : `${chip}.`;
    }
    handleRuleChange(updated);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 select-text gap-6">
      {/* 3. Output Examples — Visual Focus */}
      <div className="flex flex-col gap-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#d7ccc8]/80 tracking-wide">
            Tone & Output Examples
          </span>
          <span className="text-xs text-[#d7ccc8]/50 font-normal">
            Select how unscripted speech is shaped
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full">
          {currentModes.map((opt, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div 
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`relative rounded-2xl border p-4 cursor-pointer transition-all flex flex-col justify-between min-h-[155px] ${
                  isSelected
                    ? 'border-[#a1887f] bg-[#2e1d16]/80 text-[#f4ece1] shadow-md ring-1 ring-[#a1887f]/40' 
                    : 'border-[#5d4037]/25 bg-[#20140e]/40 text-[#d7ccc8]/75 hover:border-[#5d4037]/60 hover:bg-[#251711]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-[#f4ece1]' : 'text-[#d7ccc8]'}`}>
                      {opt.n}
                    </h3>
                    <p className="text-xs text-[#d7ccc8]/65 font-normal leading-normal mt-0.5">
                      {opt.d}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSelected ? 'border-orange-400 bg-orange-500/20 text-orange-300' : 'border-[#5d4037]/60 text-transparent'
                  }`}>
                    <Check size={10} strokeWidth={3} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                  </div>
                </div>

                <div className={`rounded-xl p-3.5 flex items-center border transition-colors ${
                  isSelected ? 'bg-[#150d09]/70 border-[#5d4037]/40 text-[#f4ece1]' : 'bg-[#150d09]/40 border-[#5d4037]/20 text-[#d7ccc8]/85'
                }`}>
                  <p className="text-sm font-normal leading-relaxed whitespace-pre-wrap">
                    "{opt.ex}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Custom Rules Section */}
      <div className="flex flex-col gap-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#d7ccc8]/80 tracking-wide">
              Custom Instructions
            </span>
            <p className="text-xs text-[#d7ccc8]/60 font-normal mt-0.5">
              Rules automatically applied whenever {activeStyleName} is active.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25">
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
            {currentRule.trim() && (
              <button
                type="button"
                onClick={() => handleRuleChange('')}
                className="text-xs text-[#d7ccc8]/50 hover:text-red-400 hover:bg-white/[0.04] transition-colors px-2 py-0.5 rounded cursor-pointer"
                title="Clear rules for this context"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={currentRule}
          onChange={(e) => handleRuleChange(e.target.value)}
          placeholder={CONTEXT_PLACEHOLDERS[activeStyleName] || "Enter custom rules for this context..."}
          rows={2}
          className="w-full bg-[#150d09]/70 border border-[#5d4037]/40 focus:border-[#a1887f] rounded-xl p-3 text-sm text-[#f4ece1] placeholder:text-[#d7ccc8]/30 resize-none outline-none font-sans leading-relaxed transition-all shadow-inner"
        />

        {/* Quick Rule Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-xs text-[#d7ccc8]/50 font-normal mr-1">
            Suggestions:
          </span>
          {(CONTEXT_SUGGESTIONS[activeStyleName] || CONTEXT_SUGGESTIONS["Other apps"]).map(chip => {
            const isChipActive = currentRule.toLowerCase().includes(chip.toLowerCase());
            return (
              <button
                key={chip}
                type="button"
                onClick={() => handleAddChip(chip)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-normal ${
                  isChipActive
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-200'
                    : 'bg-[#150d09]/60 hover:bg-white/[0.05] border-[#5d4037]/35 text-[#d7ccc8]/75 hover:text-[#f4ece1]'
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
        className="bg-[#1c120d] border border-[#5d4037]/60 rounded-3xl p-6 md:p-7 max-w-lg w-full shadow-2xl flex flex-col gap-5 text-[#f4ece1] relative max-h-[85vh] overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#5d4037]/30 pb-3.5 shrink-0">
          <div>
            <h3 className="text-xl font-semibold text-[#f4ece1] flex items-center gap-2">
              <span>Add Apps to</span>
              <span className="text-orange-400 font-semibold">{contextName}</span>
            </h3>
            <p className="text-xs text-[#d7ccc8]/70 font-normal mt-1">
              Select or type apps that will automatically trigger the {contextName} context.
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#d7ccc8]/60 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
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
              className="w-full bg-[#150d09] border border-[#5d4037]/50 rounded-xl pl-10 pr-4 py-2 text-sm text-[#f4ece1] placeholder:text-[#d7ccc8]/40 focus:border-[#a1887f] focus:outline-none transition-all"
              autoFocus
            />
          </div>
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-[#8d6e63] hover:bg-[#795548] disabled:opacity-40 disabled:cursor-not-allowed text-[#f4ece1] font-medium text-sm rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>

        {/* Content Body: Scrollable */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 min-h-0 custom-scrollbar">
          {/* Currently Assigned */}
          <div>
            <div className="text-xs font-semibold text-[#d7ccc8]/70 mb-2 flex items-center justify-between">
              <span>Currently Assigned ({currentApps.length})</span>
            </div>
            {currentApps.length === 0 ? (
              <p className="text-xs text-[#d7ccc8]/50 italic bg-white/[0.03] p-3 rounded-xl">No apps assigned yet. Add some below.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {currentApps.map(app => (
                  <span 
                    key={app} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.04] border border-[#5d4037]/40 rounded-lg text-xs font-medium text-[#f4ece1]"
                  >
                    <span>{app}</span>
                    <button 
                      type="button"
                      onClick={() => onRemoveApp(app)}
                      className="text-[#d7ccc8]/60 hover:text-red-400 transition-colors p-0.5 cursor-pointer"
                      title={`Remove ${app}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Suggestions */}
          <div>
            <div className="text-xs font-semibold text-[#d7ccc8]/70 mb-2">
              <span>Popular & Suggested Apps</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filteredSuggested.map(app => (
                <button
                  key={app}
                  type="button"
                  onClick={() => onAddApp(app)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-[#5d4037]/30 hover:border-[#8d6e63] rounded-lg text-xs text-[#d7ccc8] hover:text-[#f4ece1] font-normal transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-orange-400/80" />
                  <span>{app}</span>
                </button>
              ))}
              {filteredSuggested.length === 0 && (
                <p className="text-xs text-[#d7ccc8]/50 italic">
                  {inputValue.trim() ? `Press Enter or click Add to add "${inputValue.trim()}".` : 'All suggested apps are currently added.'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#5d4037]/30 pt-3.5 flex justify-end shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#8d6e63] hover:bg-[#795548] text-[#f4ece1] font-medium text-sm rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
