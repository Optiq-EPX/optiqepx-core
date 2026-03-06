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

    
    const body = await req.json();
    const { topic, classLevel, questionCount = 5 } = body;

    if (!topic || !classLevel) {
      return NextResponse.json({ error: 'Topic and classLevel are required' }, { status: 400 });
    }

    
    const prompt = `
      You are an expert educational tutor. Generate a ${questionCount}-question multiple choice quiz on the topic of "${topic}" tailored for a student in Class/Grade ${classLevel}.
      
      Requirements:
      - The language must be strictly English.
      - The questions must be age-appropriate and curriculum-aligned.
      - Each question must have exactly 4 options.
      - Only 1 option can be correct.
      
      IMPORTANT: You MUST return ONLY a raw JSON array of objects. Do not include markdown formatting like \`\`\`json.
      
      Format strictly like this example:
      [
        {
          "id": "item-1",
          "text": "What is 2+2?",
          "options": ["3", "4", "5", "6"],
          "correctAnswerIndex": 1
        }
      ]
    `;

    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      }
    });

    const outputText = response.text;
    
    
    const cleanedText = outputText?.replace(/```json\n/g, '').replace(/```\n?/g, '').trim();

    
    const quizData = JSON.parse(cleanedText || '[]');
    
    return NextResponse.json({ questions: quizData });

  } catch (error: any) {
    console.error('Quiz AI Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz. Check the topic or try again.' }, 
      { status: 500 }
    );
  }
}
