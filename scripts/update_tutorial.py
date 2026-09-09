import re

with open("kivi-app/src/components/Tutorial.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Change totalSlides = 11 to 10
content = re.sub(r'const totalSlides = 11;', 'const totalSlides = 10;', content)

new_render = """function renderSlideContent(index: number, onComplete: () => void) {
  const imgClass = "h-64 w-auto object-cover mb-8 rounded-2xl shadow-xl border-4 border-white/50";
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
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/slide_2.png" className={imgClass} alt="Slide 2" />
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">Hold Fn to Speak.</h1>
          <p className="text-xl text-[#3e2723]/70 font-serif italic mb-12 max-w-2xl">Press and hold to talk. WhisPURR listens and types directly where your cursor rests.</p>
          <div className="px-8 py-4 bg-white rounded-2xl border border-[#3e2723]/20 shadow-md text-[#3e2723]/60 font-mono">
            Press and hold Fn to talk.
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/slide_3.png" className={imgClass} alt="Slide 3" />
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">Tap Fn + ^ for Commands.</h1>
          <p className="text-xl text-[#3e2723]/70 font-serif italic mb-12 max-w-2xl">Tap once to give an instruction like, "Make this polite," then tap Fn to let WhisPURR execute it.</p>
          <div className="px-8 py-4 bg-white rounded-2xl border border-[#3e2723]/20 shadow-md text-[#3e2723]/60 font-mono animate-pulse">
            (Listening...)
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/slide_4.png" className={imgClass} alt="Slide 4" />
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">Pick Your Paws.</h1>
          <p className="text-xl text-[#3e2723]/70 font-serif italic mb-12 max-w-2xl">Customize the shortcuts you'll use to trigger dictation and commands every day.</p>
          <p className="text-sm font-bold text-[#3e2723]/40 uppercase tracking-widest mb-6">Click a key to change it.</p>
          <div className="flex gap-6">
            <div className="px-8 py-6 bg-[#8d6e63]/10 border-2 border-[#8d6e63] rounded-3xl flex flex-col items-center">
              <span className="text-sm opacity-60 mb-2">Dictation</span>
              <span className="text-2xl font-bold">Fn</span>
            </div>
            <div className="px-8 py-6 bg-white border-2 border-[#3e2723]/10 rounded-3xl flex flex-col items-center">
              <span className="text-sm opacity-60 mb-2">Hey, WhisPURR.</span>
              <span className="text-2xl font-bold">Fn + ^</span>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/slide_5.png" className={imgClass} alt="Slide 5" />
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">Shape Your Companion.</h1>
          <p className="text-xl text-[#3e2723]/70 font-serif italic mb-12 max-w-2xl">Choose how WhisPURR visually anchors to your screen while you work.</p>
          <p className="text-sm font-bold text-[#3e2723]/40 uppercase tracking-widest mb-6">Click the form you'd like to keep on screen.</p>
          <div className="flex gap-4">
            {['Orb', 'Mini', 'Pill'].map((opt, i) => (
              <div key={i} className={`px-8 py-4 rounded-2xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-[#8d6e63] bg-[#8d6e63]/10 text-[#3e2723]' : 'border-[#3e2723]/10 bg-white text-[#3e2723]/60'}`}>
                <span className="text-xl font-bold">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 5:
      return <SurveySlide title="Developer Blueprints." img="/slide_6.png" subtext="Pick how WhisPURR structures your technical prompts and terminal commands." options={[
        { n: 'Clear', d: 'The full instruction, plainly.' },
        { n: 'Concise', d: 'The fewest words possible.' },
        { n: 'Structured', d: 'Goal, changes, validation.' }
      ]} />;
    case 6:
      return <SurveySlide title="Chat Registers." img="/slide_7.png" subtext="Choose how WhisPURR adapts your voice for fast-twitch channels like Slack or Teams." options={[
        { n: 'Clear', d: 'Clean sentences; shorthand kept.' },
        { n: 'Casual', d: 'Lowercase workplace shorthand.' },
        { n: 'Formal', d: 'Everything spelled out properly.' }
      ]} />;
    case 7:
      return <SurveySlide title="Inbox Registers." img="/slide_9.png" subtext="Set the baseline tone WhisPURR uses to draft high-context emails." options={[
        { n: 'Professional', d: 'Conventional and to the point.' },
        { n: 'Friendly', d: 'The same note, with warmth.' },
        { n: 'Formal', d: 'Highest formality, full forms.' }
      ]} />;
    case 8:
      return <SurveySlide title="Global Context." img="/slide_10.png" subtext="Pick WhisPURR's default structural baseline when prowling through other applications." options={[
        { n: 'Balanced', d: 'Cleaned, but still your voice.' },
        { n: 'Minimal', d: 'Compressed to fragments.' },
        { n: 'Polished', d: 'Composed, complete sentences.' }
      ]} />;
    case 9:
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/slide_11.png" className={imgClass} alt="Slide 11" />
          <h1 className="text-6xl font-serif font-medium tracking-tight mb-4 text-[#3e2723]">You're Ready to Pounce.</h1>
          <p className="text-2xl text-[#3e2723]/60 font-serif italic mb-12 max-w-2xl">I'll be resting quietly at the bottom of your screen. Just hold your shortcut and speak.</p>
          <button 
            onClick={onComplete}
            className="px-8 py-4 bg-[#8d6e63] hover:bg-[#795548] text-[#f4ece1] font-bold rounded-2xl flex items-center gap-3 transition-colors text-xl shadow-lg hover:shadow-xl"
          >
            Launch WhisPURR
          </button>
        </div>
      );
    default:
      return null;
  }
}

function SurveySlide({ title, img, subtext, options }: { title: string, img: string, subtext: string, options: { n: string, d: string }[] }) {
  const [selected, setSelected] = useState(0);
  
  return (
    <div className="flex flex-col items-center w-full text-center">
      <img src={img} className="h-48 w-auto object-cover mb-6 rounded-2xl shadow-xl border-4 border-white/50" alt={title} />
      <h1 className="text-5xl font-serif font-medium tracking-tight mb-4">{title}</h1>
      <p className="text-xl text-[#3e2723]/70 font-serif italic mb-10 max-w-2xl">{subtext}</p>
      
      <div className="flex gap-6 w-full justify-center">
        {options.map((opt, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(i)}
            className={`relative w-64 h-56 rounded-3xl border-2 p-6 cursor-pointer transition-all flex flex-col justify-end ${
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
            <div className="flex-1 bg-[#f4ece1] rounded-2xl mb-4 p-4 border border-[#3e2723]/5 flex flex-col justify-center">
              <div className="w-10 h-2 bg-[#3e2723]/10 rounded-full mb-3"></div>
              <div className="w-full h-2 bg-[#3e2723]/20 rounded-full mb-2"></div>
              <div className="w-2/3 h-2 bg-[#3e2723]/20 rounded-full"></div>
            </div>
            <h3 className="text-lg font-bold mb-1 font-sans">{opt.n}</h3>
            <p className="text-xs opacity-80 font-serif italic">{opt.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
"""

start_idx = content.find("function renderSlideContent")
content = content[:start_idx] + new_render

with open("kivi-app/src/components/Tutorial.tsx", "w", encoding="utf-8") as f:
    f.write(content)
