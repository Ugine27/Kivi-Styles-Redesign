import { Mode } from './useKiviInput';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function transformText(rawText: string, mode: Mode, degree: number): Promise<string> {
  if (!rawText.trim()) return '';
  if (!API_KEY) {
    return "API Key missing. Please add VITE_GEMINI_API_KEY to your .env file and restart the server.";
  }

  const systemPrompt = `You are Kivi, an invisible translation layer. Your job is to translate the user's raw dictated speech into perfectly formatted digital output based on the provided Mode and Degree of formality (1-3).
Modes:
- PULSE: Used for day-to-day conversations (chats and emails). It acts as a live transcription of what the user is saying, modified by tone. The degree dictates formality: 1 = Highly casual tone (an almost verbatim, relaxed live transcription for quick chats), 2 = Standard clear tone (everyday emails), 3 = Strictly formal and highly professional tone (executive communication).
- LEGO: A prompt engineering tool for developers. It summarizes the user's raw spoken intent and outputs a highly structured, professional prompt (using Markdown, clear constraints, or schemas) that the user can feed to another AI. The degree dictates the complexity of the generated prompt (1 = simple bulleted task description, 3 = highly constrained system prompt with edge cases and strict output formats).
- FLOW: A stream-of-consciousness capture engine for brainstorming. It takes non-stop, unstructured ideas and organizes them into understandable formats. The degree dictates the level of structuring (1 = almost identical to the raw speech but cleanly removing all filler words like "uhm" or "ahh"; 3 = highly structured synthesis, organizing the ideas into clear bullet points and generating a markdown Mermaid flowchart representing the concepts).

Do not output any conversational filler like "Here is your text". Just output the final translated text directly.`;

  const userPrompt = `Mode: ${mode}\nDegree: ${degree}\nRaw Speech: "${rawText}"\n\nTranslate this perfectly:`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.3 }
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return `API Error: ${data.error.message}`;
    }
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Error: No text generated.";
  } catch (error: any) {
    console.error(error);
    return `Network Error: ${error.message}`;
  }
}
