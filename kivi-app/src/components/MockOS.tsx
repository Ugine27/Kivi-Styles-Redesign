import { useState, useEffect, memo } from 'react';
import { Mail, Terminal, Sparkles, X, Minus, Wifi, Cat, Type, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhispurrApp from './WhispurrApp';

type AppType = 'email' | 'vscode' | 'ai' | 'whispurr' | null;

const MockOS = memo(({ activeText, mode, setMode, degree, setDegree, isAltPressed, isLoading, toggleListening }: { activeText: string, mode?: string, setMode?: any, degree?: number, setDegree?: any, isAltPressed?: boolean, isLoading?: boolean, toggleListening?: any }) => {
  const [openApp, setOpenApp] = useState<AppType>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  // Floating Strip State
  const [isHovered, setIsHovered] = useState(false);
  const [activePopup, setActivePopup] = useState<'styles' | null>(null);

  // Local state for native typing
  const [emailText, setEmailText] = useState('');
  const [vscodeText, setVscodeText] = useState('');
  const [aiText, setAiText] = useState('');

  // Auto open Notes (from the Alt+Scroll workflow)
  useEffect(() => {
    if (mode === 'Notes' && !isAltPressed) {
      setOpenApp('whispurr');
    }
  }, [mode, isAltPressed]);

  // Append whispurr's translated text to the currently open app
  useEffect(() => {
    if (activeText && openApp) {
      if (openApp === 'email') setEmailText(prev => prev + (prev ? '\n' : '') + activeText);
      if (openApp === 'vscode') setVscodeText(prev => prev + (prev ? '\n' : '') + activeText);
      if (openApp === 'ai') setAiText(prev => prev + (prev ? ' ' : '') + activeText);
    }
  }, [activeText, openApp]);

  const CurrentAppIcon = () => {
    if (openApp === 'email') return <Mail className="w-4 h-4 text-blue-300" />;
    if (openApp === 'vscode') return <Terminal className="w-4 h-4 text-blue-500" />;
    if (openApp === 'ai') return <Sparkles className="w-4 h-4 text-purple-300" />;
    if (openApp === 'whispurr') return <Cat className="w-4 h-4 text-orange-400" />;
    return <div className="w-4 h-4 border border-white/20 rounded-sm border-dashed" />;
  };

  return (
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" />

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-4 z-50">
         <div className="w-48">
            <div 
               className="w-10 h-10 hover:bg-white/10 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
               onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            >
               <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
               </div>
            </div>
            
            <AnimatePresence>
               {isStartMenuOpen && (
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     className="absolute bottom-14 left-4 w-64 glass-dark rounded-xl border border-white/10 p-4 shadow-2xl flex flex-col gap-2"
                  >
                     <div className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Pinned Apps</div>
                     <div className="flex items-center gap-3 text-white hover:bg-white/10 p-2 rounded cursor-pointer" onClick={() => {setOpenApp('whispurr'); setIsStartMenuOpen(false);}}>
                        <Cat className="w-5 h-5 text-orange-400" />
                        <span className="font-medium text-sm">WhisPURR Settings</span>
                     </div>
                     <div className="flex items-center gap-3 text-white hover:bg-white/10 p-2 rounded cursor-pointer" onClick={() => {setOpenApp('ai'); setIsStartMenuOpen(false);}}>
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="font-medium text-sm">Antigravity AI</span>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         <div className="flex items-center gap-2">
            <div 
               onClick={() => openApp !== 'email' && setOpenApp('email')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'email' ? 'bg-white/10 border-b-2 border-blue-400' : 'hover:bg-white/10'}`}
            >
               <Mail className="w-5 h-5 text-blue-300" />
            </div>
            <div 
               onClick={() => openApp !== 'vscode' && setOpenApp('vscode')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'vscode' ? 'bg-white/10 border-b-2 border-blue-600' : 'hover:bg-white/10'}`}
            >
               <Terminal className="w-5 h-5 text-blue-500" />
            </div>
            <div 
               onClick={() => openApp !== 'ai' && setOpenApp('ai')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'ai' ? 'bg-white/10 border-b-2 border-purple-400' : 'hover:bg-white/10'}`}
            >
               <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div 
               onClick={() => openApp !== 'whispurr' && setOpenApp('whispurr')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'whispurr' ? 'bg-white/10 border-b-2 border-orange-400' : 'hover:bg-white/10'}`}
            >
               <Cat className="w-5 h-5 text-orange-400" />
            </div>
         </div>

         <div className="flex items-center gap-3 text-white w-48 justify-end cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">
            <Wifi className="w-4 h-4" />
            <div className="flex flex-col items-end leading-tight text-xs font-medium">
               <span>10:42 AM</span>
               <span>9/3/2026</span>
            </div>
         </div>
      </div>

            {/* NEW RADIAL KIVI CONTROL STRIP */}
      <div 
        className={`absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-[80] w-64 h-64 flex items-center justify-center rounded-full ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onMouseLeave={() => { setIsHovered(false); setActivePopup(null); }}
      >
        <div 
          className="relative w-32 h-32 flex items-center justify-center rounded-full pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
        >
          {/* Subtle Hover Glow Backdrop */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-[-20px] bg-white/[0.02] rounded-full backdrop-blur-md border border-white/5 shadow-2xl"
              />
            )}
          </AnimatePresence>

          {/* Central Cat */}
          <div 
            onClick={(e) => { 
              if (e.detail === 1 && toggleListening) toggleListening(); 
              if (e.detail === 2) setOpenApp('whispurr'); 
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl relative z-10 ${
              isAltPressed || isLoading 
                ? 'bg-black/90 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-110'
                : 'bg-gradient-to-br from-[#2a2a2a] to-[#111] hover:from-[#333] hover:to-[#1a1a1a] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
            }`}
          >
            <Cat className={`text-gray-300 transition-all duration-500 ${
              isLoading ? 'w-4 h-4 animate-pulse text-white' : (isAltPressed ? 'w-4 h-4 text-white' : 'w-4 h-4 opacity-80')
            }`} />
          </div>

          <AnimatePresence>
            {isHovered && (
              <>
                {/* App Icon Satellite (Top Left) */}
                <motion.div 
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: -60, y: -30, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0 }}
                  className="absolute w-9 h-9 rounded-full bg-[#1e1e1e] border border-white/10 shadow-xl flex items-center justify-center z-20"
                >
                  <CurrentAppIcon />
                </motion.div>
                
                {/* Styles Satellite (Top Center) */}
                <motion.div 
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, y: -65, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.05 }}
                  onClick={() => setActivePopup(activePopup === 'styles' ? null : 'styles')}
                  className={`absolute w-9 h-9 rounded-full border shadow-xl flex items-center justify-center cursor-pointer transition-colors z-20 ${
                    activePopup === 'styles' ? 'bg-white/20 border-white/30 text-white' : 'bg-[#1e1e1e] border-white/10 text-white/60 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Type className="w-4 h-4" />
                  
                  <AnimatePresence>
                    {activePopup === 'styles' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-[#1A1A1A]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 w-40 shadow-2xl flex flex-col gap-1 z-30"
                      >
                        {(['Casual', 'Professional', 'Concise'] as const).map(s => (
                          <div 
                            key={s}
                            onClick={(e) => { e.stopPropagation(); if(setMode) setMode(s as any); setActivePopup(null); }}
                            className={`px-3 py-2 text-sm rounded-xl cursor-pointer flex items-center gap-2 transition-colors ${mode === s ? 'bg-white/10 text-white font-medium' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                          >
                            {s}
                          </div>
                        ))}
                        <div className="flex bg-white/5 p-1 rounded-lg mt-1 border border-white/5">
                          <div onClick={(e) => { e.stopPropagation(); if(setDegree) setDegree(1); setActivePopup(null); }} className={`flex-1 text-center text-xs py-1.5 rounded-md cursor-pointer transition-colors ${degree === 1 ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>Roman</div>
                          <div onClick={(e) => { e.stopPropagation(); if(setDegree) setDegree(2); setActivePopup(null); }} className={`flex-1 text-center text-xs py-1.5 rounded-md cursor-pointer transition-colors ${degree === 2 ? 'bg-white/20 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>Native</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Meeting Notes Satellite (Top Right) */}
                <motion.div 
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: 60, y: -30, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                  onClick={() => { if(setMode) setMode('Meeting Notes' as any); if(toggleListening) toggleListening(); }}
                  className="absolute w-9 h-9 rounded-full bg-[#1e1e1e] border border-white/10 shadow-xl flex items-center justify-center cursor-pointer hover:bg-white/15 text-white/60 hover:text-white transition-colors z-20"
                >
                  <FileText className="w-4 h-4" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FULL SCREEN APPS */}
      <AnimatePresence>
        {openApp && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 z-40 bg-[#1e1e1e] flex flex-col"
            style={{ height: 'calc(100vh - 48px)' }}
          >
            {/* Standard Window Title Bar */}
            <div className="h-10 bg-black/40 flex items-center justify-between px-4 select-none">
              <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
                {openApp === 'email' && <><Mail className="w-4 h-4"/> Outlook</>}
                {openApp === 'vscode' && <><Terminal className="w-4 h-4"/> VS Code</>}
                {openApp === 'ai' && <><Sparkles className="w-4 h-4"/> Antigravity Canvas</>}
                {openApp === 'whispurr' && <><Cat className="w-4 h-4 text-orange-400"/> Kivi Dashboard</>}
              </div>
              <div className="flex items-center gap-4 text-white/50">
                <Minus 
                  className="w-4 h-4 cursor-pointer hover:text-white transition-colors" 
                  onClick={() => setOpenApp(null)} 
                />
                <X 
                  className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" 
                  onClick={() => setOpenApp(null)}
                />
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-hidden">
              {openApp === 'email' && (
                <div className="flex h-full bg-white text-black">
                  <div className="w-64 border-r border-gray-200 p-4 bg-gray-50 flex flex-col gap-2">
                    <div className="font-bold text-gray-700 mb-2">Folders</div>
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Inbox</div>
                    <div className="text-sm hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Sent Items</div>
                    <div className="text-sm hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">Drafts</div>
                  </div>
                  <div className="flex-1 p-8 flex flex-col gap-4 font-serif">
                    <h1 className="text-2xl font-semibold border-b pb-4">Daily Comms Update</h1>
                    <div className="flex-1 text-gray-800 leading-relaxed text-lg flex flex-col">
                      <p className="mb-4">Hi Team,</p>
                      <p className="mb-4">Just wanted to provide a quick update on the latest deployment. Everything is looking stable.</p>
                      <textarea 
                        className="flex-1 w-full bg-transparent resize-none outline-none text-orange-700 font-medium placeholder-gray-400"
                        placeholder="Type your message here..."
                        value={emailText}
                        onChange={e => setEmailText(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              )}

              {openApp === 'vscode' && (
                <div className="flex h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
                  <div className="w-64 border-r border-[#333] p-4 bg-[#252526]">
                    <div className="text-xs font-bold tracking-wider text-gray-400 mb-4">EXPLORER</div>
                    <div className="text-blue-400 hover:text-blue-300 cursor-pointer">backend.ts</div>
                    <div className="text-gray-400 hover:text-gray-300 cursor-pointer mt-2">utils.ts</div>
                    <div className="text-gray-400 hover:text-gray-300 cursor-pointer mt-2">server.ts</div>
                  </div>
                  <div className="flex-1 p-6 leading-loose">
                    <p><span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">Server</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'infrastructure'</span>;</p>
                    <br/>
                    <p><span className="text-[#c586c0]">async function</span> <span className="text-[#dcdcaa]">main</span>() {'{'}</p>
                    <p className="pl-4 text-[#6a9955]">// Initialize system</p>
                    <p className="pl-4">const server = new Server();</p>
                    <br/>
                    <p className="pl-4 text-[#6a9955]">// TODO: Implement fix</p>
                    <div className="pl-4 flex">
                       <input 
                         type="text" 
                         className="flex-1 bg-transparent outline-none text-[#4ec9b0] placeholder-[#6a9955]/50"
                         placeholder="type your code..."
                         value={vscodeText}
                         onChange={e => setVscodeText(e.target.value)}
                         spellCheck={false}
                         autoFocus
                       />
                    </div>
                    <p>{'}'}</p>
                  </div>
                </div>
              )}

              {openApp === 'ai' && (
                <div className="flex flex-col h-full bg-slate-950 items-center justify-center relative">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-purple-500/50 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-2">Antigravity AI</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Hold <kbd className="px-2 py-1 bg-white/10 rounded-md text-white/80 mx-1 border border-white/20">Alt</kbd> anywhere in the OS to invoke Kivi and translate your speech.
                    </p>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl bg-white/5 border border-white/10 rounded-xl p-4 flex items-center shadow-2xl focus-within:border-purple-500/50 transition-colors">
                    <input 
                      type="text" 
                      className="flex-1 bg-transparent outline-none text-white placeholder-white/30 text-lg"
                      placeholder="Ask Antigravity anything..."
                      value={aiText}
                      onChange={e => setAiText(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {openApp === 'whispurr' && <WhispurrApp mode={mode} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default MockOS;
