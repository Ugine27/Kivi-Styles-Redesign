import React, { useState, useEffect } from 'react';
import KiviCatIcon from './KiviCatIcon';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Terminal, Briefcase, MessageCircle, Mail, Settings, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [slide, setSlide] = useState(0);
  const totalSlides = 10;

  const nextSlide = () => {
    if (slide < totalSlides - 1) setSlide(s => s + 1);
  };

  const prevSlide = () => {
    if (slide > 0) setSlide(s => s - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide]);

  const tutorialContent = (
    <div className="fixed inset-0 z-[9999] bg-[#f4ece1] text-[#3e2723] flex flex-col justify-between overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-8 z-10">
        <button 
          onClick={onComplete}
          className="text-[#3e2723]/60 hover:text-[#3e2723] font-mono text-sm tracking-widest border-b-2 border-transparent hover:border-[#8d6e63] transition-all pb-1"
        >
          skip
        </button>
        <div className="text-[#3e2723]/60 font-mono text-sm tracking-widest">
          {String(slide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-5xl"
          >
            {renderSlideContent(slide, onComplete)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 w-32 flex items-center justify-center z-20 pointer-events-none">
        {slide > 0 && (
          <button 
            onClick={prevSlide}
            className="pointer-events-auto p-4 text-[#3e2723]/40 hover:text-[#8d6e63] transition-colors"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 w-32 flex items-center justify-center z-20 pointer-events-none">
        {slide < totalSlides - 1 && (
          <button 
            onClick={nextSlide}
            className="pointer-events-auto p-4 text-[#3e2723]/40 hover:text-[#8d6e63] transition-colors"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        )}
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-3 pb-12 z-10">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${
              i === slide ? 'w-8 bg-[#8d6e63]' : 'w-2 bg-[#3e2723]/20'
            }`}
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
        <div className="flex flex-col items-start justify-center -mt-8 max-w-4xl text-left">
          <h1 className="text-7xl font-serif font-medium tracking-tight mb-8">
            Meet <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">WhisPURR.</span>
          </h1>
          <div className="border-l-4 border-[#8d6e63]/30 pl-8 ml-2">
            <p className="text-3xl text-[#3e2723] font-serif italic mb-6">
              Your thoughts, seamlessly translated into work.
            </p>
            <p className="text-xl text-[#3e2723]/70 font-sans mb-6 leading-relaxed">
              WhisPURR stays quietly in the background as you move between contexts. Speak naturally, and it adapts your words to where you are.
            </p>
            <p className="text-2xl text-[#3e2723] font-serif font-bold italic">
              Fast. Flexible. Quietly there.
            </p>
          </div>
          <div className="mt-16 self-center w-32 h-32 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(141,110,99,0.3)] overflow-hidden border-4 border-[#3e2723]">
            <img src="/kivi_icon.png" className="w-full h-full object-cover" />
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col items-center justify-center -mt-16 text-center">
          <h1 className="text-7xl font-serif font-medium tracking-tight mb-6 flex items-center gap-4">
            Hold <span className="px-4 py-2 bg-[#a1887f] text-[#f4ece1] rounded-2xl text-5xl font-sans font-bold shadow-md">fn</span> to Speak.
          </h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-20 max-w-2xl">
            - press and hold to talk. WhisPURR listens and types directly where your cursor rests.
          </p>
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white border border-[#3e2723]/10 mb-8 shadow-xl">
            <Mic size={48} className="text-[#8d6e63] animate-pulse" />
          </div>
          <div className="px-8 py-4 bg-white rounded-2xl border border-[#3e2723]/20 shadow-md text-[#3e2723]/60 font-mono">
            Press and hold Fn to talk.
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center justify-center -mt-12 text-center">
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-6 flex items-center gap-4">
            Tap <span className="px-4 py-2 bg-[#a1887f] text-[#f4ece1] rounded-2xl text-4xl font-sans font-bold shadow-md">fn</span> + <span className="px-4 py-2 bg-[#a1887f] text-[#f4ece1] rounded-2xl text-4xl font-sans font-bold shadow-md">^</span> for Commands.
          </h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-20 max-w-2xl">
            - tap once to give an instruction like, "Make this polite," then tap fn to let WhisPURR execute it.
          </p>
          <div className="px-10 py-6 bg-white rounded-3xl border border-[#3e2723]/20 shadow-xl text-[#3e2723]/60 font-mono text-xl animate-pulse">
            (Listening...)
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center justify-center -mt-12 text-center">
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">Pick Your <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">Paws.</span></h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-16 max-w-2xl">
            - customize the shortcuts you'll use to trigger dictation and commands every day.
          </p>
          <p className="text-sm font-bold text-[#3e2723]/40 uppercase tracking-widest mb-8">Click a key to change it.</p>
          <div className="flex gap-8">
            <div className="px-10 py-8 bg-[#8d6e63]/10 border-2 border-[#8d6e63] rounded-3xl flex flex-col items-center cursor-pointer hover:bg-[#8d6e63]/20 transition-colors shadow-md">
              <span className="text-lg opacity-60 mb-4 font-serif italic">Dictation</span>
              <span className="text-4xl font-sans font-bold text-[#3e2723]">fn</span>
            </div>
            <div className="px-10 py-8 bg-white border-2 border-[#3e2723]/10 rounded-3xl flex flex-col items-center cursor-pointer hover:border-[#3e2723]/30 transition-colors">
              <span className="text-lg opacity-60 mb-4 font-serif italic">Hey, WhisPURR.</span>
              <span className="text-4xl font-sans font-bold text-[#3e2723]/60">fn + ^</span>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center justify-center -mt-12 text-center">
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">Shape Your <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">Companion.</span></h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-16 max-w-2xl">
            - choose how WhisPURR visually anchors to your screen while you work.
          </p>
          <p className="text-sm font-bold text-[#3e2723]/40 uppercase tracking-widest mb-8">Click the form you'd like to keep on screen.</p>
          <div className="flex gap-6">
            {['Orb', 'Mini', 'Pill'].map((opt, i) => (
              <div key={i} className={`w-40 h-40 rounded-[2.5rem] border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${i === 0 ? 'border-[#8d6e63] bg-[#8d6e63]/10 text-[#3e2723] shadow-lg scale-105' : 'border-[#3e2723]/10 bg-white text-[#3e2723]/60 hover:border-[#3e2723]/30'}`}>
                <span className="text-2xl font-bold">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 5:
      return <SurveySlide title="Developer Blueprints." icon={<Terminal size={32} />} subtext="Pick how WhisPURR structures your technical prompts and terminal commands." options={[
        { n: 'Clear', d: 'The full instruction, plainly.' },
        { n: 'Concise', d: 'The fewest words possible.' },
        { n: 'Structured', d: 'Goal, changes, validation.' }
      ]} />;
    case 6:
      return <SurveySlide title="Chat Registers." icon={<MessageCircle size={32} />} subtext="Choose how WhisPURR adapts your voice for fast-twitch channels like Slack or Teams." options={[
        { n: 'Clear', d: 'Clean sentences; shorthand kept.' },
        { n: 'Casual', d: 'Lowercase workplace shorthand.' },
        { n: 'Formal', d: 'Everything spelled out properly.' }
      ]} />;
    case 7:
      return <SurveySlide title="Inbox Registers." icon={<Mail size={32} />} subtext="Set the baseline tone WhisPURR uses to draft high-context emails." options={[
        { n: 'Professional', d: 'Conventional and to the point.' },
        { n: 'Friendly', d: 'The same note, with warmth.' },
        { n: 'Formal', d: 'Highest formality, full forms.' }
      ]} />;
    case 8:
      return <SurveySlide title="Global Context." icon={<Briefcase size={32} />} subtext="Pick WhisPURR's default structural baseline when prowling through other applications." options={[
        { n: 'Balanced', d: 'Cleaned, but still your voice.' },
        { n: 'Minimal', d: 'Compressed to fragments.' },
        { n: 'Polished', d: 'Composed, complete sentences.' }
      ]} />;
    case 9:
      return (
        <div className="flex flex-col items-center justify-center -mt-16 text-center">
          <h1 className="text-7xl font-serif font-medium tracking-tight mb-6 text-[#3e2723]">You're Ready to <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">Pounce.</span></h1>
          <p className="text-3xl text-[#3e2723]/60 font-serif italic mb-20 max-w-2xl">
            - I'll be resting quietly at the bottom of your screen. Just hold your shortcut and speak.
          </p>
          <button 
            onClick={onComplete}
            className="px-10 py-5 bg-[#8d6e63] hover:bg-[#795548] text-[#f4ece1] font-bold rounded-2xl flex items-center gap-4 transition-all hover:scale-105 text-2xl shadow-xl hover:shadow-2xl"
          >
            <img src="/kivi_icon.png" className="w-8 h-8 rounded-full shadow-sm" alt="Icon" />
            Launch WhisPURR
          </button>
        </div>
      );
    default:
      return null;
  }
}

function SurveySlide({ title, icon, subtext, options }: { title: string, icon: React.ReactNode, subtext: string, options: { n: string, d: string }[] }) {
  const [selected, setSelected] = useState(0);
  
  return (
    <div className="flex flex-col items-center w-full text-center -mt-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#3e2723]/40">{icon}</span>
        <h2 className="text-2xl font-mono text-[#3e2723]/40 tracking-tight">styles survey.</h2>
      </div>
      <h1 className="text-6xl font-serif font-medium tracking-tight mb-6">{title}</h1>
      <p className="text-2xl text-[#3e2723]/70 font-serif italic mb-16 max-w-3xl">- {subtext}</p>
      
      <div className="flex gap-6 w-full justify-center">
        {options.map((opt, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(i)}
            className={`relative w-72 h-64 rounded-3xl border-2 p-8 cursor-pointer transition-all flex flex-col justify-end ${
              selected === i 
                ? 'border-[#8d6e63] bg-[#8d6e63]/10 text-[#3e2723] scale-105 shadow-xl z-10' 
                : 'border-[#3e2723]/10 bg-white text-[#3e2723]/70 hover:border-[#3e2723]/30 hover:shadow-md'
            }`}
          >
            {selected === i && (
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#8d6e63] rounded-full flex items-center justify-center text-[#f4ece1] shadow-lg">
                <Check size={24} strokeWidth={3} />
              </div>
            )}
            <div className="flex-1 bg-[#f4ece1] rounded-2xl mb-6 p-5 border border-[#3e2723]/5 flex flex-col justify-center shadow-inner">
              <div className="w-12 h-2 bg-[#3e2723]/10 rounded-full mb-4"></div>
              <div className="w-full h-2 bg-[#3e2723]/20 rounded-full mb-3"></div>
              <div className="w-3/4 h-2 bg-[#3e2723]/20 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-bold mb-2 font-sans">{opt.n}</h3>
            <p className="text-base opacity-80 font-serif italic leading-snug">{opt.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
