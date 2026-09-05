import { useEffect, useState } from 'react';
import { useKiviInput } from './useKiviInput';
import KiviHUD from './components/KiviHUD';
import MockOS from './components/MockOS';
import Tutorial from './components/Tutorial';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const { isAltPressed, isScrolling, isLoading, hudPos, mode, setMode, degree, setDegree, translatedText, toggleListening } = useKiviInput();
  const [showTutorial, setShowTutorial] = useState(() => {
    return localStorage.getItem('kivi_onboarding_complete') !== 'true';
  });

  // Enter full screen on first user interaction to sell the OS feel
  useEffect(() => {
    const goFullscreen = async () => {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (e) {}
      }
    };
    window.addEventListener('click', goFullscreen, { once: true });
    return () => window.removeEventListener('click', goFullscreen);
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('kivi_onboarding_complete', 'true');
    setShowTutorial(false);
  };

  return (
    <div className="relative w-screen h-screen bg-neutral-900 overflow-hidden flex flex-col font-sans">
      <AnimatePresence>
        {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}
      </AnimatePresence>

      <MockOS 
        activeText={(!isAltPressed && !isLoading && translatedText) ? translatedText : ''} 
        mode={mode} 
        setMode={setMode}
        degree={degree}
        setDegree={setDegree}
        isAltPressed={isAltPressed} 
        isLoading={isLoading}
        toggleListening={toggleListening}
      />
      
      <AnimatePresence>
        {isAltPressed && isScrolling && (
          <KiviHUD mode={mode} position={hudPos} degree={degree} />
        )}
      </AnimatePresence>
    </div>
  );
}
