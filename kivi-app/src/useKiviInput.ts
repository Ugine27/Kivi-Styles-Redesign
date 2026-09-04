import { useState, useEffect, useRef } from 'react';
import { transformText } from './transformEngine';

export type Mode = 'PULSE' | 'LEGO' | 'FLOW';
export const MODES: Mode[] = ['PULSE', 'LEGO', 'FLOW'];

export function useKiviInput() {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hudPos, setHudPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [mode, setMode] = useState<Mode>('PULSE');
  const [degree, setDegree] = useState(2);
  const [transcript, setTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let currentStr = '';
        for (let i = 0; i < event.results.length; i++) {
          currentStr += event.results[i][0].transcript;
        }
        setTranscript(currentStr);
      };
      
      recognitionRef.current.onerror = (e: any) => console.error("Speech Recognition Error:", e.error);
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        e.preventDefault();
        if (!isAltPressed) {
          setIsAltPressed(true);
          setTranscript(''); // clear old transcript on fresh start
          setTranslatedText(''); // clear previous translation
          try {
            recognitionRef.current?.start();
          } catch (err) {
            // ignore if already started
          }
        }
      }
      if (isAltPressed) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          // Keep the HUD awake while adjusting
          setIsScrolling(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1500);

          if (e.key === 'ArrowLeft') {
            setDegree(prev => Math.max(1, prev - 1));
          } else if (e.key === 'ArrowRight') {
            setDegree(prev => Math.min(3, prev + 1));
          } else if (e.key === 'ArrowDown') {
            setMode(prev => {
              const idx = MODES.indexOf(prev);
              return MODES[(idx + 1) % MODES.length];
            });
          } else if (e.key === 'ArrowUp') {
            setMode(prev => {
              const idx = MODES.indexOf(prev);
              return MODES[(idx - 1 + MODES.length) % MODES.length];
            });
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltPressed(false);
        setIsScrolling(false);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        
        try {
          recognitionRef.current?.stop();
        } catch (err) {}
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAltPressed) {
        e.preventDefault();
        
        if (!isScrolling) {
          setHudPos({ x: e.clientX, y: e.clientY });
          setIsScrolling(true);
          
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1500);
          
          return;
        }
        
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1500);

        const currentIndex = MODES.indexOf(mode);
        if (e.deltaY > 0) {
          setMode(MODES[(currentIndex + 1) % MODES.length]);
        } else {
          setMode(MODES[(currentIndex - 1 + MODES.length) % MODES.length]);
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
  }, [isAltPressed, isScrolling, mode]);

  // Debounced Gemini API Call
  useEffect(() => {
    if (!transcript.trim()) {
      setTranslatedText('');
      return;
    }
    
    setIsLoading(true);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(async () => {
      const result = await transformText(transcript, mode, degree);
      setTranslatedText(result);
      setIsLoading(false);
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [transcript, mode, degree]);

  return { isAltPressed, isScrolling, isLoading, hudPos, mode, degree, transcript, translatedText };
}
