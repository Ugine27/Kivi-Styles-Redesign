import React, { useState } from 'react';
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

  return (
    <div className="fixed inset-0 z-[100] bg-neutral-900 text-neutral-100 flex flex-col justify-between overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-8 z-10">
        <button 
          onClick={onComplete}
          className="text-neutral-500 hover:text-neutral-300 font-mono text-sm tracking-widest border-b border-transparent hover:border-neutral-500 transition-all"
        >
          skip
        </button>
        <div className="text-neutral-500 font-mono text-sm tracking-widest">
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
            className="pointer-events-auto p-4 text-neutral-500 hover:text-orange-400 transition-colors"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 w-32 flex items-center justify-center z-20 pointer-events-none">
        {slide < totalSlides - 1 && (
          <button 
            onClick={nextSlide}
            className="pointer-events-auto p-4 text-neutral-500 hover:text-orange-400 transition-colors"
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
              i === slide ? 'w-8 bg-orange-400' : 'w-2 bg-neutral-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function renderSlideContent(index: number, onComplete: () => void) {
  switch (index) {
    case 0:
      return (
        <>
          <Cat size={120} className="text-orange-400 mb-8 stroke-[1.5]" />
          <h1 className="text-6xl font-bold tracking-tight mb-4">meet kivi.</h1>
          <p className="text-2xl text-neutral-400 italic">it walks the talk.</p>
        </>
      );
    case 1:
      return (
        <>
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-neutral-800/50 border border-neutral-700 mb-12">
            <Mic size={48} className="text-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold tracking-tight mb-4">tap fn</h1>
          <p className="text-2xl text-neutral-400">try saying "How are you doing Kivi?"</p>
        </>
      );
    case 2:
      return (
        <>
          <div className="flex gap-4 mb-12">
            <div className="px-6 py-3 rounded-xl bg-neutral-800 border border-orange-500/30 text-orange-400 font-mono text-xl">fn</div>
            <div className="text-4xl text-neutral-600 mt-1">+</div>
            <div className="px-6 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-xl">^</div>
          </div>
          <h1 className="text-6xl font-bold tracking-tight mb-4">degree of change.</h1>
          <p className="text-2xl text-neutral-400 text-center max-w-lg">tap once, say "make it formal", then tap fn.</p>
        </>
      );
    case 3:
      return (
        <>
          <h1 className="text-5xl font-bold tracking-tight mb-4">make it yours.</h1>
          <p className="text-xl text-neutral-400 mb-16">the keys you'll press a hundred times a day. choose wisely.</p>
          <div className="flex gap-6">
            {['fn', 'cmd (right)', 'ctrl'].map((key, i) => (
              <div key={i} className={`px-10 py-8 rounded-2xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'}`}>
                <span className="text-2xl font-mono">{key}</span>
              </div>
            ))}
          </div>
        </>
      );
    case 4:
      return (
        <>
          <h1 className="text-5xl font-bold tracking-tight mb-4">make it yours.</h1>
          <p className="text-xl text-neutral-400 mb-16">how much of me you keep on screen.</p>
          <div className="flex gap-6">
            {[
              { t: 'radial', d: 'bottom cluster' },
              { t: 'minimal', d: 'tiny icon' },
              { t: 'stealth', d: 'invisible' }
            ].map((opt, i) => (
              <div key={i} className={`w-48 h-48 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${i === 0 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-600'}`}>
                <span className="text-2xl font-bold mb-2">{opt.t}</span>
                <span className="text-sm opacity-60">{opt.d}</span>
              </div>
            ))}
          </div>
        </>
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
        <>
          <h1 className="text-6xl font-bold tracking-tight mb-4 text-emerald-400">off you go.</h1>
          <p className="text-2xl text-neutral-400 italic mb-16">—I'll be at the bottom of your screen. just talk.</p>
          <button 
            onClick={onComplete}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-neutral-900 font-bold rounded-2xl flex items-center gap-3 transition-colors text-xl"
          >
            <Cat size={28} />
            launch kivi
          </button>
        </>
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
        <span className="text-neutral-500">{icon}</span>
        <h2 className="text-2xl font-mono text-neutral-500">styles survey.</h2>
      </div>
      <h1 className="text-5xl font-bold tracking-tight mb-16">{title}</h1>
      
      <div className="flex gap-6 w-full justify-center">
        {options.map((opt, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(i)}
            className={`relative w-72 h-64 rounded-2xl border-2 p-6 cursor-pointer transition-all flex flex-col justify-end ${
              selected === i 
                ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                : 'border-neutral-800 bg-neutral-800/50 text-neutral-300 hover:border-neutral-600'
            }`}
          >
            {selected === i && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-neutral-900">
                <Check size={18} strokeWidth={3} />
              </div>
            )}
            <div className="flex-1 bg-neutral-900/50 rounded-xl mb-6 p-4 border border-neutral-800">
              <div className="w-12 h-2 bg-neutral-700 rounded-full mb-3"></div>
              <div className="w-full h-2 bg-neutral-800 rounded-full mb-2"></div>
              <div className="w-3/4 h-2 bg-neutral-800 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-1">{opt.n}</h3>
            <p className="text-sm opacity-60">{opt.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
