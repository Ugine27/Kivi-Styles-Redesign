import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Terminal, Briefcase, MessageCircle, Mail, ChevronRight, ChevronLeft, Check, Compass, Globe, Sparkles, Plus, ChevronUp, ChevronDown } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [slide, setSlide] = useState(0);
  const totalSlides = 10;

  const nextSlide = useCallback(() => {
    if (slide < totalSlides - 1) {
      setSlide(s => s + 1);
    }
  }, [slide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (slide > 0) {
      setSlide(s => s - 1);
    }
  }, [slide]);

  // Global Keyboard navigation: Left/Right Arrow, Space, Enter, Backspace, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (slide < totalSlides - 1) {
          nextSlide();
        } else if (e.key === 'Enter' || e.key === ' ') {
          onComplete();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide, totalSlides, nextSlide, prevSlide, onComplete]);

  const tutorialContent = (
    <div className="fixed inset-0 z-[9999] bg-[#fcf9f5] text-[#2b1f1a] flex flex-col justify-between overflow-hidden font-sans select-none">
      {/* Radiant Atmospheric Aura Glows */}
      <div className="absolute top-[-12%] left-[-8%] w-[600px] h-[600px] rounded-full bg-sky-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-6%] right-[-6%] w-[520px] h-[520px] rounded-full bg-coral-400/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[18%] w-[480px] h-[480px] rounded-full bg-sunshine-300/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-8%] right-[-5%] w-[520px] h-[520px] rounded-full bg-lavender-400/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[38%] left-[42%] w-[420px] h-[420px] rounded-full bg-mint-400/15 blur-[130px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 pt-7 pb-4 z-10">
        <button 
          onClick={onComplete}
          className="bg-white/80 hover:bg-white text-[#2b1f1a] hover:text-coral-600 px-4 py-1.5 rounded-full border border-black/5 hover:border-coral-300 shadow-xs transition-all text-xs font-mono font-bold flex items-center gap-2 cursor-pointer backdrop-blur-md"
          title="Skip tutorial (Esc)"
        >
          <span>skip</span>
          <span className="text-[10px] text-[#2b1f1a]/50 font-sans font-normal">[Esc]</span>
        </button>

        {/* Keyboard navigation hint */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#2b1f1a]/70 bg-white/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-sky-200/70 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>Navigate with</span>
          <kbd className="px-2 py-0.5 bg-white rounded-md border border-sky-300 shadow-xs text-sky-800 font-bold">←</kbd>
          <kbd className="px-2 py-0.5 bg-white rounded-md border border-sky-300 shadow-xs text-sky-800 font-bold">→</kbd>
          <span>or</span>
          <kbd className="px-2.5 py-0.5 bg-white rounded-md border border-sky-300 shadow-xs text-sky-800 font-bold">Space</kbd>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/5 text-sky-900 font-mono text-xs font-bold shadow-xs">
          <span className="text-sky-600">{String(slide + 1).padStart(2, '0')}</span>
          <span className="opacity-40 mx-1">/</span>
          <span>{String(totalSlides).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-16 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-5xl"
          >
            {renderSlideContent(slide, onComplete)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-3 flex items-center justify-center z-20 pointer-events-none">
        {slide > 0 && (
          <button 
            onClick={prevSlide}
            className="pointer-events-auto p-2 text-[#2b1f1a]/60 hover:text-sky-600 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl border border-sky-200/80 transition-all flex flex-col items-center group cursor-pointer shadow-sm hover:shadow-md"
            title="Previous slide (← or Backspace)"
          >
            <ChevronLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform text-sky-600" />
            <span className="text-[9px] font-mono tracking-wider opacity-75 group-hover:opacity-100 transition-opacity text-sky-800">
              ← Left
            </span>
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-3 flex items-center justify-center z-20 pointer-events-none">
        {slide < totalSlides - 1 && (
          <button 
            onClick={nextSlide}
            className="pointer-events-auto p-2 text-[#2b1f1a]/60 hover:text-sky-600 bg-white/80 hover:bg-white backdrop-blur-md rounded-xl border border-sky-200/80 transition-all flex flex-col items-center group cursor-pointer shadow-sm hover:shadow-md"
            title="Next slide (→, Space, or Enter)"
          >
            <ChevronRight size={22} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform text-sky-600" />
            <span className="text-[9px] font-mono tracking-wider opacity-75 group-hover:opacity-100 transition-opacity text-sky-800">
              Right →
            </span>
          </button>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2.5 pb-8 z-10">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i} 
            onClick={() => setSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === slide 
                ? 'w-10 bg-gradient-to-r from-sky-400 via-indigo-500 to-coral-400 shadow-sm' 
                : 'w-2.5 bg-[#2b1f1a]/15 hover:bg-sky-400/50'
            }`}
            title={`Jump to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return createPortal(tutorialContent, document.body);
}

function renderSlideContent(index: number, onComplete: () => void) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col items-start justify-center -mt-6 max-w-4xl text-left relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-700 text-xs font-sans font-bold uppercase tracking-wider mb-5 shadow-xs backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Next-Gen Mac Voice Assistant</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>

          <h1 className="text-6xl sm:text-7xl font-serif font-medium tracking-tight mb-6 text-[#2b1f1a]">
            Meet <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 gradient-text font-bold">WhisPURR.</span>
          </h1>

          <div className="relative pl-7 ml-1 py-1">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-500 via-coral-400 to-sunshine-400 rounded-full shadow-xs" />
            <p className="text-2xl sm:text-3xl text-[#3e2723] font-serif italic mb-5 leading-snug">
              Your thoughts, seamlessly translated into work.
            </p>
            <p className="text-lg sm:text-xl text-[#2b1f1a]/75 font-sans mb-8 leading-relaxed max-w-2xl font-normal">
              WhisPURR stays quietly in the background as you move between applications and modes. Speak naturally, and it automatically shapes your words to where you are.
            </p>
            
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sunshine-100 text-amber-900 border border-sunshine-300 text-sm font-sans font-bold shadow-xs">
                ⚡ Fast
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-sm font-sans font-bold shadow-xs">
                🌊 Flexible
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-mint-100 text-emerald-900 border border-mint-300 text-sm font-sans font-bold shadow-xs">
                🕊️ Quietly There
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-lavender-100 text-purple-900 border border-lavender-300 text-sm font-sans font-bold shadow-xs">
                ✨ Emotion Moods
              </span>
            </div>
          </div>

          <div className="mt-12 self-center relative group">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-sky-400 via-coral-400 to-sunshine-400 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl bg-white/95">
              <img src="/kivi_icon.png" className="w-full h-full object-cover" alt="WhisPURR Icon" />
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col items-center justify-center -mt-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-500/10 border border-coral-500/25 text-coral-700 text-xs font-sans font-bold uppercase tracking-wider mb-4 shadow-xs backdrop-blur-md">
            <span>🎙️ Real-Time Dictation</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-serif font-medium tracking-tight mb-4 text-[#2b1f1a] flex items-center justify-center gap-3.5 flex-wrap">
            <span>Hold</span>
            <span className="px-6 py-2 bg-gradient-to-b from-sky-500 to-blue-600 text-white rounded-2xl text-4xl sm:text-5xl font-sans font-bold shadow-[0_8px_25px_rgba(2,132,199,0.35)] border border-sky-400/50">
              Alt
            </span>
            <span>to Speak.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#3e2723]/75 font-serif italic mb-8 max-w-xl leading-relaxed">
            - press and hold to speak. WhisPURR opens a bottom floating dialogue, transcribing in real-time, and automatically types directly into your active app or lets you copy.
          </p>

          {/* Interactive Mic Visualization with Audio Rings */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute w-44 h-44 rounded-full bg-sky-400/25 animate-ping opacity-35 pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full bg-coral-400/20 blur-md pointer-events-none" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 border-4 border-white shadow-[0_10px_35px_rgba(2,132,199,0.35)]">
              <Mic size={40} className="text-white animate-pulse" />
            </div>
          </div>

          {/* Floating Dialogue HUD Mockup Preview */}
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-sky-200/80 shadow-[0_12px_40px_rgba(2,132,199,0.12)] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs border-b border-black/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-sky-900 uppercase tracking-wider text-[11px]">Floating Speech Dialogue</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-mono font-bold">Auto-Typing Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 h-6 px-2.5 bg-sky-50 rounded-lg border border-sky-200">
                <span className="w-1 h-3 bg-sky-500 rounded-full animate-bounce" />
                <span className="w-1 h-5 bg-coral-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1 h-2 bg-sunshine-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                <span className="w-1 h-4 bg-mint-500 rounded-full animate-bounce [animation-delay:0.45s]" />
              </div>
              <p className="text-sm text-[#2b1f1a] font-sans font-medium text-left truncate flex-1">
                "Draft an update for the team summarizing our new launch timeline..."
              </p>
              <span className="px-3 py-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold rounded-lg shadow-xs">
                Copy
              </span>
            </div>
          </div>
        </div>
      );
    case 2:
      return <RadialDialsDemoSlide />;
    case 3:
      return (
        <div className="flex flex-col items-center justify-center -mt-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-500/10 border border-coral-500/25 text-coral-700 text-xs font-sans font-bold uppercase tracking-wider mb-4 shadow-xs backdrop-blur-md">
            <span>⚡ Desktop Shortcuts</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-serif font-medium tracking-tight mb-4 text-[#2b1f1a]">
            Pick Your <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 gradient-text font-bold">Paws.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#3e2723]/75 font-serif italic mb-10 max-w-2xl leading-relaxed">
            - customize the shortcuts you'll use to trigger dictation and radial dials every day.
          </p>

          <p className="text-xs font-bold text-[#2b1f1a]/50 uppercase tracking-widest mb-6">Active desktop shortcuts</p>

          <div className="flex flex-wrap gap-6 justify-center w-full">
            {/* Hold to Talk */}
            <div className="flex-1 min-w-[220px] max-w-[280px] px-7 py-6 bg-gradient-to-b from-sky-50 to-blue-100/50 border-2 border-sky-400 rounded-3xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-sky-500/15 transition-all shadow-md">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-3 bg-sky-200/60 px-3 py-1 rounded-full">
                🎙️ Hold to Talk
              </span>
              <span className="text-4xl font-sans font-black text-sky-950 bg-white px-6 py-2 rounded-2xl border-2 border-sky-200 shadow-sm mb-2">
                Alt
              </span>
              <span className="text-xs text-sky-900/70 font-sans font-medium">Instant Voice Typing</span>
            </div>

            {/* Mode Dial */}
            <div className="flex-1 min-w-[220px] max-w-[280px] px-7 py-6 bg-gradient-to-b from-coral-50 to-rose-100/50 border-2 border-coral-400 rounded-3xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-coral-500/15 transition-all shadow-md">
              <span className="text-xs font-bold text-coral-800 uppercase tracking-wider mb-3 bg-coral-200/60 px-3 py-1 rounded-full">
                🧭 Mode Dial
              </span>
              <span className="text-2xl font-sans font-black text-coral-950 bg-white px-5 py-3 rounded-2xl border-2 border-coral-200 shadow-sm mb-2 whitespace-nowrap">
                Alt + Scroll
              </span>
              <span className="text-xs text-coral-900/70 font-sans font-medium">Spin 8 Tone Profiles</span>
            </div>

            {/* Language Dial */}
            <div className="flex-1 min-w-[220px] max-w-[280px] px-7 py-6 bg-gradient-to-b from-mint-50 to-teal-100/50 border-2 border-teal-400 rounded-3xl flex flex-col items-center cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-teal-500/15 transition-all shadow-md">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-3 bg-mint-200/60 px-3 py-1 rounded-full">
                🌐 Language Dial
              </span>
              <span className="text-2xl font-sans font-black text-teal-950 bg-white px-4 py-3 rounded-2xl border-2 border-teal-200 shadow-sm mb-2 whitespace-nowrap">
                Alt + Right Click
              </span>
              <span className="text-xs text-teal-900/70 font-sans font-medium">Switch 10 Languages</span>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center justify-center -mt-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-500/15 border border-lavender-500/25 text-purple-700 text-xs font-sans font-bold uppercase tracking-wider mb-4 shadow-xs backdrop-blur-md">
            <span>🎨 Companion Form Factor</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-serif font-medium tracking-tight mb-4 text-[#2b1f1a]">
            Shape Your <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-sky-500 gradient-text font-bold">Companion.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#3e2723]/75 font-serif italic mb-10 max-w-2xl leading-relaxed">
            - choose how WhisPURR visually anchors to your screen while you work.
          </p>

          <p className="text-xs font-bold text-[#2b1f1a]/50 uppercase tracking-widest mb-8">Click the form you'd like to keep on screen</p>

          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { name: 'Orb', desc: 'Radiant floating sphere', tag: 'Ambient Glow', active: true, color: 'from-sky-400 via-indigo-400 to-coral-400' },
              { name: 'Mini', desc: 'Compact screen notch', tag: 'Minimalist', active: false, color: 'from-mint-400 to-teal-500' },
              { name: 'Pill', desc: 'Dynamic spectrum bar', tag: 'Full Waveform', active: false, color: 'from-amber-400 to-coral-500' }
            ].map((opt, i) => (
              <div 
                key={i} 
                className={`w-44 h-48 rounded-[2rem] border-2 p-5 flex flex-col items-center justify-between cursor-pointer transition-all ${
                  opt.active 
                    ? 'border-sky-500 bg-gradient-to-b from-sky-50/90 to-white text-[#2b1f1a] shadow-xl shadow-sky-500/15 scale-105 ring-2 ring-sky-400/40' 
                    : 'border-[#2b1f1a]/10 bg-white/85 text-[#2b1f1a]/70 hover:border-sky-300 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${opt.color} flex items-center justify-center shadow-md text-white font-bold text-lg`}>
                  {opt.name === 'Orb' ? '🔮' : opt.name === 'Mini' ? '✨' : '🌊'}
                </div>
                <div>
                  <span className="text-xl font-bold font-sans block mb-1 text-[#2b1f1a]">{opt.name}</span>
                  <span className="text-xs text-[#2b1f1a]/60 block leading-tight">{opt.desc}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  opt.active ? 'bg-sky-500 text-white shadow-xs' : 'bg-black/5 text-[#2b1f1a]/60'
                }`}>
                  {opt.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case 5:
      return (
        <SurveySlide 
          title="Developer Blueprints." 
          icon={<Terminal size={28} />} 
          subtext="Pick how WhisPURR structures your technical prompts and terminal commands." 
          theme="sky"
          options={[
            { n: 'Clear', d: 'The full instruction, plainly written.' },
            { n: 'Concise', d: 'The fewest words and command flags.' },
            { n: 'Structured', d: 'Goal, code changes, and verification.' }
          ]} 
        />
      );
    case 6:
      return (
        <SurveySlide 
          title="Chat Registers." 
          icon={<MessageCircle size={28} />} 
          subtext="Choose how WhisPURR adapts your voice for fast-twitch channels like Slack or Teams." 
          theme="coral"
          options={[
            { n: 'Clear', d: 'Clean sentences; essential shorthand kept.' },
            { n: 'Casual', d: 'Natural lowercase workplace shorthand.' },
            { n: 'Formal', d: 'Everything spelled out and articulated.' }
          ]} 
        />
      );
    case 7:
      return (
        <SurveySlide 
          title="Inbox Registers." 
          icon={<Mail size={28} />} 
          subtext="Set the baseline tone WhisPURR uses to draft high-context emails." 
          theme="lavender"
          options={[
            { n: 'Professional', d: 'Conventional, polished, and to the point.' },
            { n: 'Friendly', d: 'The exact same note, with warmth.' },
            { n: 'Formal', d: 'Highest executive formality and structure.' }
          ]} 
        />
      );
    case 8:
      return (
        <SurveySlide 
          title="Global Modes." 
          icon={<Briefcase size={28} />} 
          subtext="Pick WhisPURR's default structural baseline when prowling through other applications." 
          theme="mint"
          options={[
            { n: 'Balanced', d: 'Cleaned up, but authentically your voice.' },
            { n: 'Minimal', d: 'Compressed to rapid bullet fragments.' },
            { n: 'Polished', d: 'Composed, articulate complete sentences.' }
          ]} 
        />
      );
    case 9:
      return (
        <div className="flex flex-col items-center justify-center -mt-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-sans font-bold uppercase tracking-wider mb-5 shadow-xs backdrop-blur-md">
            <span>🎉 Ready for Action</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-serif font-medium tracking-tight mb-5 text-[#2b1f1a]">
            You're Ready to <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 gradient-text font-bold">Pounce.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#3e2723]/75 font-serif italic mb-8 max-w-xl leading-relaxed">
            - WhisPURR will be resting quietly at the bottom of your screen. Just hold your shortcut and speak.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center mb-10 max-w-xl">
            <span className="px-3.5 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold shadow-xs">
              🎙️ Alt to Dictate
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-coral-100 text-coral-900 border border-coral-300 text-xs font-bold shadow-xs">
              🧭 Alt + Scroll for Modes
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-mint-100 text-emerald-900 border border-mint-300 text-xs font-bold shadow-xs">
              🌐 Alt + Right-Click for Languages
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-sunshine-100 text-amber-900 border border-sunshine-300 text-xs font-bold shadow-xs">
              ✨ Expressive Moods Emojis
            </span>
          </div>

          <button 
            onClick={onComplete}
            className="px-10 py-5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center gap-4 transition-all hover:scale-105 text-2xl shadow-[0_12px_35px_rgba(2,132,199,0.35)] hover:shadow-[0_16px_45px_rgba(2,132,199,0.5)] cursor-pointer border border-sky-300/40"
          >
            <img src="/kivi_icon.png" className="w-8 h-8 rounded-full shadow-sm" alt="Icon" />
            <span>Launch WhisPURR</span>
            <span className="text-sm opacity-80 font-mono font-normal bg-black/20 px-2 py-1 rounded-lg ml-1">[Enter ↵]</span>
          </button>
        </div>
      );
    default:
      return null;
  }
}

function SurveySlide({ 
  title, 
  icon, 
  subtext, 
  options,
  theme = 'sky'
}: { 
  title: string, 
  icon: React.ReactNode, 
  subtext: string, 
  options: { n: string, d: string }[],
  theme?: 'sky' | 'coral' | 'lavender' | 'mint'
}) {
  const [selected, setSelected] = useState(0);

  const themeClasses = {
    sky: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
      activeBorder: 'border-sky-500 ring-sky-400/40 shadow-sky-500/15',
      activeBg: 'from-sky-50/90 to-white',
      indicator: 'bg-sky-500',
      tagColor: 'text-sky-800'
    },
    coral: {
      badge: 'bg-coral-50 text-coral-700 border-coral-200',
      activeBorder: 'border-coral-500 ring-coral-400/40 shadow-coral-500/15',
      activeBg: 'from-coral-50/90 to-white',
      indicator: 'bg-coral-500',
      tagColor: 'text-coral-800'
    },
    lavender: {
      badge: 'bg-lavender-50 text-purple-700 border-lavender-200',
      activeBorder: 'border-purple-500 ring-purple-400/40 shadow-purple-500/15',
      activeBg: 'from-lavender-50/90 to-white',
      indicator: 'bg-purple-500',
      tagColor: 'text-purple-800'
    },
    mint: {
      badge: 'bg-mint-50 text-emerald-700 border-mint-200',
      activeBorder: 'border-emerald-500 ring-emerald-400/40 shadow-emerald-500/15',
      activeBg: 'from-mint-50/90 to-white',
      indicator: 'bg-emerald-500',
      tagColor: 'text-emerald-800'
    }
  }[theme];
  
  return (
    <div className="flex flex-col items-center w-full text-center -mt-6">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider mb-4 shadow-xs backdrop-blur-md ${themeClasses.badge}`}>
        <span>{icon}</span>
        <span className="uppercase">modes survey</span>
      </div>

      <h1 className="text-5xl sm:text-6xl font-serif font-medium tracking-tight mb-4 text-[#2b1f1a]">{title}</h1>
      <p className="text-xl sm:text-2xl text-[#3e2723]/75 font-serif italic mb-12 max-w-3xl leading-relaxed">- {subtext}</p>
      
      <div className="flex gap-6 w-full justify-center flex-wrap">
        {options.map((opt, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(i)}
            className={`relative w-72 h-64 rounded-3xl border-2 p-7 cursor-pointer transition-all flex flex-col justify-between ${
              selected === i 
                ? `${themeClasses.activeBorder} bg-gradient-to-b ${themeClasses.activeBg} text-[#2b1f1a] scale-105 shadow-xl ring-2 z-10` 
                : 'border-black/10 bg-white/90 text-[#2b1f1a]/70 hover:border-black/20 hover:shadow-md'
            }`}
          >
            {selected === i && (
              <div className={`absolute -top-3.5 -right-3.5 w-9 h-9 ${themeClasses.indicator} rounded-full flex items-center justify-center text-white shadow-lg`}>
                <Check size={20} strokeWidth={3} />
              </div>
            )}

            {/* Visual preview card */}
            <div className="flex-1 bg-[#fbf8f3] rounded-2xl mb-4 p-4 border border-black/5 flex flex-col justify-center shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${themeClasses.indicator}`} />
                <div className="w-16 h-2 bg-black/10 rounded-full" />
              </div>
              <div className="w-full h-2 bg-black/10 rounded-full mb-2.5" />
              <div className="w-4/5 h-2 bg-black/10 rounded-full" />
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-1 font-sans ${themeClasses.tagColor}`}>{opt.n}</h3>
              <p className="text-sm opacity-80 font-serif italic leading-snug">{opt.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadialDialsDemoSlide() {
  const [activeDial, setActiveDial] = useState<0 | 1>(0); // 0: Modes (right arc), 1: Languages (left arc)
  const [modeRotation, setModeRotation] = useState(0);
  const [langRotation, setLangRotation] = useState(0);

  const [moodsEnabled, setMoodsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('whispurr_moods') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const handleMoodsChanged = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail && typeof custom.detail.enabled === 'boolean') {
        setMoodsEnabled(custom.detail.enabled);
      } else {
        try {
          setMoodsEnabled(localStorage.getItem('whispurr_moods') === 'true');
        } catch {}
      }
    };
    window.addEventListener('whispurr_moods_changed', handleMoodsChanged);
    return () => window.removeEventListener('whispurr_moods_changed', handleMoodsChanged);
  }, []);

  const toggleMoods = () => {
    const next = !moodsEnabled;
    setMoodsEnabled(next);
    try {
      localStorage.setItem('whispurr_moods', String(next));
      window.dispatchEvent(new CustomEvent('whispurr_moods_changed', { detail: { enabled: next } }));
    } catch (e) {}
  };

  const MODE_EMOJIS: Record<string, string> = {
    Formal: '🤝',
    Casual: '☕',
    Developer: '💻',
    Prompts: '🤖',
    'Other apps': '📂',
    Academic: '🎓',
    Concise: '⚡',
    Warm: '💖'
  };

  const MODE_SAMPLES: Record<string, { plain: string; mood: string }> = {
    Formal: {
      plain: "Let's align our deliverables by next Tuesday.",
      mood: "Let's align our deliverables by next Tuesday. 🤝📅"
    },
    Casual: {
      plain: "Hey, sounds awesome, count me in!",
      mood: "Hey, sounds awesome, count me in! 🙌✨"
    },
    Developer: {
      plain: "Refactored the async hook and merged the PR.",
      mood: "Refactored the async hook and merged the PR. 🚀💻"
    },
    Prompts: {
      plain: "Act as a senior system architect and evaluate trade-offs.",
      mood: "Act as a senior system architect and evaluate trade-offs. 🧠🤖"
    },
    'Other apps': {
      plain: "Pasted formatted summary into Notion notes.",
      mood: "Pasted formatted summary into Notion notes. 📂✨"
    },
    Academic: {
      plain: "Empirical analysis demonstrates statistically significant variance.",
      mood: "Empirical analysis demonstrates statistically significant variance. 📚🎓"
    },
    Concise: {
      plain: "Done. Fixed bug in auth flow.",
      mood: "Done. Fixed bug in auth flow. 👍"
    },
    Warm: {
      plain: "Thank you so much for your thoughtful feedback, really appreciate it!",
      mood: "Thank you so much for your thoughtful feedback, really appreciate it! 💖🌸"
    }
  };

  const LANG_SAMPLES: Record<string, string> = {
    AutoDetect: 'Auto-detecting your spoken language in real-time... 🌐',
    English: 'Hello! How can I help you today? 👋',
    Hindi: 'नमस्ते! आज मैं आपकी क्या सहायता कर सकता हूँ? 🙏',
    Spanish: '¡Hola! ¿En qué puedo ayudarte hoy? 🇪🇸',
    French: "Bonjour ! Comment puis-je vous aider aujourd'hui ? 🇫🇷",
    German: 'Hallo! Wie kann ich Ihnen heute helfen? 🇩🇪',
    Japanese: 'こんにちは！今日はどのようなご用件でしょうか？ 🇯🇵',
    Mandarin: '你好！今天有什么我可以帮你的吗？ 🇨🇳',
    Italian: 'Ciao! Come posso aiutarti oggi? 🇮🇹',
    Portuguese: 'Olá! Como posso ajudar você hoje? 🇵🇹'
  };

  const ALL_DIAL_LANGUAGES = [
    'AutoDetect',
    'English',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Mandarin',
    'Italian',
    'Portuguese'
  ];

  const ALL_DIAL_MODES = [
    'Formal',
    'Casual',
    'Developer',
    'Prompts',
    'Other apps',
    'Academic',
    'Concise',
    'Warm'
  ];

  const [dialLanguages, setDialLanguages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('whispurr_dial_languages');
      return saved ? JSON.parse(saved) : ['AutoDetect', 'English', 'Hindi'];
    } catch (e) {
      return ['AutoDetect', 'English', 'Hindi'];
    }
  });

  const [dialModes, setDialModes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('whispurr_dial_modes');
      return saved ? JSON.parse(saved) : ['Formal', 'Casual', 'Developer', 'Prompts'];
    } catch (e) {
      return ['Formal', 'Casual', 'Developer', 'Prompts'];
    }
  });

  const toggleDialLanguage = (lang: string) => {
    setDialLanguages(prev => {
      let next: string[];
      if (prev.includes(lang)) {
        if (prev.length <= 1) return prev;
        next = prev.filter(l => l !== lang);
      } else {
        next = [...prev, lang];
      }
      try {
        localStorage.setItem('whispurr_dial_languages', JSON.stringify(next));
        window.dispatchEvent(new CustomEvent('whispurr_dial_config_changed'));
      } catch (e) {}
      return next;
    });
  };

  const toggleDialMode = (m: string) => {
    setDialModes(prev => {
      let next: string[];
      if (prev.includes(m)) {
        if (prev.length <= 1) return prev;
        next = prev.filter(x => x !== m);
      } else {
        next = [...prev, m];
      }
      try {
        localStorage.setItem('whispurr_dial_modes', JSON.stringify(next));
        window.dispatchEvent(new CustomEvent('whispurr_dial_config_changed'));
      } catch (e) {}
      return next;
    });
  };

  const cycle = (direction: 1 | -1) => {
    if (activeDial === 0) {
      setModeRotation(prev => {
        let nextRot = prev + direction;
        if (nextRot < 0) nextRot = 0;
        if (nextRot > dialModes.length - 1) nextRot = Math.max(0, dialModes.length - 1);
        return nextRot;
      });
    } else {
      setLangRotation(prev => {
        let nextRot = prev + direction;
        if (nextRot < 0) nextRot = 0;
        if (nextRot > dialLanguages.length - 1) nextRot = Math.max(0, dialLanguages.length - 1);
        return nextRot;
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    cycle(e.deltaY > 0 ? 1 : -1);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDial(prev => (prev === 0 ? 1 : 0));
  };

  const currentMode = dialModes[modeRotation] || 'Formal';
  const currentLang = dialLanguages[langRotation] || 'English';

  return (
    <div className="flex flex-col items-center w-full max-w-4xl text-center select-none">
      <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-1 text-[#2b1f1a] flex items-center justify-center gap-2.5">
        <span>Seamless <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-500 gradient-text font-bold">Radial Dials.</span></span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sunshine-100 to-coral-100 border border-coral-200 text-coral-800 text-[11px] font-sans font-bold tracking-wider uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-coral-500" />
          Interactive Demo
        </span>
      </h1>
      <p className="text-sm md:text-base text-[#3e2723]/75 font-serif italic mb-3 max-w-2xl">
        - hold <strong className="text-sky-700 font-sans font-bold bg-sky-100/90 border border-sky-200/80 px-1.5 py-0.5 rounded-md">Alt</strong> anywhere to spin modes, or <strong className="text-indigo-700 font-sans font-bold bg-indigo-100/90 border border-indigo-200/80 px-1.5 py-0.5 rounded-md">right-click</strong> to spin languages.
      </p>

      {/* Main Interactive Dial Simulator Card */}
      <div 
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        className="w-full bg-white/90 backdrop-blur-xl rounded-3xl border-2 border-sky-200/80 shadow-[0_20px_50px_rgba(2,132,199,0.12)] p-4 md:p-5 flex flex-col gap-3 relative overflow-hidden"
      >
        {/* Dial Switcher Bar */}
        <div className="flex items-center justify-between border-b border-sky-100 pb-2.5 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveDial(0)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeDial === 0
                  ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-sky-500/30 scale-[1.02]'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100/80 border border-sky-200/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Modes</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-normal ${activeDial === 0 ? 'bg-black/20 text-white' : 'bg-sky-200/60 text-sky-900'}`}>Alt + Scroll</span>
            </button>

            <button
              onClick={() => setActiveDial(1)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeDial === 1
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
                  : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100/80 border border-indigo-200/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Languages</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-normal ${activeDial === 1 ? 'bg-black/20 text-white' : 'bg-indigo-200/60 text-indigo-900'}`}>Alt + → / Right-Click</span>
            </button>

            <button
              type="button"
              role="switch"
              aria-checked={moodsEnabled}
              onClick={toggleMoods}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                moodsEnabled
                  ? 'bg-gradient-to-r from-coral-500 to-vibrantOrange-500 text-white border-coral-400 shadow-md shadow-coral-500/30 scale-[1.02]'
                  : 'bg-coral-50 text-coral-800 border-coral-200/80 hover:bg-coral-100/80'
              }`}
              title="Toggle Moods: adds expressive emojis based on your emotions and undertones"
            >
              <Sparkles className={`w-3.5 h-3.5 ${moodsEnabled ? 'text-sunshine-200' : 'text-coral-500'}`} />
              <span>Moods: {moodsEnabled ? 'ON' : 'OFF'}</span>
              <span>{moodsEnabled ? '✨' : '🎭'}</span>
            </button>
          </div>

          <span className="text-[11px] text-[#3e2723]/60 font-serif italic hidden lg:inline">
            Scroll or right-click to spin
          </span>
        </div>

        {/* Live Radial Arc Interactive Area */}
        <div className="relative h-36 w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50/70 via-indigo-50/40 to-coral-50/30 rounded-2xl border border-sky-100/80">
          <div className="absolute top-2 left-3 text-[10px] font-mono uppercase tracking-wider text-sky-800/70 font-bold bg-white/70 px-2 py-0.5 rounded-md border border-sky-200/50">
            {activeDial === 0 ? 'Mode Selector (Right Arc)' : 'Language Selector (Left Arc)'}
          </div>

          {/* Center Indicator */}
          <div className="flex flex-col items-center justify-center pointer-events-none z-10">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white mb-0.5 ${
              activeDial === 0 
                ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/30' 
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/30'
            }`}>
              {activeDial === 0 ? <Compass className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#2b1f1a]/70 font-bold">
              {activeDial === 0 ? 'Modes' : 'Languages'}
            </span>
          </div>

          {/* Dial Items mapped along arc */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {activeDial === 0 ? (
              <>
                <svg className="absolute pointer-events-none" style={{ width: 220, height: 220 }}>
                  <path d="M 110 20 A 90 90 0 0 1 110 200" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.45" />
                </svg>
                {dialModes.map((m, i) => {
                  const diff = i - modeRotation;
                  const distance = Math.abs(diff);
                  const angle = diff * 26;
                  const angleRad = angle * (Math.PI / 180);
                  const radius = 110;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;
                  const isActive = diff === 0;
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.3 : 0;
                  const emoji = MODE_EMOJIS[m] || '✨';
                  const displayLabel = moodsEnabled ? `${m} ${emoji}` : m;
                  return (
                    <motion.div
                      key={m}
                      className="absolute"
                      animate={{ x, y, scale: isActive ? 1.08 : 0.85, opacity }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    >
                      <div className={`-translate-y-1/2 px-3 py-1 whitespace-nowrap text-xs font-bold transition-all ${
                        isActive
                          ? 'rounded-xl shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white border border-sky-300 shadow-sky-500/25'
                          : 'text-sky-950/80 drop-shadow-xs'
                      }`}>
                        {displayLabel}
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <>
                <svg className="absolute pointer-events-none" style={{ width: 220, height: 220 }}>
                  <path d="M 110 20 A 90 90 0 0 0 110 200" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.45" />
                </svg>
                {dialLanguages.map((l, i) => {
                  const diff = i - langRotation;
                  const distance = Math.abs(diff);
                  const angle = 180 - diff * 26;
                  const angleRad = angle * (Math.PI / 180);
                  const radius = 110;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;
                  const isActive = diff === 0;
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.3 : 0;
                  return (
                    <motion.div
                      key={l}
                      className="absolute"
                      animate={{ x, y, scale: isActive ? 1.08 : 0.85, opacity }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    >
                      <div className={`-translate-y-1/2 px-3 py-1 whitespace-nowrap text-xs font-bold transition-all ${
                        isActive
                          ? 'rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white border border-indigo-300 shadow-indigo-500/25'
                          : 'text-indigo-950/80 drop-shadow-xs'
                      }`}>
                        {l}
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </div>

          {/* Quick cycle arrow buttons */}
          <div className="absolute right-3 flex flex-col gap-1.5 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); cycle(-1); }}
              className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-sky-800 hover:text-sky-950 border border-sky-200 flex items-center justify-center shadow-xs cursor-pointer transition-all hover:scale-105"
              title="Cycle Up"
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); cycle(1); }}
              className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-sky-800 hover:text-sky-950 border border-sky-200 flex items-center justify-center shadow-xs cursor-pointer transition-all hover:scale-105"
              title="Cycle Down"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Live Output Preview Strip */}
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-50/80 via-indigo-50/50 to-purple-50/40 border border-sky-200/60 text-xs">
          <div className="flex items-center gap-2 overflow-hidden text-left flex-1 mr-2">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase shrink-0 text-white shadow-xs ${
              activeDial === 0 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600'
            }`}>
              {activeDial === 0 ? currentMode : currentLang}
            </span>
            <span className="text-[#2b1f1a] font-medium truncate font-sans">
              {activeDial === 0
                ? (moodsEnabled
                    ? (MODE_SAMPLES[currentMode]?.mood || `${MODE_SAMPLES[currentMode]?.plain || 'Your adapted thoughts will flow here.'} ✨`)
                    : (MODE_SAMPLES[currentMode]?.plain || 'Your adapted thoughts will flow here.'))
                : (LANG_SAMPLES[currentLang] || 'Your translated voice appears here in real-time.')}
            </span>
          </div>
          {activeDial === 0 && (
            <span className={`text-[10px] font-mono font-bold shrink-0 hidden sm:inline ${moodsEnabled ? 'text-coral-600' : 'text-sky-600'}`}>
              {moodsEnabled ? '✨ Moods Active' : 'Neutral Tone'}
            </span>
          )}
        </div>

        {/* Customization Chips Section */}
        <div className="flex flex-col gap-2 pt-2 border-t border-sky-100 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2b1f1a] tracking-tight flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeDial === 0 ? 'bg-sky-500' : 'bg-indigo-500'}`} />
              {activeDial === 0 ? 'Customise Showcased Modes' : 'Customise Showcased Languages'}
            </span>
            <span className="text-[11px] text-[#3e2723]/65 font-serif italic">
              Click chips to showcase or hide on dial
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[56px] max-h-[56px] overflow-y-auto pr-1 custom-scrollbar">
            {activeDial === 0 ? (
              ALL_DIAL_MODES.map(m => {
                const isSelected = dialModes.includes(m);
                const emoji = MODE_EMOJIS[m] || '✨';
                return (
                  <button
                    key={m}
                    onClick={() => toggleDialMode(m)}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-sky-100 text-sky-900 border-sky-300 font-bold shadow-xs hover:bg-sky-200/80'
                        : 'bg-black/5 text-[#2b1f1a]/50 border-black/10 hover:bg-black/10'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3 text-sky-600 stroke-[3]" /> : <Plus className="w-3 h-3 opacity-40" />}
                    <span>{m} {moodsEnabled ? emoji : ''}</span>
                  </button>
                );
              })
            ) : (
              ALL_DIAL_LANGUAGES.map(l => {
                const isSelected = dialLanguages.includes(l);
                return (
                  <button
                    key={l}
                    onClick={() => toggleDialLanguage(l)}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold shadow-xs hover:bg-indigo-200/80'
                        : 'bg-black/5 text-[#2b1f1a]/50 border-black/10 hover:bg-black/10'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3 text-indigo-600 stroke-[3]" /> : <Plus className="w-3 h-3 opacity-40" />}
                    <span>{l}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
