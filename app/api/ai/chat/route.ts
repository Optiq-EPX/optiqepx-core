import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, classLevel } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Valid messages array required' }, { status: 400 });
    }

    const systemInstruction = `You are a friendly, encouraging, and highly intelligent educational tutor. You are currently speaking with a student in Class/Grade ${classLevel}. You must tailor your explanations, vocabulary, and examples perfectly to a student of this level. Never give direct answers to homework; instead, guide them to figure it out using the Socratic method. Format your mathematical and scientific text clearly.`;

    const geminiContents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
    }));

    let promptText = `${systemInstruction}\n\n`;
    messages.forEach((m: any) => {
        promptText += `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}\n`;
    });
    promptText += "Tutor: ";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ reply: response.text });

  } catch (error: any) {
    console.error('Chat AI Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with your AI Tutor.' }, 
      { status: 500 }
    );
  }
}
