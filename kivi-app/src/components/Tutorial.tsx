import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Briefcase, MessageCircle, Mail, ChevronRight, ChevronLeft, Check, Compass, Globe, Sparkles, Copy, Mic, PenLine, Users, FileText, CheckCircle } from 'lucide-react';
import { getSanitizedDialLanguages } from '../constants/languages';
import KiviCatIcon from './KiviCatIcon';

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [slide, setSlide] = useState(0);
  const totalSlides = 12;

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

function MeetingAssistantSlide() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-5xl px-4 select-none">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
        Your Virtual <span className="font-semibold italic text-[#8d5e3b]">Co-Pilot.</span>
      </h1>

      <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-7 max-w-lg leading-relaxed mx-auto">
        Let WhisPURR quietly handle transcriptions, overlays, and summaries for your meetings.
      </p>

      <div className="flex flex-wrap gap-4 sm:gap-5 justify-center w-full items-stretch">
        
        {/* Auto-Transcribe */}
        <div className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-default hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm group">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
            <Mic className="w-3.5 h-3.5 text-[#8d5e3b]" />
            <span>Auto-Transcribe</span>
          </span>

          <div className="my-auto py-3">
            <div className="w-16 h-16 rounded-2xl bg-[#faf6ee] shadow-inner flex items-center justify-center border border-[#3e2723]/10 mx-auto">
              <Users className="w-8 h-8 text-[#8d5e3b]" />
            </div>
          </div>

          <p className="text-[#5d4037]/70 text-sm font-medium leading-relaxed px-2">
            Automatically detect and transcribe Zoom or Teams calls.
          </p>
        </div>

        {/* Invisible Overlay */}
        <div className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-default hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm group">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#8d5e3b]" />
            <span>Live Overlay</span>
          </span>

          <div className="my-auto py-3 relative">
            <div className="w-16 h-16 rounded-2xl bg-[#faf6ee] shadow-inner flex flex-col items-center justify-center border border-[#3e2723]/10 mx-auto overflow-hidden p-2">
              <div className="w-full h-3 bg-[#8d5e3b]/20 rounded-md mb-2" />
              <div className="w-full h-1.5 bg-[#8d5e3b]/10 rounded-full mb-1" />
              <div className="w-3/4 h-1.5 bg-[#8d5e3b]/10 rounded-full" />
            </div>
          </div>

          <p className="text-[#5d4037]/70 text-sm font-medium leading-relaxed px-2">
            See a floating, transparent overlay of live dictations over your call.
          </p>
        </div>

        {/* Meeting Summary */}
        <div className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-default hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm group">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
            <CheckCircle className="w-3.5 h-3.5 text-[#8d5e3b]" />
            <span>AI Summary</span>
          </span>

          <div className="my-auto py-3">
             <div className="w-16 h-16 rounded-2xl bg-[#faf6ee] shadow-inner flex items-center justify-center border border-[#3e2723]/10 mx-auto">
              <FileText className="w-8 h-8 text-[#8d5e3b]" />
            </div>
          </div>

          <p className="text-[#5d4037]/70 text-sm font-medium leading-relaxed px-2">
            Generate concise AI summaries and action items when you end the call.
          </p>
        </div>

      </div>
    </div>
  );
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

function renderSlideContent(index: number, onComplete: () => void, _onNext?: () => void, goToSlide?: (idx: number) => void) {
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


        </div>
      );
    case 1:
      return (
        <div className="flex flex-col items-center justify-center -mt-4 max-w-3xl text-center relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-6 text-[#2b170e] leading-tight">
            Think, Talk & <span className="font-semibold italic text-[#8d5e3b]">Let it Type.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5d4037]/85 font-sans max-w-2xl leading-relaxed font-normal mt-4">
            WhisPURR doesn't speak or act for you. It helps your thoughts turn into the right words <span className="font-mono text-[#8d5e3b] font-semibold bg-[#8d5e3b]/10 px-2 py-0.5 rounded-md">@</span> the right place.
          </p>
        </div>
      );
    case 2:
      return <HoldOptionToSpeakSlide />;
    case 3:
      return <RadialDialsDemoSlide />;
    case 4:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl px-4 select-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
            Pick Your <span className="font-semibold italic text-[#8d5e3b]">Paws.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-7 max-w-lg leading-relaxed">
            Quick desktop shortcuts to dictate, edit, and spin radial dials.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-5 justify-center w-full items-stretch">
            {/* Hold to Talk */}
            <div 
              onClick={() => goToSlide?.(2)}
              className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Click to view Hold option to Speak slide"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <Mic className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Hold to Talk</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-5 py-2 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-sm sm:text-base text-[#2b170e] tracking-tight">
                  option
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium text-center">
                Instant Voice Typing
              </span>
            </div>

            {/* Quick Edit */}
            <div 
              className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Press option + control to edit or re-dictate the last sentence"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <PenLine className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Quick Edit</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-xs sm:text-sm text-[#2b170e] whitespace-nowrap tracking-tighter">
                  option + control
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium text-center">
                Re-dictate & Edit Text
              </span>
            </div>

            {/* Persona Dial */}
            <div 
              onClick={() => goToSlide?.(3)}
              className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Click to view Persona Dial slide"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <Compass className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Persona Dial</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-3 py-2 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-xs sm:text-sm text-[#2b170e] whitespace-nowrap tracking-tighter">
                  option + scroll
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium text-center">
                Spin 8 Personas
              </span>
            </div>

            {/* Language Dial */}
            <div 
              onClick={() => goToSlide?.(3)}
              className="w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[240px] h-[235px] p-5 bg-white/85 backdrop-blur-md border border-[#8d6e63]/20 rounded-3xl flex flex-col items-center justify-between cursor-pointer hover:border-[#8d6e63]/50 hover:shadow-xl hover:shadow-[#2b170e]/6 hover:-translate-y-1 transition-all duration-300 shadow-sm active:scale-95 group"
              title="Click to view Language Dial slide"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5d4037] bg-[#f4ebe1]/80 px-3.5 py-1 rounded-full border border-[#8d6e63]/15">
                <Globe className="w-3.5 h-3.5 text-[#8d5e3b]" />
                <span>Language Dial</span>
              </span>

              <div className="my-auto py-3">
                <span className="inline-flex items-center px-3 py-2 rounded-xl bg-white border border-[#8d6e63]/25 shadow-[0_3px_0_rgba(141,110,99,0.18)] font-mono font-semibold text-xs sm:text-sm text-[#2b170e] whitespace-nowrap tracking-tighter">
                  option + right-click
                </span>
              </div>

              <span className="text-xs text-[#5d4037]/75 font-sans font-medium text-center">
                Switch 23 Languages
              </span>
            </div>
          </div>
        </div>
      );
    case 5:
      return <MeetingAssistantSlide />;
    case 6:
      return <CompanionFormSlide />;
    case 7:
      return (
        <SurveySlide 
          title="Developer"
          highlight="Blueprints."
          icon={<Terminal size={18} className="text-[#8d5e3b]" />} 
          subtext="Choose how technical prompts and terminal commands are formatted." 
          storageKey="whispurr_pref_blueprints"
          options={[
            { 
              n: 'Clear', 
              d: 'The full instruction, plainly written.',
              preview: (
                <div className="font-mono text-[11px] text-[#5d4037] leading-relaxed">
                  <span className="text-[#8d5e3b] font-semibold">$</span> npm run build
                  <div className="text-[10px] text-[#5d4037]/60 mt-1">Plainly written, full instruction.</div>
                </div>
              )
            },
            { 
              n: 'Concise', 
              d: 'The fewest words and command flags.',
              preview: (
                <div className="font-mono text-[11px] text-[#5d4037] leading-relaxed">
                  <span className="text-[#8d5e3b] font-semibold">$</span> git push -f origin main
                  <div className="text-[10px] text-[#5d4037]/60 mt-1">Minimal syntax, no fluff.</div>
                </div>
              )
            },
            { 
              n: 'Structured', 
              d: 'Goal, code changes, and verification.',
              preview: (
                <div className="font-mono text-[10px] text-[#5d4037] leading-tight space-y-1">
                  <div><span className="text-[#8d5e3b] font-semibold">Goal:</span> fix auth race condition</div>
                  <div><span className="text-[#8d5e3b] font-semibold">Diff:</span> +3 lines, -1 line</div>
                  <div><span className="text-[#8d5e3b] font-semibold">Test:</span> pass (2/2)</div>
                </div>
              )
            }
          ]} 
        />
      );
    case 8:
      return (
        <SurveySlide 
          title="Chat"
          highlight="Registers."
          icon={<MessageCircle size={18} className="text-[#8d5e3b]" />} 
          subtext="Choose how your voice sounds in chat apps like Slack or Teams." 
          storageKey="whispurr_pref_chat_registers"
          options={[
            { 
              n: 'Clear', 
              d: 'Clean sentences; essential shorthand kept.',
              preview: (
                <div className="text-xs text-[#5d4037] font-sans leading-relaxed">
                  "Sounds great, let's sync right after the morning standup."
                </div>
              )
            },
            { 
              n: 'Casual', 
              d: 'Natural lowercase workplace shorthand.',
              preview: (
                <div className="text-xs text-[#5d4037] font-sans leading-relaxed">
                  "looks good to me! pushing updates now, thanks for catching that"
                </div>
              )
            },
            { 
              n: 'Formal', 
              d: 'Everything spelled out and articulated.',
              preview: (
                <div className="text-xs text-[#5d4037] font-sans leading-relaxed">
                  "Confirmed. I will review the documentation and provide feedback shortly."
                </div>
              )
            }
          ]} 
        />
      );
    case 9:
      return (
        <SurveySlide 
          title="Inbox"
          highlight="Registers."
          icon={<Mail size={18} className="text-[#8d5e3b]" />} 
          subtext="Choose your default tone for emails and correspondence." 
          storageKey="whispurr_pref_inbox_registers"
          options={[
            { 
              n: 'Professional', 
              d: 'Conventional, polished, and to the point.',
              preview: (
                <div className="text-xs text-[#5d4037] font-serif leading-relaxed italic">
                  "Good morning — please find the finalized proposal attached for review."
                </div>
              )
            },
            { 
              n: 'Friendly', 
              d: 'The exact same note, with warmth.',
              preview: (
                <div className="text-xs text-[#5d4037] font-serif leading-relaxed italic">
                  "Hope your week is off to a great start! Just wanted to share our project notes."
                </div>
              )
            },
            { 
              n: 'Formal', 
              d: 'Highest executive formality and structure.',
              preview: (
                <div className="text-xs text-[#5d4037] font-serif leading-relaxed italic">
                  "Dear Committee Members, I respectfully submit the quarterly assessment."
                </div>
              )
            }
          ]} 
        />
      );
    case 10:
      return (
        <SurveySlide 
          title="Global"
          highlight="Personas."
          icon={<Briefcase size={18} className="text-[#8d5e3b]" />} 
          subtext="Choose your baseline tone across other applications." 
          storageKey="whispurr_pref_global_personas"
          options={[
            { 
              n: 'Balanced', 
              d: 'Cleaned up, but authentically your voice.',
              preview: (
                <div className="text-xs text-[#5d4037] font-sans leading-relaxed">
                  "Balanced tone preserving natural intent with crisp, effortless phrasing."
                </div>
              )
            },
            { 
              n: 'Minimal', 
              d: 'Compressed to rapid bullet fragments.',
              preview: (
                <div className="text-xs text-[#5d4037] font-mono leading-tight space-y-1">
                  <div>• Key deliverables synced</div>
                  <div>• Zero unnecessary filler words</div>
                </div>
              )
            },
            { 
              n: 'Polished', 
              d: 'Composed, articulate complete sentences.',
              preview: (
                <div className="text-xs text-[#5d4037] font-serif leading-relaxed italic">
                  "Eloquent sentence cadence designed for high-impact writing."
                </div>
              )
            }
          ]} 
        />
      );
    case 11:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-4xl px-4 select-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
            You're Ready to <span className="font-semibold italic text-[#8d5e3b]">Pounce.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-7 max-w-md leading-relaxed">
            WhisPURR is docked and awaiting your cue. Hold your shortcut to speak.
          </p>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#8d6e63]/20 text-[#5d4037] text-xs font-mono shadow-2xs">
              <Mic className="w-3.5 h-3.5 text-[#8d5e3b]" />
              <span><strong className="text-[#2b170e]">option</strong> to dictate</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#8d6e63]/20 text-[#5d4037] text-xs font-mono shadow-2xs">
              <PenLine className="w-3.5 h-3.5 text-[#8d5e3b]" />
              <span><strong className="text-[#2b170e]">option + control</strong> to edit</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#8d6e63]/20 text-[#5d4037] text-xs font-mono shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#8d5e3b]" />
              <span><strong className="text-[#2b170e]">option + scroll</strong> personas</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#8d6e63]/20 text-[#5d4037] text-xs font-mono shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-[#8d5e3b]" />
              <span><strong className="text-[#2b170e]">option + right-click</strong> languages</span>
            </span>
          </div>

          <button 
            type="button"
            onClick={onComplete}
            className="px-8 py-4 rounded-full bg-[#2b170e] hover:bg-[#43261a] text-[#fdfaf6] text-base font-medium tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3.5 cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 border border-[#8d6e63]/30"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-[#faf6ee] shadow-inner flex items-center justify-center p-0.5">
              <img src="/kivi_icon.png" className="w-full h-full object-cover rounded-full" alt="WhisPURR Icon" />
            </div>
            <span className="font-serif tracking-wide text-lg">Launch WhisPURR</span>
            <span className="text-xs font-mono text-[#e8d5b5]/80 bg-white/10 px-2.5 py-1 rounded-md ml-1 border border-white/10">
              Enter ↵
            </span>
            <ChevronRight size={18} className="text-[#e8d5b5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      );
    default:
      return null;
  }
}

function SurveySlide({ 
  title, 
  highlight,
  icon, 
  subtext, 
  options,
  storageKey
}: { 
  title: string;
  highlight: string;
  icon: React.ReactNode; 
  subtext: string; 
  storageKey?: string;
  options: { 
    n: string; 
    d: string;
    preview?: React.ReactNode;
  }[];
}) {
  const [selected, setSelected] = useState<number>(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) {
          const idx = parseInt(saved, 10);
          if (!isNaN(idx) && idx >= 0 && idx < options.length) return idx;
        }
      } catch (e) {}
    }
    return 0;
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, String(index));
      } catch (e) {}
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl px-4 select-none">
      <div className="w-9 h-9 rounded-full bg-[#f4ebe1] border border-[#8d6e63]/25 flex items-center justify-center text-[#8d5e3b] mb-3 shadow-2xs">
        {icon}
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
        {title} <span className="font-semibold italic text-[#8d5e3b]">{highlight}</span>
      </h1>

      <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-7 max-w-lg leading-relaxed">
        {subtext}
      </p>

      <div className="flex flex-wrap gap-5 sm:gap-6 justify-center w-full items-stretch">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <div 
              key={opt.n} 
              onClick={() => handleSelect(i)}
              className={`w-full sm:w-[250px] min-h-[250px] p-6 rounded-3xl flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm active:scale-95 group text-left ${
                isSelected 
                  ? 'bg-white border-2 border-[#8d5e3b] shadow-xl shadow-[#2b170e]/8 scale-[1.03] ring-4 ring-[#8d5e3b]/15' 
                  : 'bg-white/80 backdrop-blur-md border border-[#8d6e63]/20 hover:border-[#8d6e63]/50 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Visual preview card */}
              <div className="w-full bg-[#faf6ee] rounded-2xl p-3.5 border border-[#8d6e63]/15 shadow-2xs mb-4 min-h-[82px] flex flex-col justify-center">
                {opt.preview}
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <span className="text-xl font-serif font-semibold block mb-1 text-[#2b170e]">
                  {opt.n}
                </span>
                <span className="text-xs text-[#5d4037]/75 block leading-relaxed">
                  {opt.d}
                </span>
              </div>

              {/* Status Indicator Chip */}
              <div className="flex items-center justify-between pt-1">
                <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded-full transition-all inline-flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#2b170e] text-[#e8d5b5] shadow-xs' 
                    : 'bg-[#f4ebe1] text-[#5d4037]/60 group-hover:text-[#5d4037]'
                }`}>
                  {isSelected && <Check size={11} strokeWidth={2.5} className="text-[#e8d5b5]" />}
                  <span>{isSelected ? 'Active' : 'Select'}</span>
                </span>
              </div>
            </div>
          );
        })}
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
  const [activeDial, setActiveDial] = useState<0 | 1>(0); // 0: Modes, 1: Languages
  const [modeRotation, setModeRotation] = useState(0);
  const [langRotation, setLangRotation] = useState(0);

  const [dialLanguages] = useState<string[]>(getSanitizedDialLanguages);

  const [dialModes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('whispurr_dial_modes');
      return saved ? JSON.parse(saved) : ['Formal', 'Casual', 'Developer', 'Prompts'];
    } catch (e) {
      return ['Formal', 'Casual', 'Developer', 'Prompts'];
    }
  });

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

  return (
    <div className="flex flex-col items-center w-full max-w-4xl text-center select-none px-2 sm:px-4">
      <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight mb-2 text-[#2b170e]">
        Seamless <span className="font-semibold italic text-[#8d5e3b]">Radial Dials.</span>
      </h1>
      <p className="text-base sm:text-lg text-[#5d4037]/80 font-serif italic mb-10 max-w-xl leading-relaxed">
        Hold <strong className="text-[#2b170e] font-sans font-semibold bg-[#f4ebe1] border border-[#8d6e63]/25 px-2 py-0.5 rounded-md text-xs">option</strong> to spin personas, or right-click to spin languages.
      </p>

      {/* Main Interactive Dial Simulator Card */}
      <div 
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        className="w-full max-w-[400px] h-[360px] relative flex flex-col items-center justify-center rounded-[3rem] bg-[#1a110e]/95 backdrop-blur-3xl shadow-[0_30px_80px_rgba(43,23,14,0.15)] border border-[#8d6e63]/30 overflow-hidden cursor-ns-resize group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#8d5e3b]/10 to-transparent pointer-events-none" />

        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(141,94,59,0.3)] border border-[#8d6e63]/40 bg-[#2b170e] text-[#fdfaf6]">
            {activeDial === 0 ? <Compass className="w-7 h-7 text-[#e8d5b5]" /> : <Globe className="w-7 h-7 text-[#e8d5b5]" />}
          </div>
          <div className="absolute top-[calc(100%+8px)] flex justify-center w-full">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#e8d5b5] font-semibold opacity-80 whitespace-nowrap">
              {activeDial === 0 ? 'Personas' : 'Languages'}
            </span>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {activeDial === 0 && (
            <motion.div
              key="persona-dial"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              {dialModes.map((modeName, i) => {
                const isActive = modeName === currentMode;
                const selectedIndex = modeRotation;
                const angle = 90 + (selectedIndex - i) * 45;
                
                const rad = (angle * Math.PI) / 180;
                const radius = 100;
                const x = Math.cos(rad) * radius;
                const y = -Math.sin(rad) * radius;

                const distance = Math.abs(i - selectedIndex);
                const scale = isActive ? 1.15 : Math.max(0.75, 0.95 - distance * 0.1);
                const itemOpacity = isActive ? 1 : Math.max(0, 0.6 - distance * 0.2);

                return (
                  <motion.div
                    key={modeName}
                    initial={false}
                    animate={{ x, y, scale, opacity: itemOpacity }}
                    transition={{ type: "spring", mass: 0.6, stiffness: 250, damping: 24 }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <div className={`-translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium shadow-xl backdrop-blur-md border transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-transparent text-white/50 border-transparent'
                    }`}>
                      {modeName}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeDial === 1 && (
            <motion.div
              key="lang-dial"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              {dialLanguages.map((langName, i) => {
                const isActive = i === langRotation;
                const selectedIndex = langRotation;
                const angle = 90 + (selectedIndex - i) * 45;
                
                const rad = (angle * Math.PI) / 180;
                const radius = 100;
                const x = Math.cos(rad) * radius;
                const y = -Math.sin(rad) * radius;

                const distance = Math.abs(i - selectedIndex);
                const scale = isActive ? 1.15 : Math.max(0.75, 0.95 - distance * 0.1);
                const itemOpacity = isActive ? 1 : Math.max(0, 0.6 - distance * 0.2);

                return (
                  <motion.div
                    key={langName}
                    initial={false}
                    animate={{ x, y, scale, opacity: itemOpacity }}
                    transition={{ type: "spring", mass: 0.6, stiffness: 250, damping: 24 }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <div className={`-translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium shadow-xl backdrop-blur-md border transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-transparent text-white/50 border-transparent'
                    }`}>
                      {langName}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-[#8d6e63] font-serif italic mt-6 opacity-80">
        Scroll with your mouse or use arrow keys
      </p>
    </div>
  );
}


