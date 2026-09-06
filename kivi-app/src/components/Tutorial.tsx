import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cat, Mic, Terminal, Briefcase, MessageCircle, Mail, Settings, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [slide, setSlide] = useState(0);
  const totalSlides = 11;

  const nextSlide = () => {
    if (slide < totalSlides - 1) setSlide(s => s + 1);
  };

  const prevSlide = () => {
    if (slide > 0) setSlide(s => s - 1);
  };

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
        <div className="flex flex-col items-center justify-center -mt-8 max-w-4xl text-center">
          <h1 className="text-7xl font-serif font-medium tracking-tight mb-8">
            Meet <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">WhisPURR.</span>
          </h1>
          <p className="text-3xl text-[#3e2723] font-serif italic mb-8">
            Your thoughts, seamlessly translated into work.
          </p>
          <p className="text-xl text-[#3e2723]/70 font-sans mb-10 leading-relaxed max-w-3xl">
            Kivi stays quietly in the background as you move between contexts. Speak naturally, and it adapts your words to where you are — so you spend less time switching, rephrasing, and managing AI.
          </p>
          <p className="text-2xl text-[#3e2723] font-serif font-bold italic mb-12">
            Fast. Flexible. Quietly there.
          </p>
          <div className="w-32 h-32 bg-[#3e2723] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(141,110,99,0.3)]">
            <Cat size={48} className="text-[#f4ece1]/90" />
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col items-center justify-center -mt-16">
          <h1 className="text-7xl font-serif font-medium tracking-tight mb-6 flex items-center gap-4">
            tap <span className="px-4 py-2 bg-[#a1887f] text-[#f4ece1] rounded-2xl text-5xl font-sans font-bold shadow-md">fn</span>
          </h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-20">—try saying "How are you doing Kivi?"</p>
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-white border border-[#3e2723]/10 mb-12 shadow-xl">
            <Mic size={48} className="text-[#8d6e63] animate-pulse" />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-6">degree of <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">change.</span></h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-16 max-w-lg text-center">—tap once, say "make it formal", then tap fn.</p>
          <div className="flex gap-4 items-center">
            <div className="px-6 py-3 rounded-2xl bg-white border border-[#8d6e63] text-[#3e2723] font-sans font-bold text-xl shadow-sm">fn</div>
            <div className="text-4xl text-[#3e2723]/40 mt-1">+</div>
            <div className="px-6 py-3 rounded-2xl bg-white border border-[#3e2723]/20 text-[#3e2723]/80 font-sans font-bold text-xl shadow-sm">^</div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">make it <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">yours.</span></h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-16">—the keys you'll press a hundred times a day.</p>
          <div className="flex gap-6">
            {['fn', 'cmd (right)', 'ctrl'].map((key, i) => (
              <div key={i} className={`px-10 py-8 rounded-3xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-[#8d6e63] bg-[#8d6e63]/10 text-[#3e2723]' : 'border-[#3e2723]/10 bg-white text-[#3e2723]/60 hover:border-[#3e2723]/30'}`}>
                <span className="text-2xl font-sans font-bold">{key}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">make it <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">yours.</span></h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-16">—how much of me you keep on screen.</p>
          <div className="flex gap-6">
            {[
              { t: 'radial', d: 'bottom cluster' },
              { t: 'minimal', d: 'tiny icon' },
              { t: 'stealth', d: 'invisible' }
            ].map((opt, i) => (
              <div key={i} className={`w-48 h-48 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${i === 0 ? 'border-[#8d6e63] bg-[#8d6e63]/10 text-[#3e2723]' : 'border-[#3e2723]/10 bg-white text-[#3e2723]/60 hover:border-[#3e2723]/30'}`}>
                <span className="text-2xl font-bold mb-2">{opt.t}</span>
                <span className="text-sm opacity-80">{opt.d}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 5:
      return <SurveySlide title="developer." icon={<Terminal />} options={[
        { n: 'clear', d: 'the full instruction, plainly.' },
        { n: 'concise', d: 'the fewest words that still say it.' },
        { n: 'structured', d: 'goal, changes, validation.' }
      ]} />;
    case 6:
      return <SurveySlide title="work messaging." icon={<Briefcase />} options={[
        { n: 'clear', d: 'clean sentences, shorthand kept.' },
        { n: 'casual', d: 'lowercase workplace shorthand.' },
        { n: 'formal', d: 'everything spelled out, properly.' }
      ]} />;
    case 7:
      return <SurveySlide title="personal messaging." icon={<MessageCircle />} options={[
        { n: 'natural', d: 'light cleanup, your voice kept.' },
        { n: 'very casual', d: 'lowercase, shorthand, zero fuss.' },
        { n: 'polished', d: 'full punctuation and grammar.' }
      ]} />;
    case 8:
      return <SurveySlide title="email." icon={<Mail />} options={[
        { n: 'professional', d: 'conventional and to the point.' },
        { n: 'friendly', d: 'the same note, with warmth.' },
        { n: 'formal', d: 'highest formality, full forms.' }
      ]} />;
    case 9:
      return <SurveySlide title="other apps." icon={<Settings />} options={[
        { n: 'balanced', d: 'cleaned, but still yours.' },
        { n: 'minimal', d: 'compressed to fragments.' },
        { n: 'polished', d: 'composed, complete sentences.' }
      ]} />;
    case 10:
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-7xl font-serif font-medium tracking-tight mb-4 text-[#3e2723]">off you <span className="relative z-10 before:content-[''] before:absolute before:inset-x-0 before:bottom-2 before:h-4 before:bg-[#d7ccc8] before:-z-10">go.</span></h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-16">—I'll be at the bottom of your screen. just talk.</p>
          <button 
            onClick={onComplete}
            className="px-8 py-4 bg-[#8d6e63] hover:bg-[#795548] text-[#f4ece1] font-bold rounded-2xl flex items-center gap-3 transition-colors text-xl shadow-lg hover:shadow-xl"
          >
            <Cat size={28} />
            launch kivi
          </button>
        </div>
      );
    default:
      return null;
  }
}

function SurveySlide({ title, icon, options }: { title: string, icon: React.ReactNode, options: { n: string, d: string }[] }) {
  const [selected, setSelected] = useState(0);
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-[#3e2723]/40">{icon}</span>
        <h2 className="text-2xl font-mono text-[#3e2723]/40 tracking-tight">styles survey.</h2>
      </div>
      <h1 className="text-6xl font-serif font-medium tracking-tight mb-16">{title}</h1>
      
      <div className="flex gap-6 w-full justify-center">
        {options.map((opt, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(i)}
            className={`relative w-72 h-64 rounded-3xl border-2 p-6 cursor-pointer transition-all flex flex-col justify-end ${
              selected === i 
                ? 'border-[#8d6e63] bg-[#8d6e63]/10 text-[#3e2723]' 
                : 'border-[#3e2723]/10 bg-white text-[#3e2723]/70 hover:border-[#3e2723]/30'
            }`}
          >
            {selected === i && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#8d6e63] rounded-full flex items-center justify-center text-[#f4ece1] shadow-md">
                <Check size={18} strokeWidth={3} />
              </div>
            )}
            <div className="flex-1 bg-[#f4ece1] rounded-2xl mb-6 p-4 border border-[#3e2723]/5 flex flex-col justify-center">
              <div className="w-12 h-2 bg-[#3e2723]/10 rounded-full mb-3"></div>
              <div className="w-full h-2 bg-[#3e2723]/20 rounded-full mb-2"></div>
              <div className="w-3/4 h-2 bg-[#3e2723]/20 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-1 font-sans">{opt.n}</h3>
            <p className="text-sm opacity-80 font-serif italic">{opt.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
