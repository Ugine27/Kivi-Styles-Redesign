import { Mode } from './useKiviInput';

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

export async function transformText(rawText: string, mode: Mode, degree: number): Promise<string> {
  if (!rawText.trim()) return '';
  if (!API_KEY) {
    return "API Key missing. Please add VITE_GEMINI_API_KEY to your .env file and restart the server.";
  }

  const systemPrompt = `You are WhisPURR, an invisible translation layer. Your job is to translate the user's raw dictated speech into perfectly formatted digital output based on the provided Mode and Degree script.
Modes:
- Casual: For personal messaging, friendly and natural.
- Professional: For formal communication, polished and formal.
- Concise: Short and direct.
- Meeting Notes: Highly structured, bulleted summarization of the conversation.
- Work Messaging: Professional chats like Slack.
- Personal Messaging: Raw unedited text.
- Email: Email responses.
- Developer: Tickets and PRs.
- Prompting: LLM prompting.
- Other Apps: General dictation.

Degree Scripting (IMPORTANT):
- Degree 1 (Roman): The output MUST be in the English alphabet (Romanized). If translating from another language, spell out the words phonetically using A-Z.
- Degree 2 (Native): The output MUST be in the Native Script corresponding to the language being spoken. (e.g., Devanagari for Hindi, Gujarati script for Gujarati).

Do not output any conversational filler like "Here is your text". Just output the final translated text directly.`;

  const userPrompt = `Mode: ${mode}\nDegree: ${degree} (${degree === 1 ? 'Roman Script' : 'Native Script'})\nRaw Speech: "${rawText}"\n\nTranslate this perfectly:`;

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
