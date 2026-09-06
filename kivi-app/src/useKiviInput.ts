import { useState, useEffect, useRef } from 'react';
import { transformText } from './transformEngine';

export type Mode = 'Formal' | 'Casual' | 'Developer' | 'Prompts' | string;
export const MODES: Mode[] = ['Formal', 'Casual', 'Developer', 'Prompts'];

export function useKiviInput() {
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [mode, setModeState] = useState<Mode>(() => {
    try {
      return (localStorage.getItem('whispurr_mode') as Mode) || 'Formal';
    } catch (e) {
      return 'Formal';
    }
  });
  const [degree, setDegreeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('whispurr_degree');
      return saved ? Number(saved) : 2;
    } catch (e) {
      return 2;
    }
  });

  const setMode = (newMode: Mode | ((prev: Mode) => Mode)) => {
    setModeState(prev => {
      const next = typeof newMode === 'function' ? newMode(prev) : newMode;
      try {
        localStorage.setItem('whispurr_mode', next);
      } catch (e) {}
      return next;
    });
  };

  const setDegree = (newDegree: number | ((prev: number) => number)) => {
    setDegreeState(prev => {
      const next = typeof newDegree === 'function' ? newDegree(prev) : newDegree;
      try {
        localStorage.setItem('whispurr_degree', String(next));
      } catch (e) {}
      return next;
    });
  };

  const [transcript, setTranscript] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        setTranscript(currentText);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        
        debounceRef.current = setTimeout(async () => {
          if (currentText.trim()) {
            setIsLoading(true);
            const transformed = await transformText(currentText, mode, degree);
            setTranslatedText(transformed);
            setIsLoading(false);
          }
        }, 300);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsLoading(false);
      };

      recognitionRef.current.onend = () => {
        // Recognition ended
      };
    }
  }, [mode, degree]);

    // Handle Talk key down/up
  useEffect(() => {
    const formatKey = (eKey: string) => {
      let key = eKey;
      if (key === ' ') key = 'Space';
      else if (key === 'Control') key = 'Ctrl';
      else if (key === 'Meta') key = 'Cmd';
      if (key.length === 1) key = key.toUpperCase();
      return key;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const savedShortcut = localStorage.getItem('whispurr_talk') || 'Alt';
      if (formatKey(e.key) === savedShortcut && !e.repeat) {
        setIsAltPressed(true);
        setTranscript('');
        setTranslatedText('');
        try {
          recognitionRef.current?.start();
        } catch (err) {
          // Already started
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const savedShortcut = localStorage.getItem('whispurr_talk') || 'Alt';
      if (formatKey(e.key) === savedShortcut) {
        setIsAltPressed(false);
        try {
          recognitionRef.current?.stop();
        } catch (err) {
          // Already stopped
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const toggleListening = () => {
    if (isLoading) return;
    if (isAltPressed) {
      setIsAltPressed(false);
      try { recognitionRef.current?.stop(); } catch (e) {}
    } else {
      setIsAltPressed(true);
      setTranscript('');
      setTranslatedText('');
      try { recognitionRef.current?.start(); } catch (e) {}
    }
  };

  return {
    isAltPressed,
    transcript,
    translatedText,
    isLoading,
    mode,
    setMode,
    degree,
    setDegree,
    toggleListening,
  };
}
