import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, classLevel, mode = 'concise' } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Valid messages array required' }, { status: 400 });
    }

    const instructionsMap = {
      concise: "Provide quick, brief, and direct answers. Focus on efficiency.",
      detailed: "Provide in-depth, comprehensive explanations. Break down complex concepts into manageable parts.",
      examples: "Explain using step-by-step analogies, real-world examples, and clear logic.",
      quiz: "Instead of answering, ask the student 1-2 challenging questions about the topic to test their knowledge. Provide feedback on their answers.",
    };

    const modeInstructions = instructionsMap[mode as keyof typeof instructionsMap] || instructionsMap.concise;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `You are Optiq AI, a friendly, encouraging, and highly intelligent educational tutor for Class ${classLevel}. 
      ${modeInstructions}
      Tailor your vocabulary perfectly to a student of this level. 
      Never give direct answers to homework; instead, guide them using the Socratic method. 
      Use markdown for formatting.`
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error('Chat AI Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with your AI Tutor. Please check your API key configuration.' }, 
      { status: 500 }
    );
  }
}
