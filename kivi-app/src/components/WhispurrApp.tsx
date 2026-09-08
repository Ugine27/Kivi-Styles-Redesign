import { useState, useEffect, useRef } from 'react';
import { PanelLeftClose, Keyboard, PanelLeft, Home, BookOpen, Zap, Palette, Clock, FileText, X, Mic, Pencil, User, Settings, Shield, LayoutTemplate, CreditCard, PlayCircle, Square, Trash2, Sparkles, Copy, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tutorial from './Tutorial';
import StylesManager from './styles/StylesManager';
import FootprintManager from './FootprintManager';
import KiviCatIcon from './KiviCatIcon';
import { transformText } from '../transformEngine';

const CAT_FACTS = [
  "Cats lack a rigid collarbone, meaning that if their head can squeeze through a gap, their whole body is probably going along for the ride!",
  "They have 32 muscles in *each* ear (compared to our measly six) and can independently swivel them 180 degrees to pinpoint exactly which room you just opened the treat bag in.",
  "Don't let their lazy demeanor fool you—a healthy cat can leap up to six times their own height in a single, effortless bound.",
  "A cat’s purr rumbles at a frequency between 25 and 150 Hertz, which veterinary studies show can actually help heal bones, repair tissues, and reduce swelling. They are literally vibrating little medics!",
  "Just like human fingerprints, no two cat nose prints are exactly alike. Every kitty is walking around with a completely unique, boopable ID card on their face.",
  "Adult cats rarely ever meow at each other. They use body language and scent for kitty-to-kitty chats, and developed the \"meow\" almost entirely to communicate with (and successfully manipulate) us humans!",
  "They spend roughly 70% of their lives snoozing, which means a 9-year-old cat has been awake for barely three years of its life.",
  "Because of a genetic mutation that wiped out their sweet receptors, cats physically cannot taste sugar. If they try to steal a lick of your ice cream, they are just in it for the delicious fat and texture!",
  "Over short distances, a domestic house cat can hit speeds of up to 30 mph, which is actually slightly faster than Olympic sprinter Usain Bolt.",
  "Just like we are left- or right-handed, cats tend to have a preferred paw. Behavioral studies suggest that male cats often favor their left paw, while female cats tend to favor their right."
];
let hasShownTutorialThisSession = false;

const TOUR_STEPS = [
    { id: 'Home', title: 'The Home Base', text: 'Watch WhisPURR in action! See your speech turn into text live and access your quick controls.' },
    { id: 'History', title: 'Chat Registers', text: 'Look back at everything you\'ve said. You can easily copy or reuse your past words here.' },
    { id: 'Dictionary', title: 'Your Custom Dictionary', text: 'Teach WhisPURR your unique vocabulary, like tricky names, special acronyms, or work-specific words.' },
    { id: 'ShortHand', title: 'ShortHand Macros', text: 'Create quick voice shortcuts! For example, say "sig" to automatically type out your entire email signature.' },
    { id: 'Context', title: 'Global Context', text: 'Set up custom styles so WhisPURR always uses the right tone for your current task, like writing emails, chatting, or coding.' },
    { id: 'ScratchPad', title: 'ScratchPad', text: 'Your personal sandbox! Quickly jot down ideas or play around to test your new custom styles.' },
    { id: 'Profile', title: 'Your Profile', text: 'Manage your account details, billing, and tweak your overall settings just the way you like them.' },
    { id: 'CatFacts', title: 'Cat Facts', text: 'Because who doesn\'t need a fun, random cat fact to brighten their workday?' }
  ];

export default function WhispurrApp({ mode, setMode = () => {} }: { mode?: string, setMode?: (m: any) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);


  const currentTourId = isTourActive ? TOUR_STEPS[tourStep].id : null;

  const handleNextTourStep = () => {
    if (tourStep < TOUR_STEPS.length - 1) {
      setTourStep(s => s + 1);
      const nextId = TOUR_STEPS[tourStep + 1].id;
      if (nextId === 'Profile') {
        setIsSettingsOpen(true);
        setShowCatFactPopup(false);
      } else if (nextId === 'CatFacts') {
        setIsSettingsOpen(false);
        setShowCatFactPopup(true);
      } else {
        setIsSettingsOpen(false);
        setShowCatFactPopup(false);
        setActiveTab(nextId);
      }
    } else {
      setIsTourActive(false);
      setIsSettingsOpen(false);
      setShowCatFactPopup(false);
      setActiveTab('Home');
    }
  };

  const handlePrevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(s => s - 1);
      const prevId = TOUR_STEPS[tourStep - 1].id;
      if (prevId === 'Profile') {
        setIsSettingsOpen(true);
        setShowCatFactPopup(false);
      } else if (prevId === 'CatFacts') {
        setIsSettingsOpen(false);
        setShowCatFactPopup(true);
      } else {
        setIsSettingsOpen(false);
        setShowCatFactPopup(false);
        setActiveTab(prevId);
      }
    }
  };

  useEffect(() => {
    if (!isTourActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextTourStep();
      } else if (e.key === 'ArrowLeft') {
        handlePrevTourStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive, tourStep]);

  const [currentCatFact, setCurrentCatFact] = useState('');
  const [showCatFactPopup, setShowCatFactPopup] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => !hasShownTutorialThisSession);
  const [talkShortcut, setTalkShortcut] = useState(() => localStorage.getItem('whispurr_talk') || 'Alt');
  const [isRecordingShortcut, setIsRecordingShortcut] = useState(false);
  const [quicklaunchShortcut, setQuicklaunchShortcut] = useState(() => localStorage.getItem('whispurr_quicklaunch') || 'Ctrl');
  const [isRecordingQuicklaunch, setIsRecordingQuicklaunch] = useState(false);
  const [quickEditShortcut, setQuickEditShortcut] = useState(() => localStorage.getItem('whispurr_quickedit') || 'Alt + Ctrl');
  const [isRecordingQuickEdit, setIsRecordingQuickEdit] = useState(false);
  const [isSeamlessSwitchEnabled, setIsSeamlessSwitchEnabled] = useState(() => localStorage.getItem('whispurr_seamless_switch') !== 'false');

  useEffect(() => {
    if (isRecordingShortcut) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        if (key.length === 1) key = key.toUpperCase();
        setTalkShortcut(key);
        localStorage.setItem('whispurr_talk', key);
        setIsRecordingShortcut(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingShortcut]);

  useEffect(() => {
    if (isRecordingQuicklaunch) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        if (key.length === 1) key = key.toUpperCase();
        setQuicklaunchShortcut(key);
        localStorage.setItem('whispurr_quicklaunch', key);
        setIsRecordingQuicklaunch(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingQuicklaunch]);

  useEffect(() => {
    if (isRecordingQuickEdit) {
      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let key = e.key;
        if (key === ' ') key = 'Space';
        else if (key === 'Control') key = 'Ctrl';
        else if (key === 'Meta') key = 'Cmd';
        if (key.length === 1) key = key.toUpperCase();
        
        let combo = [];
        if (e.ctrlKey && key !== 'Ctrl') combo.push('Ctrl');
        if (e.altKey && key !== 'Alt') combo.push('Alt');
        if (e.shiftKey && key !== 'Shift') combo.push('Shift');
        combo.push(key);
        
        const finalKey = combo.join(' + ');
        setQuickEditShortcut(finalKey);
        localStorage.setItem('whispurr_quickedit', finalKey);
        setIsRecordingQuickEdit(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRecordingQuickEdit]);






  const [currentTheme, setCurrentTheme] = useState('coffee');
  const [moodsEnabled, setMoodsEnabled] = useState(false);
  
  // StickyNotes State
  const [stickyNotes, setStickyNotes] = useState([
    { id: 1, text: "Buy catnip\nSchedule vet appointment\nClean the litter box", color: "bg-[#e8d5b5]", rotation: -3, x: 20, y: 10 },
    { id: 2, text: "Project ideas:\n- AI voice assistant\n- MockOS prototype\n- Add more cats", color: "bg-[#d5e8b5]", rotation: 4, x: -10, y: 40 },
    { id: 3, text: "Remember to drink water!", color: "bg-[#b5d5e8]", rotation: -2, x: 30, y: -20 },
    { id: 4, text: "Call Mom at 6 PM", color: "bg-[#e8b5c5]", rotation: 5, x: -20, y: 10 },
  ]);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

  useEffect(() => {
    const handleAddNote = (e: any) => {
      const newText = e.detail;
      if (newText) {
        setStickyNotes(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            text: newText, 
            color: "bg-[#e8d5b5]", 
            rotation: (Math.random() - 0.5) * 10, 
            x: (Math.random() - 0.5) * 40, 
            y: (Math.random() - 0.5) * 40 
          }
        ]);
      }
    };
    window.addEventListener('add-sticky-note', handleAddNote);
    return () => window.removeEventListener('add-sticky-note', handleAddNote);
  }, []);

  useEffect(() => {
    if (mode === 'ScratchPad') {
      setActiveTab('ScratchPad');
    }
  }, [mode]);

  // Home Voice-to-Text Chat Box State
  const [homeChatText, setHomeChatText] = useState('');
  const [showQuickEditModal, setShowQuickEditModal] = useState(false);
  const [quickEditText, setQuickEditText] = useState('');

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isRecordingShortcut || isRecordingQuicklaunch || isRecordingQuickEdit) return;

      const keys = [];
      if (e.ctrlKey) keys.push('Ctrl');
      if (e.altKey) keys.push('Alt');
      if (e.shiftKey) keys.push('Shift');
      if (e.metaKey) keys.push('Cmd');
      
      let key = e.key;
      if (key === ' ') key = 'Space';
      if (key.length === 1) key = key.toUpperCase();
      
      if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) {
          keys.push(key);
      }

      const currentCombo = keys.join(' + ');
      const normalizeCombo = (str: string) => str.split(' + ').sort().join(' + ');

      if (currentCombo && normalizeCombo(currentCombo) === normalizeCombo(quickEditShortcut)) {
        e.preventDefault();
        openQuickEdit();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [quickEditShortcut, isRecordingShortcut, isRecordingQuicklaunch, isRecordingQuickEdit, homeChatText]);

  const openQuickEdit = () => {
    if (!homeChatText.trim()) return;
    const sentences = homeChatText.match(/[^.!?]+[.!?]*\s*/g) || [homeChatText];
    const lastSentence = sentences[sentences.length - 1];
    setQuickEditText(lastSentence.trim());
    setShowQuickEditModal(true);
  };

  const saveQuickEdit = () => {
    const sentences = homeChatText.match(/[^.!?]+[.!?]*\s*/g) || [homeChatText];
    sentences[sentences.length - 1] = (sentences.length > 1 ? ' ' : '') + quickEditText;
    setHomeChatText(sentences.join('').trim());
    setShowQuickEditModal(false);
  };
  const [isHomeListening, setIsHomeListening] = useState(false);
  const [isHomeCopied, setIsHomeCopied] = useState(false);
  const [isHomeTransforming, setIsHomeTransforming] = useState(false);
  const [isWhisperMode, setIsWhisperMode] = useState(false);
  const [showWhisperInfo, setShowWhisperInfo] = useState(false);
  const [showMoodsInfo, setShowMoodsInfo] = useState(false);
  const homeRecognitionRef = useRef<any>(null);
  const homeInitialTextRef = useRef('');

  const toggleHomeListening = () => {
    if (isHomeListening) {
      try {
        homeRecognitionRef.current?.stop();
      } catch (e) {}
      setIsHomeListening(false);
      return;
    }

    const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or a Chromium browser.");
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      homeInitialTextRef.current = homeChatText.trim();

      recognition.onstart = () => {
        setIsHomeListening(true);
      };

      recognition.onresult = (event: any) => {
        let sessionText = '';
        for (let i = 0; i < event.results.length; i++) {
          sessionText += event.results[i][0].transcript;
        }
        const trimmedSession = sessionText.trim();
        if (homeInitialTextRef.current) {
          setHomeChatText(`${homeInitialTextRef.current} ${trimmedSession}`);
        } else {
          setHomeChatText(trimmedSession);
        }
      };

      recognition.onerror = (e: any) => {
        console.warn("Home Chat speech error:", e.error);
        if (e.error !== 'no-speech') {
          setIsHomeListening(false);
        }
      };

      recognition.onend = () => {
        setIsHomeListening(false);
      };

      homeRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsHomeListening(false);
    }
  };

  const handleCopyHomeChat = async () => {
    if (!homeChatText.trim()) return;
    try {
      await navigator.clipboard.writeText(homeChatText);
      setIsHomeCopied(true);
      setTimeout(() => setIsHomeCopied(false), 2000);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = homeChatText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsHomeCopied(true);
      setTimeout(() => setIsHomeCopied(false), 2000);
    }
  };

  const handleClearHomeChat = () => {
    setHomeChatText('');
    if (isHomeListening) {
      try {
        homeRecognitionRef.current?.stop();
      } catch (e) {}
      setIsHomeListening(false);
    }
  };

  const handleFormatWithAI = async () => {
    if (!homeChatText.trim() || isHomeTransforming) return;
    setIsHomeTransforming(true);
    try {
      const formatted = await transformText(homeChatText, (mode as any) || 'Professional', 2);
      if (formatted) setHomeChatText(formatted);
    } catch (e) {
      console.error(e);
    } finally {
      setIsHomeTransforming(false);
    }
  };

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (homeRecognitionRef.current) {
        try {
          homeRecognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Dictionary State
  const [dictItems, setDictItems] = useState([
    { id: 1, spoken: 'Kivi', correct: 'WhisPURR' },
    { id: 2, spoken: 'Ree-act', correct: 'React' },
    { id: 3, spoken: 'Type scrip', correct: 'TypeScript' },
  ]);
  const [spokenInput, setSpokenInput] = useState('');
  const [correctInput, setCorrectInput] = useState('');
  const [isDictListening, setIsDictListening] = useState(false);

  const startDictListening = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsDictListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (activeTab === 'Dictionary') {
        setSpokenInput(transcript);
      } else if (activeTab === 'Shortcuts') {
        setTriggerInput(transcript);
      }
    };
    
    recognition.onend = () => setIsDictListening(false);
    
    recognition.start();
  };

  const addDictItem = () => {
    if (spokenInput && correctInput) {
      setDictItems([...dictItems, { id: Date.now(), spoken: spokenInput, correct: correctInput }]);
      setSpokenInput('');
      setCorrectInput('');
    }
  };

  // Shortcuts State
  const [shortcutItems, setShortcutItems] = useState([
    { id: 1, trigger: 'my address', expansion: '123 Developer Way, Tech District, CA 94105' },
    { id: 2, trigger: 'my signoff', expansion: 'Warm Regards,\nRaghav\nRoll No: 42' },
  ]);
  const [triggerInput, setTriggerInput] = useState('');
  const [expansionInput, setExpansionInput] = useState('');

  const addShortcutItem = () => {
    if (triggerInput && expansionInput) {
      setShortcutItems([...shortcutItems, { id: Date.now(), trigger: triggerInput, expansion: expansionInput }]);
      setTriggerInput('');
      setExpansionInput('');
    }
  };

  const editShortcutItem = (item: any) => {
    setTriggerInput(item.trigger);
    setExpansionInput(item.expansion);
    setShortcutItems(shortcutItems.filter(i => i.id !== item.id));
  };
  
  const timeSavedWeekHrs = 15; 
  let whispurrIcon: React.ReactNode = (
    <video src="/kitten.mp4" autoPlay loop muted playsInline className="w-full h-full scale-150 object-contain mix-blend-screen" />
  );
  let whispurrStage = 'Kitten';
  let animationClass = '';
  
  if (timeSavedWeekHrs >= 2 && timeSavedWeekHrs < 5) {
    whispurrIcon = '🥱';
    whispurrStage = 'Waking Up';
    animationClass = 'animate-[bounce_3s_infinite]';
  } else if (timeSavedWeekHrs >= 5 && timeSavedWeekHrs < 12) {
    whispurrIcon = '🐱';
    whispurrStage = 'Active Kat';
    animationClass = 'animate-bounce';
  } else if (timeSavedWeekHrs >= 12) {
    whispurrIcon = (
      <video src="/new_zoomies.mp4" autoPlay loop muted playsInline className="w-full h-full scale-[2.0] object-contain mix-blend-multiply opacity-90" />
    );
    whispurrStage = 'Zoomies';
    animationClass = '';
  }

  // Animation variants
  const tabVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, scale: 0.98, filter: 'blur(4px)', transition: { duration: 0.2, ease: 'easeIn' } }
  };

  // Glassmorphism classes
  const glassPanel = "bg-[#0f0f0f] shadow-lg border border-white/[0.08] rounded-3xl";
  const glassInput = "bg-black/20 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-orange-500/50 focus:bg-black/40 transition-all text-sm";
  const glassButton = "bg-orange-500/90 hover:bg-orange-400 text-black font-bold px-8 py-3 rounded-2xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] text-sm";

  const getSidebarItemClass = (id: string, baseClass: string) => {
    let classes = baseClass;
    if (isTourActive) {
      if (currentTourId === id) {
        classes += ' ring-2 ring-orange-500 ring-offset-4 ring-offset-[#0f0f0f] relative z-[9999] bg-[#1a1a1a] scale-105 shadow-xl opacity-100';
      } else {
        classes += ' opacity-20 pointer-events-none grayscale blur-[1px]';
      }
    }
    return classes;
  };


  return (
    <>
    <AnimatePresence>
        {showQuickEditModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl bg-[#1a110e] border border-[#5d4037]/60 rounded-2xl shadow-2xl p-6"
            >
              <h2 className="text-xl font-bold text-orange-200 mb-4 flex items-center gap-2">
                <Pencil className="w-5 h-5 text-orange-400" />
                Quick Edit (Last Sentence)
              </h2>
              <textarea
                autoFocus
                value={quickEditText}
                onChange={(e) => setQuickEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    saveQuickEdit();
                  }
                  if (e.key === 'Escape') {
                    setShowQuickEditModal(false);
                  }
                }}
                className="w-full h-32 bg-black/40 border border-orange-500/30 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-orange-500/80 resize-none shadow-inner"
              />
              <div className="flex justify-between items-center mt-4 text-xs text-white/40">
                <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 font-mono">Enter</kbd> to save</span>
                <div className="flex gap-3">
                  <button onClick={() => setShowQuickEditModal(false)} className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">Cancel</button>
                  <button onClick={saveQuickEdit} className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all">Save Changes</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    <div className={`h-full w-full bg-black text-white flex font-sans overflow-hidden ${currentTheme === 'coffee' ? 'theme-coffee' : ''}`}>
      
      {/* Sidebar */}
      <motion.div 
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="h-full bg-white/[0.01] border-r border-white/5 flex flex-col whitespace-nowrap overflow-hidden shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
      >
        <div className={`h-16 flex items-center border-b border-white/5 relative shrink-0 transition-all ${isSidebarOpen ? 'px-6' : 'justify-center'}`}>
          <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : 0 }} className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 flex items-center justify-center shrink-0 drop-shadow-md">
              <KiviCatIcon size={32} />
            </div>
            <span className="font-bold text-lg tracking-wide text-orange-50 whitespace-nowrap">WhisPURR</span>
          </motion.div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`text-white/40 hover:text-white transition-colors shrink-0 ${isSidebarOpen ? 'absolute right-4 z-10' : ''}`}>
            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div onClick={() => {setActiveTab('Home'); }} className={getSidebarItemClass('Home', `flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === 'Home' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`)}>
            <Home className="w-5 h-5 shrink-0" />
            <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : 0 }} className="text-base font-medium overflow-hidden">Home</motion.div>
          </div>
          
          <div onClick={() => {setActiveTab('History'); }} className={getSidebarItemClass('History', `flex items-center py-3 rounded-xl cursor-pointer transition-all ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === 'History' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`)}>
            <Clock className="w-5 h-5 shrink-0" />
            <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : 0 }} className="text-base font-medium overflow-hidden">History</motion.div>
          </div>

          <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0 }} className={`mt-6 mb-2 text-xs font-bold text-white/30 uppercase tracking-widest h-5 transition-all ${isSidebarOpen ? 'px-8' : 'px-0 text-center w-full shrink-0'} ${isTourActive ? 'opacity-20 blur-[1px]' : ''}`}>
            Customize
          </motion.div>
          
          {[
            { name: 'Dictionary', icon: BookOpen },
            { name: 'ShortHand', icon: Zap },
            { name: 'Context', icon: Palette },
            { name: 'ScratchPad', icon: FileText },
          ].map((tab) => (
            <div key={tab.name} onClick={() => {
              setActiveTab(tab.name);
            }} className={getSidebarItemClass(tab.name, `flex items-center py-3 rounded-xl cursor-pointer transition-all shrink-0 ${isSidebarOpen ? 'gap-4 px-4 mx-4' : 'gap-0 justify-center mx-4'} ${activeTab === tab.name ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`)}>
              <tab.icon className="w-5 h-5 shrink-0" />
              <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : 0 }} className="text-base font-medium overflow-hidden">{tab.name}</motion.div>
            </div>
          ))}
        </div>
        
        {/* Sticky Bottom Profile Section */}
        <div className="mb-6 w-full px-4 flex flex-col gap-2 shrink-0 border-t border-white/5 pt-4">
          <div 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
            className={getSidebarItemClass('Profile', `flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${isSettingsOpen ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'} ${isSidebarOpen ? 'gap-3' : 'gap-0 justify-center'}`)}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8d6e63] to-[#d7ccc8] flex items-center justify-center shrink-0 border border-[#5d4037]/50 overflow-hidden shadow-inner">
              <User className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : 0 }} className="flex flex-col justify-center overflow-hidden">
              <span className="text-sm font-medium text-white">Ugine</span>
            </motion.div>
          </div>

          {/* Cat Facts Button with Popup */}
          <div className="relative">
            <div onClick={() => {
              if (!showCatFactPopup) {
                setCurrentCatFact(CAT_FACTS[Math.floor(Math.random() * CAT_FACTS.length)]);
              }
              setShowCatFactPopup(!showCatFactPopup);
            }} className={getSidebarItemClass('CatFacts', `flex items-center py-3 px-3 rounded-xl cursor-pointer transition-all ${showCatFactPopup ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'} ${isSidebarOpen ? 'gap-3' : 'gap-0 justify-center'}`)}>
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0, width: isSidebarOpen ? 'auto' : 0 }} className="flex flex-col justify-center overflow-hidden whitespace-nowrap">
                <span className="text-sm font-medium">Cat Facts</span>
              </motion.div>
            </div>

            <AnimatePresence>
              {showCatFactPopup && (
                <motion.div 
                  initial={{ opacity: 0, x: -10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: 10 }}
                  className={`fixed bottom-8 ${isSidebarOpen ? 'left-[280px]' : 'left-[100px]'} w-80 p-6 rounded-2xl bg-[#1e1e1e]/95 backdrop-blur-xl border border-orange-500/40 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-[9999] pointer-events-none whitespace-normal`}
                >
                  <div className="flex items-center gap-2 mb-3 text-orange-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Did you know?</span>
                  </div>
                  <p className="text-[15px] text-white/90 leading-relaxed italic font-medium">
                    "{currentCatFact}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>



      {/* Secondary Settings Sidebar */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-white/[0.02] border-r border-white/5 flex flex-col whitespace-nowrap overflow-hidden shrink-0 relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.3)]"
          >
            <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
              <span className="font-bold text-white">Settings</span>
            </div>
            <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
              {[
                { name: 'Settings', icon: Settings },
                  { name: 'Shortcuts', icon: Keyboard },
                { name: 'User Policy', icon: Shield },
                { name: 'Theme', icon: LayoutTemplate },
                { name: 'Plans & Billing', icon: CreditCard },
                { name: 'Tutorial', icon: PlayCircle },
              ].map((tab) => (
                <div key={tab.name} onClick={() => {setActiveTab(tab.name); }} className={`flex items-center gap-4 py-2.5 rounded-xl cursor-pointer transition-all px-4 mx-4 ${activeTab === tab.name ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                  <tab.icon className="w-4 h-4 shrink-0" />
                  <div className="text-sm font-medium">{tab.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}

      <div className="flex-1 flex flex-col overflow-hidden relative pt-10">
      <AnimatePresence>
        {isTourActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-12"
          >
            <div className="bg-[#f4ece1] border-4 border-[#8d6e63] p-10 rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] max-w-lg w-full relative">
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-[#8d6e63] rounded-full flex items-center justify-center shadow-lg text-[#f4ece1] font-bold text-2xl border-4 border-[#f4ece1]">
                {tourStep + 1}
              </div>
              <h2 className="text-4xl font-serif font-bold text-white mb-4 tracking-tight">{TOUR_STEPS[tourStep].title}</h2>
              <p className="text-white/80 text-xl mb-10 leading-relaxed font-sans">{TOUR_STEPS[tourStep].text}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => setIsTourActive(false)} className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b-2 border-transparent hover:border-[#8d6e63] pb-1">Skip Tour</button>
                <button onClick={handleNextTourStep} className="px-8 py-4 bg-[#3e2723] text-[#f4ece1] font-bold rounded-2xl hover:bg-[#5d4037] transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg">
                  {tourStep < TOUR_STEPS.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


        <div className="flex-1 p-4 flex gap-4 overflow-hidden relative">
          <AnimatePresence>
              {activeTab === 'Home' && (
              <motion.div key="home" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-4 flex gap-4">
                <div className="flex-1 flex flex-col gap-6 relative z-10">
                  <FootprintManager contained={true} />
                  <div className="px-2 pointer-events-none relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Good afternoon, Ugine.</h1>
                    <p className="text-white/50 text-sm">Your invisible translation layer is active and standing by.</p>
                  </div>
                  {/* Voice-to-Text Chat Box */}
                  <div className={`h-fit ${glassPanel} p-6 flex flex-col relative z-10 overflow-hidden shadow-2xl border border-white/10`}>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4 shrink-0">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={toggleHomeListening}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-sm transition-all active:scale-95 ${
                            isHomeListening
                              ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                              : 'bg-orange-500/15 border-orange-500/30 text-orange-400 hover:bg-orange-500/25 hover:scale-105'
                          }`}
                          title={isHomeListening ? 'Stop Listening' : 'Start Listening'}
                        >
                          {isHomeListening ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <div>
                          <h2 className="text-base font-semibold text-white tracking-wide flex items-center gap-2">
                            Voice-to-Text Studio
                            {isHomeListening && (
                              <span className="flex items-center gap-1.5 text-xs font-normal text-red-400 bg-red-500/15 px-2.5 py-0.5 rounded-full border border-red-500/30 animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                Listening...
                              </span>
                            )}
                          </h2>
                          <p className="text-xs text-white/40">Speak naturally and convert your speech into copyable text</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                          {homeChatText && (
                            <button
                              onClick={handleClearHomeChat}
                              className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                              title="Clear text"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={handleCopyHomeChat}
                            disabled={!homeChatText.trim()}
                            className={`flex items-center justify-center p-2.5 rounded-xl transition-all ${
                              isHomeCopied
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : homeChatText.trim()
                                ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15 shadow-sm active:scale-95'
                                : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                            }`}
                            title="Copy to Clipboard"
                          >
                            {isHomeCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </button>
                      </div>
                    </div>

                    {/* Control Toggles Bar */}
                    <div className="flex gap-4 mb-4 relative z-20">
                      {/* Whisper Mode Toggle */}
                      <div className="flex items-center justify-between bg-[#190f0b]/50 border border-[#5d4037]/40 p-2.5 px-4 rounded-2xl shadow-inner flex-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Whisper Mode
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isWhisperMode}
                            onClick={() => setIsWhisperMode(!isWhisperMode)}
                            className={`relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out p-0.5 items-center focus:outline-none ${
                              isWhisperMode
                                ? 'bg-gradient-to-r from-[#8d6e63] to-[#6d4c41] border-[#a1887f] shadow-[0_0_18px_rgba(141,110,99,0.5)]'
                                : 'bg-[#2b1f1a] border-[#5d4037]/60'
                            }`}
                            title={isWhisperMode ? "Disable Whisper Mode" : "Enable Whisper Mode"}
                          >
                            <span className="sr-only">Toggle Whisper Mode</span>
                            <motion.span
                              layout
                              transition={{ type: "spring", stiffness: 600, damping: 35 }}
                              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-[#f4ece1] shadow-md flex items-center justify-center ${
                                isWhisperMode ? 'ml-auto text-white' : 'mr-auto text-[#8d6e63]'
                              }`}
                            >
                              <span className={`w-2.5 h-2.5 rounded-full ${isWhisperMode ? 'bg-[#5d4037]' : 'bg-[#8d6e63]/60'}`} />
                            </motion.span>
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => setShowWhisperInfo(!showWhisperInfo)}
                              onBlur={() => setShowWhisperInfo(false)}
                              className="p-1.5 rounded-full text-[#E8D5B5]/70 hover:text-[#E8D5B5] hover:bg-[#5d4037]/40 transition-colors relative z-20"
                              title="Info"
                            >
                              <Info className="w-5 h-5" />
                            </button>
                            <AnimatePresence>
                              {showWhisperInfo && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                  className="absolute top-full mt-2 right-0 w-56 bg-[#2B1F1A] border border-[#5D4037]/50 rounded-xl p-3 shadow-2xl z-50 pointer-events-none"
                                >
                                  <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#2B1F1A] border-t border-l border-[#5D4037]/50 rotate-45" />
                                  <div className="text-[11px] text-[#E8D5B5] leading-relaxed relative z-10 font-medium">
                                    Whisper Mode lets you talk very softly and slowly into the mic. It automatically heightens sensitivity and increases pause tolerance.
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>

                      {/* Moods Toggle */}
                      <div className="flex items-center justify-between bg-[#190f0b]/50 border border-[#5d4037]/40 p-2.5 px-4 rounded-2xl shadow-inner flex-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
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
                                moodsEnabled ? 'ml-auto text-white' : 'mr-auto text-[#8d6e63]'
                              }`}
                            >
                              <span className={`w-2.5 h-2.5 rounded-full ${moodsEnabled ? 'bg-[#5d4037]' : 'bg-[#8d6e63]/60'}`} />
                            </motion.span>
                          </button>
                          <div className="relative">
                            <button 
                              onClick={() => setShowMoodsInfo(!showMoodsInfo)}
                              onBlur={() => setShowMoodsInfo(false)}
                              className="p-1.5 rounded-full text-[#E8D5B5]/70 hover:text-[#E8D5B5] hover:bg-[#5d4037]/40 transition-colors relative z-20"
                              title="Info"
                            >
                              <Info className="w-5 h-5" />
                            </button>
                            <AnimatePresence>
                              {showMoodsInfo && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                  className="absolute top-full mt-2 right-0 w-56 bg-[#2B1F1A] border border-[#5D4037]/50 rounded-xl p-3 shadow-2xl z-50 pointer-events-none"
                                >
                                  <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#2B1F1A] border-t border-l border-[#5D4037]/50 rotate-45" />
                                  <div className="text-[11px] text-[#E8D5B5] leading-relaxed relative z-10 font-medium">
                                    WhisPURR aptly adds expressive emojis based on your Emotions and Undertones
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Textarea Area */}
                    <div className="relative flex flex-col min-h-0 h-48">
                      <textarea
                        value={homeChatText}
                        onChange={(e) => setHomeChatText(e.target.value)}
                        placeholder={
                          isHomeListening
                            ? 'Listening to your voice... Speak clearly into your microphone...'
                            : 'Click the Mic icon to speak, or type here directly to convert and copy anywhere...'
                        }
                        className="flex-1 w-full bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-2xl p-5 text-white placeholder-white/20 resize-none outline-none font-sans text-base leading-relaxed transition-all shadow-inner"
                      />
                      
                      {/* Character & Word count */}
                      <div className="flex items-center justify-between pt-2 px-1 text-xs text-white/30 shrink-0">
                        <div className="flex items-center gap-4">
                          <span>{homeChatText.trim() ? homeChatText.trim().split(/\s+/).length : 0} words</span>
                          <span>{homeChatText.length} characters</span>
                        </div>
                        {isHomeCopied && (
                          <span className="text-emerald-400 font-medium animate-pulse">
                            ✓ Copied to clipboard! Ready to paste anywhere (Ctrl+V / Cmd+V)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`w-[320px] ${glassPanel} bg-black/40 p-6 flex flex-col relative z-10 overflow-hidden`}>
                  <div className="w-full flex-1 min-h-[160px] rounded-2xl bg-[#0f0f0f] mb-6 relative border border-white/5 flex flex-col items-center justify-center group overflow-hidden">
                     <div className={`text-7xl relative z-10 ${animationClass} flex items-center justify-center w-full h-full`}>
                       {whispurrIcon}
                     </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-orange-50 mb-4 text-center border-b border-white/10 pb-3">Today's Impact</h3>
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col items-center justify-center p-4 w-full rounded-2xl bg-orange-500/10 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.05)]">
                      <div className="text-xs text-orange-100/70 mb-1 uppercase tracking-wider font-semibold">Time Saved Today</div>
                      <div className="font-bold text-4xl text-orange-400">1h 42m</div>
                      <div className="text-xs text-orange-200/40 mt-2">Weekly Total: {timeSavedWeekHrs} Hours</div>
                    </div>
                    <div className="flex w-full gap-3">
                      <div className="flex-1 flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                        <Clock className="w-5 h-5 text-white/30" />
                        <div className="text-center">
                          <div className="font-bold text-sm text-white">24m</div>
                          <div className="text-[10px] text-white/40 uppercase">Dictating</div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                        <FileText className="w-5 h-5 text-white/30" />
                        <div className="text-center">
                          <div className="font-bold text-sm text-white">3.4k</div>
                          <div className="text-[10px] text-white/40 uppercase">Words</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'History' && (
              <motion.div key="history" variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col gap-6 p-8 overflow-y-auto ${glassPanel}`}>
                <div className="px-2 shrink-0">
                  <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Clock className="text-[#8d6e63] w-8 h-8" />
                    History
                  </h1>
                  <p className="text-white/80 font-medium text-sm">Review your past transcriptions and track your WhisPURR usage.</p>
                </div>
                
                {/* Stats Brown Box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#2b1f1a]/90 border border-[#5d4037]/60 rounded-3xl p-6 shrink-0 shadow-xl">
                  <div className="flex flex-col items-center justify-center p-4 bg-[#190f0b]/50 rounded-2xl border border-[#5d4037]/40 shadow-inner">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Current Streak</span>
                    <div className="text-3xl font-bold text-[#f4ece1] flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-orange-400" />
                      4 Days
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-[#190f0b]/50 rounded-2xl border border-[#5d4037]/40 shadow-inner">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Total Words</span>
                    <div className="text-3xl font-bold text-[#f4ece1]">
                      12,450
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-[#190f0b]/50 rounded-2xl border border-[#5d4037]/40 shadow-inner">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Hours Saved</span>
                    <div className="text-3xl font-bold text-[#f4ece1]">
                      3.5h
                    </div>
                  </div>
                </div>

                {/* Past Conversations List */}
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 pb-10">
                  <h3 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-2 mt-4 px-2">Recent Dictations</h3>
                  {[
                    { date: 'Today, 10:42 AM', mode: 'Developer', text: 'Task: Resolve login bug.\nImpact: Critical. The authentication token is expiring prematurely in the new build.' },
                    { date: 'Today, 9:15 AM', mode: 'Casual', text: 'I am going to be a bit late to the standup. Start without me!' },
                    { date: 'Yesterday, 4:30 PM', mode: 'Formal', text: 'Please review the attached Q3 financial reports and provide your feedback by Friday.' },
                    { date: 'Yesterday, 2:00 PM', mode: 'Prompts', text: 'Write a robust Python script using type hints to parse the customer feedback CSV and extract common keywords.' },
                  ].map((conv, i) => (
                    <div key={i} className="flex flex-col gap-2 p-5 bg-[#5d4037]/5 hover:bg-[#5d4037]/10 transition-colors border border-[#5d4037]/20 rounded-2xl cursor-pointer shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-xs font-bold">{conv.date}</span>
                        <span className="px-2 py-1 bg-[#5d4037]/20 border border-[#5d4037]/30 rounded-md text-[10px] text-white font-black uppercase tracking-wider">{conv.mode}</span>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-serif italic font-medium mt-1">"{conv.text}"</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Dictionary' && (
              <motion.div key="dict" variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col gap-6 p-8 overflow-y-auto ${glassPanel}`}>
                <div className="px-2">
                  <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <BookOpen className="text-orange-400 w-8 h-8" />
                    Dictionary
                  </h1>
                  <p className="text-white/40 text-sm">Teach WhisPURR to correctly transcribe unique names, technical jargon, and words it frequently mishears.</p>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 items-end shadow-lg">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">When I say...</label>
                    <div className="relative">
                      <input type="text" placeholder="e.g. Ty-scrip" value={spokenInput} onChange={(e) => setSpokenInput(e.target.value)} className={`${glassInput} w-full pr-12`} />
                      <button onClick={startDictListening} title="Speak" className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${isDictListening ? 'bg-orange-500/20 text-orange-400 animate-pulse' : 'text-white/30 hover:bg-white/10 hover:text-white'}`}>
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">It actually means...</label>
                    <input type="text" placeholder="e.g. TypeScript" value={correctInput} onChange={(e) => setCorrectInput(e.target.value)} className={`${glassInput} w-full`} />
                  </div>
                  <button onClick={addDictItem} className={`${glassButton} h-[52px]`}>Teach</button>
                </div>
                <div className="flex-1 flex flex-col gap-3 mt-4">
                  <div className="grid grid-cols-2 px-6 py-2 text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
                    <div>What you speak</div>
                    <div>What it means</div>
                  </div>
                  <AnimatePresence>
                    {dictItems.map(item => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-2 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group items-center text-sm shadow-sm">
                        <div className="font-medium text-white/70">{item.spoken}</div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-orange-300">{item.correct}</span>
                          <button onClick={() => setDictItems(dictItems.filter(i => i.id !== item.id))} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all p-2">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {dictItems.length === 0 && <div className="text-center text-white/30 py-12 italic text-sm">Your Kat's dictionary is empty.</div>}
                </div>
              </motion.div>
            )}

            {activeTab === 'ShortHand' && (
              <motion.div key="shortcuts" variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col gap-6 p-8 overflow-y-auto ${glassPanel}`}>
                <div className="px-2">
                  <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Zap className="text-orange-400 w-8 h-8" />
                    ShortHand
                  </h1>
                  <p className="text-white/40 text-sm">Automatically expand quick voice triggers into long-form templates.</p>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                  <div className="w-1/3">
                    <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">When I say...</label>
                    <div className="relative">
                      <input type="text" placeholder="e.g. my address" value={triggerInput} onChange={(e) => setTriggerInput(e.target.value)} className={`${glassInput} w-full pr-12`} />
                      <button onClick={startDictListening} className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${isDictListening ? 'bg-orange-500/20 text-orange-400 animate-pulse' : 'text-white/30 hover:bg-white/10 hover:text-white'}`}>
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="block text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">Expand it to...</label>
                    <textarea placeholder="e.g. 123 Main St..." value={expansionInput} onChange={(e) => setExpansionInput(e.target.value)} rows={2} className={`${glassInput} w-full resize-none`} />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addShortcutItem} className={`${glassButton} h-[52px] shrink-0`}>Teach</button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 mt-4">
                  <div className="grid grid-cols-3 px-6 py-2 text-xs font-bold text-white/30 uppercase tracking-widest border-b border-white/5">
                    <div className="col-span-1">Voice Trigger</div>
                    <div className="col-span-2">Expanded Output</div>
                  </div>
                  <AnimatePresence>
                    {shortcutItems.map(item => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-3 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group items-start gap-6 text-sm shadow-sm">
                        <div className="font-medium text-white/70 col-span-1 mt-1.5">"{item.trigger}"</div>
                        <div className="col-span-2 flex justify-between items-start gap-4">
                          <div className="text-orange-200/80 whitespace-pre-wrap font-mono text-sm bg-black/30 p-4 rounded-lg flex-1 border border-white/5">{item.expansion}</div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-2">
                            <button onClick={() => editShortcutItem(item)} className="text-white/30 hover:text-orange-400 p-2"><Pencil className="w-4 h-4" /></button>
                            <button onClick={() => setShortcutItems(shortcutItems.filter(i => i.id !== item.id))} className="text-white/30 hover:text-red-400 p-2"><X className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {shortcutItems.length === 0 && <div className="text-center text-white/30 py-12 italic text-sm">No voice macros configured yet.</div>}
                </div>
              </motion.div>
            )}

            {activeTab === 'ScratchPad' && (
              <motion.div key="stickynotes" variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col p-8 overflow-hidden ${glassPanel}`}>
                <div className="px-2 mb-8 shrink-0">
                  <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <FileText className="text-orange-400 w-8 h-8" />
                    ScratchPad
                  </h1>
                  <p className="text-white/40 text-sm">Jot down your thoughts instantly. Click any note to focus.</p>
                </div>
                <div className="flex-1 relative w-full h-full">
                  {stickyNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      onClick={() => setActiveNoteId(note.id)}
                      layoutId={`note-${note.id}`}
                      initial={{ rotate: note.rotation, x: note.x, y: note.y }}
                      whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
                      className={`absolute w-56 h-56 p-5 rounded-sm shadow-lg cursor-pointer flex flex-col ${note.color} text-white`}
                      style={{ 
                        top: `${10 + (index % 2) * 35}%`, 
                        left: `${5 + index * 22}%`,
                        boxShadow: '4px 4px 15px rgba(0,0,0,0.3), inset -2px -2px 10px rgba(0,0,0,0.05)'
                      }}
                    >
                      <div className="w-full flex-1 overflow-hidden pointer-events-none">
                        <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed">{note.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Enlarged Note Overlay */}
                <AnimatePresence>
                  {activeNoteId !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-md"
                      onClick={() => setActiveNoteId(null)}
                    >
                      {stickyNotes.find(n => n.id === activeNoteId) && (
                        <motion.div
                          layoutId={`note-${activeNoteId}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`w-full max-w-lg h-96 p-8 rounded-md shadow-2xl flex flex-col relative ${stickyNotes.find(n => n.id === activeNoteId)?.color} text-white`}
                          style={{ boxShadow: '8px 8px 30px rgba(0,0,0,0.5)' }}
                        >
                          <button 
                            onClick={() => setActiveNoteId(null)}
                            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-[#3e2723]/10 rounded-full transition-colors z-10"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <textarea
                            value={stickyNotes.find(n => n.id === activeNoteId)?.text}
                            onChange={(e) => setStickyNotes(notes => notes.map(n => n.id === activeNoteId ? { ...n, text: e.target.value } : n))}
                            className="w-full h-full bg-transparent resize-none outline-none font-medium text-xl leading-relaxed placeholder-[#3e2723]/40 whitespace-pre-wrap relative z-0"
                            placeholder="Type your note here..."
                            autoFocus
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'Context' && (
              <motion.div key="context" variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col gap-6 p-6 md:p-8 overflow-y-auto ${glassPanel}`}>
                <StylesManager 
                  currentMode={mode || 'Professional'} 
                  setMode={setMode}
                />
              </motion.div>
            )}
          
                        {activeTab === 'Shortcuts' && (
              <motion.div key="shortcuts" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-4 flex gap-4">
                <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto">
                  <div className="px-2 mt-4">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Keyboard Shortcuts</h1>
                    <p className="text-white/50 text-sm">Customize how you interact with WhisPURR via your keyboard.</p>
                  </div>
                  
                  <div className={`mt-4 ${glassPanel} p-8 flex flex-col gap-6`}>
                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Talk to WhisPURR</span>
                        <span className="text-[15px] text-white/50">Hold this key to transcribe your words into text</span>
                      </div>
                      <button 
                        onClick={() => setIsRecordingShortcut(true)}
                        className={`min-w-[120px] px-6 py-4 rounded-xl border-2 font-mono text-base tracking-wider font-bold transition-all shadow-md ${
                          isRecordingShortcut 
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500 animate-pulse' 
                            : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:border-orange-500/50 hover:bg-[#222]'
                        }`}
                      >
                        {isRecordingShortcut ? 'Press a key...' : talkShortcut}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Quicklaunch</span>
                        <span className="text-[15px] text-white/50">Double tap this key to open or close WhisPURR</span>
                      </div>
                      <button 
                        onClick={() => setIsRecordingQuicklaunch(true)}
                        className={`min-w-[120px] px-6 py-4 rounded-xl border-2 font-mono text-base tracking-wider font-bold transition-all shadow-md ${
                          isRecordingQuicklaunch 
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500 animate-pulse' 
                            : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:border-orange-500/50 hover:bg-[#222]'
                        }`}
                      >
                        {isRecordingQuicklaunch ? 'Press a key...' : quicklaunchShortcut}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pb-6 border-b border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Quick Edit</span>
                        <span className="text-[15px] text-white/50">Edits the last sentence you typed</span>
                      </div>
                      <button 
                        onClick={() => setIsRecordingQuickEdit(true)}
                        className={`min-w-[120px] px-6 py-4 rounded-xl border-2 font-mono text-base tracking-wider font-bold transition-all shadow-md ${
                          isRecordingQuickEdit 
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500 animate-pulse' 
                            : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:border-orange-500/50 hover:bg-[#222]'
                        }`}
                      >
                        {isRecordingQuickEdit ? 'Press combo...' : quickEditShortcut}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xl font-bold text-white tracking-tight">Seamless Switch</span>
                        <span className="text-[15px] text-white/50">Easily switch between contexts/modes without ever having to open the app</span>
                        <span className="text-xs text-orange-400 font-mono mt-1 uppercase tracking-widest">Shortcut: Arrow Up/Down & Mouse Scroll</span>
                      </div>
                      <button 
                        onClick={() => {
                          const next = !isSeamlessSwitchEnabled;
                          setIsSeamlessSwitchEnabled(next);
                          localStorage.setItem('whispurr_seamless_switch', String(next));
                        }}
                        className={`relative w-[68px] h-[36px] rounded-full transition-colors shadow-inner ${
                          isSeamlessSwitchEnabled ? 'bg-orange-500' : 'bg-white/10'
                        }`}
                      >
                        <div className={`absolute top-1 bottom-1 w-7 bg-white rounded-full transition-transform shadow-md ${
                          isSeamlessSwitchEnabled ? 'left-[36px]' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Theme' && (
              <motion.div key="theme" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-4 flex gap-4">
                <div className="flex-1 flex flex-col gap-6 max-w-4xl mx-auto">
                  <div className="px-2 mt-4">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Appearance</h1>
                    <p className="text-white/50 text-sm">Customize the look and feel of your WhisPURR interface.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div 
                      onClick={() => setCurrentTheme('midnight')}
                      className={`flex flex-col rounded-2xl border p-2 cursor-pointer transition-all ${currentTheme === 'midnight' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-[#0f0f0f] hover:border-white/30'}`}
                    >
                      <div className="h-40 rounded-xl bg-black border border-white/10 mb-4 flex items-center justify-center overflow-hidden relative">
                         <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                           <LayoutTemplate className="w-8 h-8 text-orange-500" />
                         </div>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="text-lg font-bold text-white mb-1">Dark Choco</div>
                        <div className="text-sm text-white/50">Deep chocolate tones for a rich, focused environment.</div>
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => setCurrentTheme('coffee')}
                      className={`flex flex-col rounded-2xl border p-2 cursor-pointer transition-all ${currentTheme === 'coffee' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-[#0f0f0f] hover:border-white/30'}`}
                    >
                      <div className="h-40 rounded-xl bg-[#f4ece1] border border-white/10 mb-4 flex items-center justify-center overflow-hidden relative">
                         <div className="w-16 h-16 rounded-full bg-[#8d6e63]/20 flex items-center justify-center">
                           <LayoutTemplate className="w-8 h-8 text-[#8d6e63]" />
                         </div>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="text-lg font-bold text-white mb-1">Coffee Brown</div>
                        <div className="text-sm text-white/50">Warm beige and rich browns for a softer, organic reading experience.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'Tutorial' && (
              <motion.div key="tutorial-tab" variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col items-center justify-center gap-6 p-8 ${glassPanel}`}>
                <div className="w-24 h-24 bg-[#5d4037]/10 rounded-full flex items-center justify-center shadow-inner border border-[#5d4037]/20 mb-2">
                  <PlayCircle className="w-12 h-12 text-white/90" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">WhisPURR Tutorial</h1>
                <p className="text-white/80 text-center max-w-md text-lg mb-4 font-medium">
                  Need a refresher? Replay the interactive setup tutorial to learn about WhisPURR's features, shortcuts, and context modes.
                </p>
                <button
                  onClick={() => setShowTutorial(true)}
                  className="px-8 py-3 bg-gradient-to-r from-[#8d6e63] to-[#6d4c41] hover:from-[#795548] hover:to-[#5d4037] text-[#f4ece1] font-bold rounded-2xl flex items-center gap-3 transition-all shadow-[0_4px_20px_rgba(141,110,99,0.4)] hover:shadow-[0_6px_25px_rgba(141,110,99,0.6)] hover:-translate-y-0.5 border border-[#a1887f]/50"
                >
                  <PlayCircle className="w-5 h-5" />
                  Replay Tutorial
                </button>
              </motion.div>
            )}

            {!['Home', 'History', 'Dictionary', 'ShortHand', 'ScratchPad', 'Context', 'Theme', 'Tutorial', 'Shortcuts'].includes(activeTab) && (
              <motion.div key="fallback" style={{ willChange: "transform, opacity, filter" }} variants={tabVariants} initial="initial" animate="animate" exit="exit" className={`absolute inset-4 flex flex-col items-center justify-center gap-4 p-8 ${glassPanel}`}>
                <Settings className="w-16 h-16 text-white/10" />
                <h1 className="text-2xl font-bold text-white/50">{activeTab}</h1>
                <p className="text-white/30 text-sm">This section is currently under construction.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tutorial Overlay */}
        <AnimatePresence>
          {showTutorial && <Tutorial onComplete={() => { setShowTutorial(false); hasShownTutorialThisSession = true; setIsTourActive(true); }} />}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}








