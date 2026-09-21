import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Briefcase, MessageCircle, Mail, ChevronRight, ChevronLeft, Check, Compass, Globe, Sparkles, Plus, ChevronUp, ChevronDown, Copy, Mic } from 'lucide-react';
import { ALL_DIAL_LANGUAGES, LANG_SAMPLES, getSanitizedDialLanguages } from '../constants/languages';
import KiviCatIcon from './KiviCatIcon';

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
      {/* Subtle Warm Editorial Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#f4ebe1] blur-[140px] pointer-events-none opacity-80" />
      <div className="absolute -bottom-24 right-10 w-[500px] h-[500px] rounded-full bg-[#ebdccf]/50 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-[#f1e6da]/40 blur-[130px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 pt-7 pb-4 z-10">
        <button 
          onClick={onComplete}
          className="bg-white/75 hover:bg-white text-[#5d4037] hover:text-[#2b170e] px-4 py-1.5 rounded-full border border-[#8d6e63]/20 shadow-xs transition-all text-xs font-mono font-medium flex items-center gap-2 cursor-pointer backdrop-blur-sm"
          title="Skip tutorial (Esc)"
        >
          <span>skip</span>
          <span className="text-[10px] text-[#8d6e63]/70 font-sans font-normal">[Esc]</span>
        </button>

        <div className="px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-sm border border-[#8d6e63]/20 text-[#3e2723] font-mono text-xs font-semibold shadow-xs">
          <span className="text-[#8d6e63] font-bold">{String(slide + 1).padStart(2, '0')}</span>
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
            {renderSlideContent(slide, onComplete, nextSlide, setSlide)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center justify-center z-20 pointer-events-none">
        {slide > 0 && (
          <button 
            onClick={prevSlide}
            className="pointer-events-auto w-11 h-11 text-[#5d4037] hover:text-[#2b170e] bg-white/80 hover:bg-white backdrop-blur-md rounded-full border border-[#8d6e63]/20 hover:border-[#8d6e63]/40 transition-all flex items-center justify-center group cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            title="Previous slide (←)"
          >
            <ChevronLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform text-[#5d4037]" />
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center justify-center z-20 pointer-events-none">
        {slide < totalSlides - 1 && (
          <button 
            onClick={nextSlide}
            className="pointer-events-auto w-11 h-11 text-[#5d4037] hover:text-[#2b170e] bg-white/80 hover:bg-white backdrop-blur-md rounded-full border border-[#8d6e63]/20 hover:border-[#8d6e63]/40 transition-all flex items-center justify-center group cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            title="Next slide (→)"
          >
            <ChevronRight size={22} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform text-[#5d4037]" />
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
                ? 'w-9 bg-[#4a2e22] shadow-sm' 
                : 'w-2 bg-[#2b1f1a]/15 hover:bg-[#4a2e22]/40'
            }`}
            title={`Jump to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );

  return createPortal(tutorialContent, document.body);
}

function CompanionFormSlide() {
  const [selectedForm, setSelectedForm] = useState<'Orb' | 'Mini' | 'Pill'>(() => {
    try {
      return (localStorage.getItem('whispurr_companion_form') as any) || 'Orb';
    } catch (e) {
      return 'Orb';
    }
  });

  const handleSelect = (formName: 'Orb' | 'Mini' | 'Pill') => {
    setSelectedForm(formName);
    try {
      localStorage.setItem('whispurr_companion_form', formName);
    } catch (e) {}
  };

  const forms = [
    { 
      name: 'Orb' as const, 
      desc: 'Radiant floating sphere that quietly pulses with speech.', 
      tag: 'Ambient Glow',
      renderIcon: () => (
        <div className="w-14 h-14 rounded-full bg-[#f4ebe1] border border-[#8d6e63]/30 flex items-center justify-center shadow-xs">
          <KiviCatIcon className="w-9 h-9 object-cover rounded-full" />
        </div>
      )
    },
    { 
      name: 'Mini' as const, 
      desc: 'Compact screen edge notch tucked against the display.', 
      tag: 'Minimalist',
      renderIcon: () => (
        <div className="w-14 h-14 rounded-2xl bg-[#f4ebe1] border border-[#8d6e63]/30 flex items-center justify-center shadow-xs">
          <div className="w-8 h-2 rounded-full bg-[#8d5e3b] shadow-2xs" />
        </div>
      )
    },
    { 
      name: 'Pill' as const, 
      desc: 'Dynamic live spectrum bar reflecting your speech.', 
      tag: 'Full Waveform',
      renderIcon: () => (
        <div className="w-14 h-14 rounded-2xl bg-[#f4ebe1] border border-[#8d6e63]/30 flex items-center justify-center gap-1 shadow-xs">
          <span className="w-1 h-3 bg-[#8d5e3b]/50 rounded-full" />
          <span className="w-1 h-6 bg-[#8d5e3b] rounded-full" />
          <span className="w-1 h-4.5 bg-[#8d5e3b]/80 rounded-full" />
          <span className="w-1 h-2 bg-[#8d5e3b]/40 rounded-full" />
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl px-4 select-none">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ebe1] border border-[#8d6e63]/25 text-[#5d4037] text-xs font-mono font-medium tracking-wide mb-3 shadow-2xs">
        <span>Form Factor</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
        Shape Your <span className="font-semibold italic text-[#8d5e3b]">Companion.</span>
      </h1>

      <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-7 max-w-md leading-relaxed">
        Choose how WhisPURR anchors to your screen while you work.
      </p>

      <div className="flex flex-wrap gap-5 sm:gap-6 justify-center w-full items-stretch">
        {forms.map((opt) => {
          const isSelected = selectedForm === opt.name;
          return (
            <div 
              key={opt.name}
              onClick={() => handleSelect(opt.name)}
              className={`w-full sm:w-[250px] min-h-[245px] p-6 rounded-3xl flex flex-col items-center justify-between cursor-pointer transition-all duration-300 shadow-sm active:scale-95 group ${
                isSelected 
                  ? 'bg-white border-2 border-[#8d5e3b] shadow-xl shadow-[#2b170e]/8 scale-[1.03] ring-4 ring-[#8d5e3b]/15' 
                  : 'bg-white/80 backdrop-blur-md border border-[#8d6e63]/20 hover:border-[#8d6e63]/50 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="my-auto pt-1 pb-3">
                {opt.renderIcon()}
              </div>

              <div className="mb-4">
                <span className="text-xl font-serif font-semibold block mb-1 text-[#2b170e]">
                  {opt.name}
                </span>
                <span className="text-xs text-[#5d4037]/75 block leading-relaxed max-w-[200px]">
                  {opt.desc}
                </span>
              </div>

              <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
                isSelected 
                  ? 'bg-[#2b170e] text-[#e8d5b5] shadow-xs' 
                  : 'bg-[#f4ebe1] text-[#5d4037]/60 group-hover:text-[#5d4037]'
              }`}>
                {opt.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderSlideContent(index: number, onComplete: () => void, onNext?: () => void, goToSlide?: (idx: number) => void) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col items-center justify-center -mt-4 max-w-3xl text-center relative z-10 px-4">
          {/* Elegant Icon Badge */}
          <div className="relative mb-7 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-2.5 shadow-[0_20px_50px_rgba(43,23,14,0.1)] border border-[#3e2723]/10 relative z-10 transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-[#faf6ee] shadow-inner flex items-center justify-center">
                <img src="/kivi_icon.png" className="w-full h-full object-cover" alt="WhisPURR Icon" />
              </div>
            </div>
            <div className="absolute -inset-3 rounded-3xl bg-[#d7bda8]/30 blur-2xl -z-10" />
          </div>

          {/* Editorial Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-[#2b170e] leading-tight mb-3">
            Meet <span className="font-semibold italic text-[#8d5e3b]">WhisPURR.</span>
          </h1>

          {/* Catchy Tagline */}
          <p className="text-2xl sm:text-3xl text-[#3e2723] font-serif italic mb-4 max-w-2xl leading-snug">
            Fast. Flexible. Quietly there.
          </p>

          {/* Refined Description */}
          <p className="text-base sm:text-lg text-[#5d4037]/85 font-sans max-w-xl leading-relaxed font-normal mb-8">
            Your thoughts, seamlessly translated into work. WhisPURR stays quietly in the background, automatically shaping your words to your active app.
          </p>

          {/* Classy Action Button */}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-[#2b170e] hover:bg-[#43261a] text-[#fdfaf6] text-sm font-medium tracking-wide shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-3 cursor-pointer group hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore WhisPURR</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#e8d5b5]" />
            </button>
          )}
        </div>
      );
    case 1:
      return <HoldOptionToSpeakSlide />;
    case 2:
      return <RadialDialsDemoSlide />;
    case 3:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-4xl px-4 select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ebe1] border border-[#8d6e63]/25 text-[#5d4037] text-xs font-mono font-medium tracking-wide mb-3 shadow-2xs">
            <span>Desktop Shortcuts</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
            Pick Your <span className="font-semibold italic text-[#8d5e3b]">Paws.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-7 max-w-md leading-relaxed">
            Quick desktop shortcuts to trigger dictation and radial dials.
          </p>

          <div className="flex flex-wrap gap-5 sm:gap-6 justify-center w-full items-stretch">
            {/* Hold to Talk */}
            <div 
              onClick={() => goToSlide?.(1)}
              className="w-full sm:w-[250px] min-h-[235px] p-6 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Click to view Hold option to Speak slide"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <Mic className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Hold to Talk</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-6 py-2.5 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-2xl text-[#2b170e]">
                  option
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium">
                Instant Voice Typing
              </span>
            </div>

            {/* Persona Dial */}
            <div 
              onClick={() => goToSlide?.(2)}
              className="w-full sm:w-[250px] min-h-[235px] p-6 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Click to view Persona Dial slide"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <Compass className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Persona Dial</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-4 py-2.5 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-base sm:text-lg text-[#2b170e] whitespace-nowrap">
                  option + scroll
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium">
                Spin 8 Personas
              </span>
            </div>

            {/* Language Dial */}
            <div 
              onClick={() => goToSlide?.(2)}
              className="w-full sm:w-[250px] min-h-[235px] p-6 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Click to view Language Dial slide"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <Globe className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Language Dial</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-3.5 py-2.5 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-sm sm:text-base text-[#2b170e] whitespace-nowrap">
                  option + right-click
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium">
                Switch 23 Languages
              </span>
            </div>
          </div>
        </div>
      );
    case 4:
      return <CompanionFormSlide />;
    case 5:
      return (
        <SurveySlide 
          title="Developer Blueprints." 
          icon={<Terminal size={28} />} 
          subtext="Choose how technical prompts and terminal commands are formatted." 
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
          subtext="Choose how your voice sounds in chat apps like Slack or Teams." 
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
          subtext="Choose your default tone for emails and correspondence." 
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
          title="Global Personas." 
          icon={<Briefcase size={28} />} 
          subtext="Choose your baseline tone across other applications." 
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
            WhisPURR is ready at the bottom of your screen. Hold your shortcut and speak.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center mb-10 max-w-xl">
            <span className="px-3.5 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold shadow-xs">
              🎙️ option to dictate
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-coral-100 text-coral-900 border border-coral-300 text-xs font-bold shadow-xs">
              🧭 option + scroll for personas
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-mint-100 text-emerald-900 border border-mint-300 text-xs font-bold shadow-xs">
              🌐 option + right-click for languages
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
        <span className="uppercase">persona survey</span>
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
              <div className={`absolute -top-3.5 -right-3.5 w-9 h-9 ${themeClasses.indicator} rounded-full flex items-center justify-center text-[#ffffff] shadow-lg`}>
                <Check size={20} strokeWidth={3} className="text-[#ffffff]" />
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

function HoldOptionToSpeakSlide() {
  const [stage, setStage] = useState<'idle' | 'listening' | 'polishing' | 'typed'>('idle');
  const [isCopied, setIsCopied] = useState(false);
  const sampleSpeech = "Please review the attached project schedule and confirm whether the proposed delivery date works for your team.";
  const [displayText, setDisplayText] = useState('');
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startListening = useCallback(() => {
    setStage('listening');
    setDisplayText('');
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    
    let index = 0;
    typingTimerRef.current = setInterval(() => {
      index += 3;
      if (index >= sampleSpeech.length) {
        setDisplayText(sampleSpeech);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      } else {
        setDisplayText(sampleSpeech.slice(0, index));
      }
    }, 40);
  }, [sampleSpeech]);

  const finishListening = useCallback(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayText(sampleSpeech);
    setStage('polishing');

    setTimeout(() => {
      setStage('typed');
    }, 550);
  }, [sampleSpeech]);

  const isHeldRef = useRef(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    isHeldRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      isHeldRef.current = true;
      startListening();
    }, 150);
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (isHeldRef.current) {
      isHeldRef.current = false;
      finishListening();
    }
  };

  const handleClick = () => {
    if (isHeldRef.current) return;
    if (stage === 'listening') {
      finishListening();
    } else {
      startListening();
      setTimeout(() => {
        finishListening();
      }, 1800);
    }
  };

  // Keyboard listener for physical option / alt key
  useEffect(() => {
    const isOptionEvent = (e: KeyboardEvent) => {
      return (
        e.key === 'Alt' ||
        e.key === 'Option' ||
        e.code === 'AltLeft' ||
        e.code === 'AltRight' ||
        (e.key && (e.key.toLowerCase() === 'alt' || e.key.toLowerCase() === 'option'))
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOptionEvent(e) && !e.repeat) {
        startListening();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isOptionEvent(e)) {
        finishListening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', finishListening);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', finishListening);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [startListening, finishListening]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleSpeech);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isListening = stage === 'listening';
  const isProcessing = stage === 'polishing';

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl px-4 select-none">
      <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight mb-3 text-[#2b1f1a] flex items-center justify-center gap-3 flex-wrap">
        <span>Hold</span>
        <button
          type="button"
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className={`px-4 py-1.5 rounded-xl font-mono text-3xl sm:text-4xl font-semibold inline-flex items-center justify-center tracking-tight transition-all duration-200 cursor-pointer shadow-md select-none active:scale-95 ${
            isListening
              ? 'bg-[#ea580c] text-white ring-4 ring-[#ea580c]/30 shadow-[0_0_25px_rgba(234,88,12,0.45)] scale-95'
              : 'bg-[#2b170e] hover:bg-[#3e2417] text-[#fdfaf6] border border-[#5d4037] hover:border-[#8d6e63] shadow-[0_4px_14px_rgba(43,23,14,0.3)] hover:scale-105'
          }`}
          title="Click or hold option to test"
        >
          ⌥ option
        </button>
        <span>to Speak.</span>
      </h1>

      <p className="text-lg sm:text-xl text-[#3e2723]/75 font-serif italic mb-8 max-w-lg leading-relaxed">
        Hold to dictate. WhisPURR shapes your words and types directly into your active app.
      </p>

      {/* Realistic WhisPURR Floating HUD Mockup */}
      <div className="w-full max-w-xl select-none text-left">
        <div className="bg-[#190f0b]/95 backdrop-blur-2xl border border-[#5d4037]/80 rounded-3xl p-5 md:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(249,115,22,0.12)] text-[#f4ece1] flex flex-col gap-4 relative overflow-hidden">
          {/* Subtle warm glowing aura */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#5d4037]/50 pb-3 relative z-10">
            <div className="flex items-center gap-3">
              {/* Animated orange waveform status square */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : isProcessing
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {isListening ? (
                  <div className="flex items-center gap-0.5 h-3.5 px-1">
                    <motion.span animate={{ height: [4, 14, 6, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-0.5 bg-orange-400 rounded-full" />
                    <motion.span animate={{ height: [10, 4, 14, 8, 10] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.1 }} className="w-0.5 bg-amber-400 rounded-full" />
                    <motion.span animate={{ height: [6, 14, 8, 12, 6] }} transition={{ repeat: Infinity, duration: 0.75, delay: 0.2 }} className="w-0.5 bg-orange-300 rounded-full" />
                    <motion.span animate={{ height: [12, 6, 14, 4, 12] }} transition={{ repeat: Infinity, duration: 0.85, delay: 0.15 }} className="w-0.5 bg-amber-300 rounded-full" />
                  </div>
                ) : isProcessing ? (
                  <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#f4ece1]">
                  {isListening
                    ? 'WhisPURR Listening...'
                    : isProcessing
                      ? 'Polishing with Formal...'
                      : 'Typed into active app'}
                </h3>
                <p className="text-[11px] text-[#d7ccc8]/70">
                  {isListening
                    ? 'Speak now · Release option to finish'
                    : isProcessing
                      ? 'Adapting tone and custom rules...'
                      : 'Inserted directly at cursor'}
                </p>
              </div>
            </div>

            {/* Persona Tag */}
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-500/15 text-orange-300 border border-orange-500/30">
              formal
            </span>
          </div>

          {/* Transcribed Speech Bubble */}
          <div className="bg-[#2b1f1a]/95 border border-[#5d4037] rounded-2xl p-4 shadow-inner text-[#f4ece1] text-sm md:text-[15px] font-sans leading-relaxed relative z-10 min-h-[72px] flex items-center">
            {isListening ? (
              <p className="italic text-[#f4ece1]/95">
                "{displayText || 'Listening to your voice...'}"
                <span className="inline-block w-1.5 h-4 ml-1 bg-orange-400 animate-pulse align-middle" />
              </p>
            ) : isProcessing ? (
              <div className="flex items-center gap-2 text-amber-300 text-xs italic">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Refining speech and styling for Formal tone...</span>
              </div>
            ) : (
              <p className="italic text-[#f4ece1]/95 select-text">
                "{sampleSpeech}"
              </p>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between text-xs text-[#d7ccc8]/70 pt-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Check size={10} strokeWidth={3} />
              </span>
              <span className="text-xs text-[#d7ccc8]/80 font-medium">Typed directly into active app</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#d7ccc8] font-medium border border-[#5d4037]/50 transition-colors cursor-pointer active:scale-95"
            >
              {isCopied ? (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
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

  const [dialLanguages, setDialLanguages] = useState<string[]>(getSanitizedDialLanguages);

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

  // Global listener while on this demo slide so Option+scroll works anywhere on Mac
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (e.altKey) {
        e.preventDefault();
        cycle(e.deltaY > 0 ? 1 : -1);
      }
    };

    const handleGlobalContextMenu = (e: MouseEvent) => {
      if (e.altKey) {
        e.preventDefault();
        setActiveDial(prev => (prev === 0 ? 1 : 0));
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isOption = e.altKey || e.key === 'Alt' || e.key === 'Option' || e.code === 'AltLeft' || e.code === 'AltRight';
      if (isOption) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          cycle(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          cycle(-1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveDial(1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveDial(0);
        }
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    window.addEventListener('contextmenu', handleGlobalContextMenu);
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('contextmenu', handleGlobalContextMenu);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [activeDial, dialModes.length, dialLanguages.length]);

  const currentMode = dialModes[modeRotation] || 'Formal';
  const currentLang = dialLanguages[langRotation] || 'English — English';

  return (
    <div className="flex flex-col items-center w-full max-w-4xl text-center select-none px-2 sm:px-4">
      <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
        Seamless <span className="font-semibold italic text-[#8d5e3b]">Radial Dials.</span>
      </h1>
      <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-6 max-w-xl leading-relaxed">
        Hold <strong className="text-[#2b170e] font-sans font-semibold bg-[#f4ebe1] border border-[#8d6e63]/25 px-2 py-0.5 rounded-md text-xs">option</strong> to spin personas, or right-click to spin languages.
      </p>

      {/* Main Interactive Dial Simulator Card */}
      <div 
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        className="w-full bg-white/85 backdrop-blur-xl rounded-3xl border border-[#8d6e63]/20 shadow-[0_20px_50px_rgba(43,23,14,0.06)] p-6 md:p-7 flex flex-col gap-5 relative overflow-hidden"
      >
        {/* Dial Switcher Bar */}
        <div className="flex items-center justify-between border-b border-[#8d6e63]/15 pb-3.5 flex-wrap gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex p-1 rounded-full bg-[#f4ebe1]/70 border border-[#8d6e63]/20 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveDial(0)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeDial === 0
                    ? 'bg-[#2b170e] text-[#fdfaf6] shadow-sm font-semibold'
                    : 'text-[#5d4037]/75 hover:text-[#2b170e]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#e8d5b5]" />
                <span>Personas</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${activeDial === 0 ? 'bg-white/15 text-[#fdfaf6]' : 'bg-[#8d6e63]/10 text-[#5d4037]'}`}>option + scroll</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDial(1)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeDial === 1
                    ? 'bg-[#2b170e] text-[#fdfaf6] shadow-sm font-semibold'
                    : 'text-[#5d4037]/75 hover:text-[#2b170e]'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#e8d5b5]" />
                <span>Languages</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${activeDial === 1 ? 'bg-white/15 text-[#fdfaf6]' : 'bg-[#8d6e63]/10 text-[#5d4037]'}`}>option + →</span>
              </button>
            </div>

            {/* Moods Toggle Button - No emojis, just "Moods" */}
            <button
              type="button"
              role="switch"
              aria-checked={moodsEnabled}
              onClick={toggleMoods}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                moodsEnabled
                  ? 'bg-[#8d5e3b] text-white border-[#8d5e3b] shadow-sm font-semibold'
                  : 'bg-white/80 text-[#5d4037] border-[#8d6e63]/25 hover:bg-white'
              }`}
              title="Toggle Moods"
            >
              <span>Moods</span>
              <span className={`w-2 h-2 rounded-full transition-colors ${moodsEnabled ? 'bg-[#f4ece1]' : 'bg-[#8d6e63]/30'}`} />
            </button>
          </div>

          <span className="text-xs text-[#8d6e63]/70 font-serif italic hidden md:inline">
            Scroll or use arrows to spin
          </span>
        </div>

        {/* Live Radial Arc Interactive Area */}
        <div className="relative h-44 sm:h-48 w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf6f0] to-[#f4ede4]/60 rounded-2xl border border-[#8d6e63]/15">
          <div className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-wider text-[#8d6e63] font-semibold bg-white/80 px-2.5 py-1 rounded-md border border-[#8d6e63]/20 shadow-2xs">
            {activeDial === 0 ? 'Persona Dial (Right Arc)' : 'Language Dial (Left Arc)'}
          </div>

          {/* Center Indicator */}
          <div className="flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-md border-2 border-white mb-1 bg-[#2b170e] text-[#fdfaf6]">
              {activeDial === 0 ? <Compass className="w-5 h-5 text-[#e8d5b5]" /> : <Globe className="w-5 h-5 text-[#e8d5b5]" />}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#5d4037] font-bold">
              {activeDial === 0 ? 'Personas' : 'Languages'}
            </span>
          </div>

          {/* Dial Items mapped along arc */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {activeDial === 0 ? (
              <>
                <svg className="absolute pointer-events-none" style={{ width: 240, height: 240 }}>
                  <path d="M 120 20 A 100 100 0 0 1 120 220" fill="none" stroke="#8d6e63" strokeWidth="2" strokeDasharray="4 4" opacity="0.35" />
                </svg>
                {dialModes.map((m, i) => {
                  const diff = i - modeRotation;
                  const distance = Math.abs(diff);
                  const angle = diff * 24;
                  const angleRad = angle * (Math.PI / 180);
                  const radius = 115;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;
                  const isActive = diff === 0;
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.3 : 0;
                  return (
                    <motion.div
                      key={m}
                      className="absolute"
                      animate={{ x, y, scale: isActive ? 1.08 : 0.85, opacity }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    >
                      <div className={`-translate-y-1/2 px-3.5 py-1.5 whitespace-nowrap text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? 'rounded-full shadow-md bg-[#2b170e] text-[#fdfaf6] border border-[#5d4037]'
                          : 'text-[#5d4037]/70 font-medium'
                      }`}>
                        {m}
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <>
                <svg className="absolute pointer-events-none" style={{ width: 240, height: 240 }}>
                  <path d="M 120 20 A 100 100 0 0 0 120 220" fill="none" stroke="#8d6e63" strokeWidth="2" strokeDasharray="4 4" opacity="0.35" />
                </svg>
                {dialLanguages.map((l, i) => {
                  const diff = i - langRotation;
                  const distance = Math.abs(diff);
                  const angle = 180 - diff * 24;
                  const angleRad = angle * (Math.PI / 180);
                  const radius = 115;
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
                      <div className={`-translate-y-1/2 px-3.5 py-1.5 whitespace-nowrap text-xs font-semibold tracking-wide transition-all ${
                        isActive
                          ? 'rounded-full shadow-md bg-[#2b170e] text-[#fdfaf6] border border-[#5d4037]'
                          : 'text-[#5d4037]/70 font-medium'
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
          <div className="absolute right-4 flex flex-col gap-2 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); cycle(-1); }}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#5d4037] hover:text-[#2b170e] border border-[#8d6e63]/20 flex items-center justify-center shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
              title="Cycle Up"
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); cycle(1); }}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#5d4037] hover:text-[#2b170e] border border-[#8d6e63]/20 flex items-center justify-center shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
              title="Cycle Down"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Live Output Preview Strip */}
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#faf6ee] border border-[#8d6e63]/15 text-xs shadow-xs">
          <div className="flex items-center gap-3 overflow-hidden text-left flex-1 mr-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider shrink-0 bg-[#2b170e] text-[#e8d5b5]">
              {activeDial === 0 ? currentMode : currentLang}
            </span>
            <span className="text-[#2b170e] font-serif italic text-sm truncate">
              "{activeDial === 0
                ? (moodsEnabled
                    ? (MODE_SAMPLES[currentMode]?.mood || `${MODE_SAMPLES[currentMode]?.plain || 'Your adapted thoughts will flow here.'} ✨`)
                    : (MODE_SAMPLES[currentMode]?.plain || 'Your adapted thoughts will flow here.'))
                : (moodsEnabled
                    ? `${LANG_SAMPLES[currentLang] || 'Your translated voice appears here in real-time.'} ✨`
                    : (LANG_SAMPLES[currentLang] || 'Your translated voice appears here in real-time.'))}"
            </span>
          </div>
          {activeDial === 0 && (
            <span className="text-[11px] font-mono text-[#8d6e63] shrink-0 hidden sm:inline">
              {moodsEnabled ? 'Moods Active' : 'Neutral Tone'}
            </span>
          )}
        </div>

        {/* Customization Chips Section */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-[#8d6e63]/15 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2b170e] tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8d5e3b]" />
              {activeDial === 0 ? 'Customise Showcased Personas' : 'Customise Showcased Languages'}
            </span>
            <span className="text-xs text-[#8d6e63]/70 font-serif italic">
              Click chips to showcase or hide on dial
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {activeDial === 0 ? (
              ALL_DIAL_MODES.map(m => {
                const isSelected = dialModes.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => toggleDialMode(m)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#2b170e] text-[#fdfaf6] border-[#2b170e] shadow-xs hover:bg-[#3e2417]'
                        : 'bg-white/80 text-[#5d4037]/65 border-[#8d6e63]/20 hover:border-[#8d6e63]/40 hover:text-[#2b170e]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3 text-[#e8d5b5] stroke-[2.5]" /> : <Plus className="w-3 h-3 opacity-40" />}
                    <span>{m}</span>
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
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#2b170e] text-[#fdfaf6] border-[#2b170e] shadow-xs hover:bg-[#3e2417]'
                        : 'bg-white/80 text-[#5d4037]/65 border-[#8d6e63]/20 hover:border-[#8d6e63]/40 hover:text-[#2b170e]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3 text-[#e8d5b5] stroke-[2.5]" /> : <Plus className="w-3 h-3 opacity-40" />}
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
