import React, { useState, useEffect } from 'react';
import { Mail, Terminal, Sparkles, X, Minimize2, Maximize2, Minus, Wifi, Bird } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AppType = 'email' | 'vscode' | 'ai' | 'kivi' | null;

export default function MockOS({ activeText }: { activeText: string }) {
  const [openApp, setOpenApp] = useState<AppType>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  // Local state for native typing
  const [emailText, setEmailText] = useState('');
  const [vscodeText, setVscodeText] = useState('');
  const [aiText, setAiText] = useState('');

  // Append Kivi's translated text to the currently open app
  useEffect(() => {
    if (activeText && openApp) {
      if (openApp === 'email') setEmailText(prev => prev + (prev ? '\n' : '') + activeText);
      if (openApp === 'vscode') setVscodeText(prev => prev + (prev ? '\n' : '') + activeText);
      if (openApp === 'ai') setAiText(prev => prev + (prev ? ' ' : '') + activeText);
    }
  }, [activeText, openApp]);

  return (
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Desktop Icons - Top Left */}
      <div className="absolute top-4 left-4 flex flex-col gap-6 p-4 z-10">
        
        {/* Email Icon */}
        <div 
          onClick={() => setOpenApp('email')}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
            <Mail className="w-6 h-6 text-blue-100" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md bg-black/20 px-1 rounded">Outlook</span>
        </div>

        {/* VS Code Icon */}
        <div 
          onClick={() => setOpenApp('vscode')}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-sky-600/20 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-sky-600/40 transition-colors">
            <Terminal className="w-6 h-6 text-sky-200" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md bg-black/20 px-1 rounded">VS Code</span>
        </div>

        {/* Antigravity AI Icon */}
        <div 
          onClick={() => setOpenApp('ai')}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-600/20 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-purple-600/40 transition-colors">
            <Sparkles className="w-6 h-6 text-purple-200" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md bg-black/20 px-1 rounded">Antigravity</span>
        </div>

        {/* Kivi App Icon */}
        <div 
          onClick={() => setOpenApp('kivi')}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-emerald-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
            <Bird className="w-6 h-6 text-emerald-200" />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md bg-black/20 px-1 rounded">Kivi Settings</span>
        </div>
        
      </div>

      {/* Glassmorphism Start Menu */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[60] flex flex-col p-6"
          >
            {/* Search Bar */}
            <div className="w-full bg-black/30 border border-white/10 rounded-full px-4 py-3 mb-8 flex items-center text-white/50 shadow-inner">
              <span className="text-sm">Search for apps, settings, and documents</span>
            </div>
            
            <h3 className="text-white text-sm font-semibold mb-4 pl-2">Pinned</h3>
            <div className="grid grid-cols-5 gap-6 pl-2">
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all" onClick={() => { setOpenApp('email'); setIsStartMenuOpen(false); }}>
                <Mail className="w-8 h-8 text-blue-400 drop-shadow-md" />
                <span className="text-white text-xs">Outlook</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all" onClick={() => { setOpenApp('vscode'); setIsStartMenuOpen(false); }}>
                <Terminal className="w-8 h-8 text-sky-400 drop-shadow-md" />
                <span className="text-white text-xs">VS Code</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all" onClick={() => { setOpenApp('ai'); setIsStartMenuOpen(false); }}>
                <Sparkles className="w-8 h-8 text-purple-400 drop-shadow-md" />
                <span className="text-white text-xs">Antigravity</span>
              </div>
              <div className="flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-xl transition-all" onClick={() => { setOpenApp('kivi'); setIsStartMenuOpen(false); }}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Bird className="w-5 h-5 text-emerald-400 drop-shadow-md" />
                </div>
                <span className="text-white text-xs">Kivi Settings</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows 11 Taskbar Mock */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-4 z-[70]">
         
         {/* Left Spacer */}
         <div className="w-48"></div>

         {/* Center: Start and Apps */}
         <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div 
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
              className="w-8 h-8 rounded bg-blue-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer hover:bg-blue-400 transition-colors"
            >
               <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
               </div>
            </div>
            
            {/* Taskbar Indicators */}
            <div 
               onClick={() => openApp !== 'email' && setOpenApp('email')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'email' ? 'bg-white/10 border-b-2 border-blue-400' : 'hover:bg-white/10'}`}
            >
               <Mail className="w-5 h-5 text-white" />
            </div>
            <div 
               onClick={() => openApp !== 'vscode' && setOpenApp('vscode')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'vscode' ? 'bg-white/10 border-b-2 border-blue-400' : 'hover:bg-white/10'}`}
            >
               <Terminal className="w-5 h-5 text-sky-300" />
            </div>
            <div 
               onClick={() => openApp !== 'ai' && setOpenApp('ai')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'ai' ? 'bg-white/10 border-b-2 border-purple-400' : 'hover:bg-white/10'}`}
            >
               <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div 
               onClick={() => openApp !== 'kivi' && setOpenApp('kivi')}
               className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openApp === 'kivi' ? 'bg-white/10 border-b-2 border-emerald-400' : 'hover:bg-white/10'}`}
            >
               <Bird className="w-5 h-5 text-emerald-400" />
            </div>
         </div>

         {/* Right: System Tray */}
         <div className="flex items-center gap-3 text-white w-48 justify-end cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">
            <Wifi className="w-4 h-4" />
            <div className="flex flex-col items-end leading-tight text-xs font-medium">
               <span>10:42 AM</span>
               <span>9/3/2026</span>
            </div>
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
            className="absolute inset-0 z-40 bg-neutral-900 flex flex-col"
            style={{ height: 'calc(100vh - 48px)' }}
          >
            {/* Standard Window Title Bar */}
            <div className="h-10 bg-black/60 flex items-center justify-between px-4 select-none">
              <div className="flex items-center gap-2 text-white/70 text-xs font-medium">
                {openApp === 'email' && <><Mail className="w-4 h-4"/> Outlook</>}
                {openApp === 'vscode' && <><Terminal className="w-4 h-4"/> VS Code</>}
                {openApp === 'ai' && <><Sparkles className="w-4 h-4"/> Antigravity Canvas</>}
                {openApp === 'kivi' && <><Bird className="w-4 h-4 text-emerald-400"/> Kivi Control Panel</>}
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
                        className="flex-1 w-full bg-transparent resize-none outline-none text-emerald-700 font-medium placeholder-gray-400"
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

              {openApp === 'kivi' && (
                <div className="flex flex-col h-full bg-[#0a0a0a] text-white p-12">
                  <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
                    <h1 className="text-3xl font-bold flex items-center gap-4 mb-8 text-emerald-50">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <Bird className="w-7 h-7 text-emerald-400" /> 
                      </div>
                      Kivi Control Panel
                    </h1>
                    
                    <div className="flex-1 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></div>
                        <h2 className="text-xl font-semibold text-emerald-50">Translation Layer Active</h2>
                      </div>
                      
                      <p className="text-white/50 mb-10 text-lg leading-relaxed">
                        Kivi is currently running seamlessly as an invisible translation overlay on your system. 
                        It has hooked into your global keyboard events. Simply hold <kbd className="px-2 py-1 mx-1 bg-white/10 rounded border border-white/20 text-white">Alt</kbd> in any application to dictate and drop formatted text.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                          <div>
                            <div className="font-medium text-white mb-1">Microphone Input</div>
                            <div className="text-sm text-white/50">Listening via built-in Web Speech API</div>
                          </div>
                          <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                        </div>
                        
                        <div className="flex justify-between items-center p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                          <div>
                            <div className="font-medium text-white mb-1">Neural Engine</div>
                            <div className="text-sm text-white/50">Gemini 3.7 Flash Architecture</div>
                          </div>
                          <div className="text-emerald-400 text-sm font-medium tracking-wide uppercase flex items-center gap-2">
                            <Wifi className="w-4 h-4" /> Connected
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                          <div>
                            <div className="font-medium text-white mb-1">Auto-Drop Integration</div>
                            <div className="text-sm text-white/50">Directly injects output into focused inputs</div>
                          </div>
                          <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
