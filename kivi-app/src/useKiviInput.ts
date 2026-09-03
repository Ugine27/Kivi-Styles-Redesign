import { useState, useEffect } from 'react';
import { transformText } from './transformEngine';

export type Mode = 'PULSE' | 'LEGO' | 'FLOW';

export function useKiviInput() {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [mode, setMode] = useState<Mode>('PULSE');
  const [degree, setDegree] = useState(3);
  const [transcript, setTranscript] = useState('so yeah just tell the team that the server is down again and we need to reboot the main instance asap');
  const [translatedText, setTranslatedText] = useState('');

  const modes: Mode[] = ['PULSE', 'LEGO', 'FLOW'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        e.preventDefault();
        setIsAltPressed(true);
      }
      if (isAltPressed) {
        if (e.key === 'ArrowLeft') {
          setDegree(prev => Math.max(1, prev - 1));
        } else if (e.key === 'ArrowRight') {
          setDegree(prev => Math.min(5, prev + 1));
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltPressed(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAltPressed) {
        e.preventDefault();
        const currentIndex = modes.indexOf(mode);
        if (e.deltaY > 0) {
          // Scroll down
          setMode(modes[(currentIndex + 1) % modes.length]);
        } else {
          // Scroll up
          setMode(modes[(currentIndex - 1 + modes.length) % modes.length]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isAltPressed, mode, modes]);

  useEffect(() => {
    // Update translation when mode or degree changes
    setTranslatedText(transformText(transcript, mode, degree));
  }, [mode, degree, transcript]);

  return { isAltPressed, mode, degree, transcript, translatedText };
}
