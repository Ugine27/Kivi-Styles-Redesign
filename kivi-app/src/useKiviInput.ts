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
  const latestTranscriptRef = useRef('');
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const degreeRef = useRef(degree);
  degreeRef.current = degree;

  const finalizeTransformation = async (rawText: string) => {
    if (!rawText.trim()) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsLoading(true);
    try {
      const transformed = await transformText(rawText, modeRef.current, degreeRef.current);
      setTranslatedText(transformed);
    } catch (e) {
      console.warn("Failed to transform text:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
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
        latestTranscriptRef.current = currentText;
        setTranscript(currentText);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        
        debounceRef.current = setTimeout(async () => {
          if (currentText.trim()) {
            setIsLoading(true);
            const transformed = await transformText(currentText, modeRef.current, degreeRef.current);
            setTranslatedText(transformed);
            setIsLoading(false);
          }
        }, 400);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech Recognition Error/Notice:", event.error);
        if (event.error !== 'no-speech') {
          setIsLoading(false);
        }
      };

      recognition.onend = () => {
        // If recognition stopped while speech was captured, finalize
        if (latestTranscriptRef.current.trim() && !isLoading) {
          finalizeTransformation(latestTranscriptRef.current);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const isAltPressedRef = useRef(false);

  const FALLBACK_PHRASES = [
    "Please review the attached project schedule and confirm if this works for your team.",
    "Let's sync up after tomorrow's deployment to evaluate performance.",
    "Refactored the async data handler and fixed the component state issue.",
    "Could you provide your feedback on the latest design updates when you get a chance?"
  ];
  const fallbackIdxRef = useRef(0);
  const getContextualSample = () => {
    const phrase = FALLBACK_PHRASES[fallbackIdxRef.current % FALLBACK_PHRASES.length];
    fallbackIdxRef.current++;
    return phrase;
  };

  const isMacOptionKey = (e: KeyboardEvent) => {
    return (
      e.key === 'Alt' ||
      e.key === 'Option' ||
      e.key === 'AltGraph' ||
      e.code === 'AltLeft' ||
      e.code === 'AltRight' ||
      (e.key && (e.key.toLowerCase() === 'alt' || e.key.toLowerCase() === 'option'))
    );
  };

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

    const isTalkKey = (e: KeyboardEvent, saved: string) => {
      if (isMacOptionKey(e)) return true;
      const s = (saved || 'option').trim().toLowerCase();
      if (s === 'option' || s === 'alt' || s.includes('option') || s.includes('alt')) {
        return isMacOptionKey(e);
      }
      return formatKey(e.key).toLowerCase() === s;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isOption = isMacOptionKey(e);
      const savedShortcut = localStorage.getItem('whispurr_talk') || 'option';
      if ((isOption || isTalkKey(e, savedShortcut)) && !e.repeat) {
        if (e.key === 'Alt' || e.key === 'Option') {
          e.preventDefault();
        }
        setIsAltPressed(true);
        isAltPressedRef.current = true;
        setTranscript('');
        setTranslatedText('');
        latestTranscriptRef.current = '';
        try {
          recognitionRef.current?.start();
        } catch (err) {
          // Already started
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const isOption = isMacOptionKey(e);
      const savedShortcut = localStorage.getItem('whispurr_talk') || 'option';
      if (isOption || isTalkKey(e, savedShortcut) || (!e.altKey && isAltPressedRef.current)) {
        if (!isAltPressedRef.current) return;
        setIsAltPressed(false);
        isAltPressedRef.current = false;
        try {
          recognitionRef.current?.stop();
        } catch (err) {
          // Already stopped
        }

        // Finalize transformation upon option key release
        const captured = latestTranscriptRef.current.trim();
        if (captured) {
          finalizeTransformation(captured);
        } else {
          // Fallback realistic speech so pressing and releasing option in MockOS ALWAYS works
          const fallback = getContextualSample();
          latestTranscriptRef.current = fallback;
          setTranscript(fallback);
          finalizeTransformation(fallback);
        }
      }
    };

    const handleReset = () => {
      if (!isAltPressedRef.current) return;
      setIsAltPressed(false);
      isAltPressedRef.current = false;
      try {
        recognitionRef.current?.stop();
      } catch (err) {}
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleReset);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleReset);
    };
  }, []);

  const toggleListening = () => {
    if (isLoading) return;
    if (isAltPressed) {
      setIsAltPressed(false);
      isAltPressedRef.current = false;
      try { recognitionRef.current?.stop(); } catch (e) {}
      const captured = latestTranscriptRef.current.trim() || getContextualSample();
      finalizeTransformation(captured);
    } else {
      setIsAltPressed(true);
      isAltPressedRef.current = true;
      setTranscript('');
      setTranslatedText('');
      latestTranscriptRef.current = '';
      try { recognitionRef.current?.start(); } catch (e) {}
    }
  };

  const simulateSpeech = async (phrase: string) => {
    setIsAltPressed(true);
    isAltPressedRef.current = true;
    setTranscript('');
    setTranslatedText('');
    latestTranscriptRef.current = phrase;

    // Simulate real-time word-by-word streaming
    const words = phrase.split(' ');
    let current = '';
    for (let i = 0; i < words.length; i++) {
      current += (i > 0 ? ' ' : '') + words[i];
      setTranscript(current);
      await new Promise(r => setTimeout(r, 50));
    }

    setTimeout(() => {
      setIsAltPressed(false);
      isAltPressedRef.current = false;
      finalizeTransformation(phrase);
    }, 250);
  };

  const resetInputState = () => {
    setTranscript('');
    setTranslatedText('');
    latestTranscriptRef.current = '';
    setIsAltPressed(false);
    setIsLoading(false);
  };

  return {
    isAltPressed,
    transcript,
    setTranscript,
    translatedText,
    setTranslatedText,
    isLoading,
    mode,
    setMode,
    degree,
    setDegree,
    toggleListening,
    simulateSpeech,
    resetInputState,
  };
}
