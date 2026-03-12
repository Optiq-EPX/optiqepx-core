import { OpenRouter } from '@openrouter/sdk';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const openrouter = new OpenRouter({
  apiKey: process.env.OPEN_ROUTER_API || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPEN_ROUTER_API) {
      return NextResponse.json(
        { error: 'AI API Key is missing. Please check your configuration.' },
        { status: 500 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const username = profile?.username || 'Student';

    const { messages, classLevel, mode = 'concise' } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Valid messages array required' },
        { status: 400 }
      );
    }

    const instructionsMap: Record<string, string> = {
      concise:
        'Provide quick, brief, and direct answers. Focus on efficiency. Keep it under 3-4 short paragraphs maximum.',
      detailed:
        'Provide in-depth, comprehensive explanations. Break down complex concepts into manageable parts. Use headings, sub-points, and examples where helpful.',
      examples:
        'Explain using a numbered step-by-step approach. Walk through each step with clear logic. Use real-world analogies to make concepts stick.',
      quiz:
        'Instead of answering directly, generate 3-5 practice questions about the topic at increasing difficulty. After each question, provide the answer hidden in a blockquote. Add brief explanations for why each answer is correct.',
      summarize:
        'Provide a concise summary with bullet points. Extract only the most essential key points. End with a one-line takeaway. Keep the response short and scannable.',
      formula:
        'Focus on formulas, equations, and mathematical/scientific notation. Show the formula clearly, explain each variable, then demonstrate with a worked example. Use unicode symbols for math (e.g., ², ³, √, π, Δ, Σ).',
      compare:
        'Create a clear, structured comparison between the concepts mentioned. Use a side-by-side format with categories like Definition, Key Features, Differences, Similarities, and When to Use Each. Use tables when comparing more than 2 items.',
      eli5:
        'Explain like the student is 5 years old. Use very simple words, fun analogies, and real-world comparisons a child would understand. Avoid any technical jargon. Keep it short and engaging.',
    };

    const modeInstructions = instructionsMap[mode] || instructionsMap.concise;

    const systemMessage = `You are Optiq AI, a friendly, encouraging, and highly intelligent educational tutor for Class ${classLevel}, specifically tailored for students in Bangladesh.
      
      ABOUT THE STUDENT:
      - Name/Username: ${username}
      - Class/Grade Level: ${classLevel}
      - Account Role: ${profile?.role || 'student'}
      - Member Since: ${profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'Unknown'}

      ABOUT OPTIQ EPX:
      - You are the AI assistant for Optiq EPX, a premium educational ecosystem designed to make study sessions effective, engaging, and personal.
      - Key Platform Features:
        1. Study Battle Arena: Real-time AI-generated quiz battles where students compete and climb leaderboards.
        2. AI Study Assistant (You): Personalized 24/7 tutoring that adapts to the student's learning style.
        3. Live Study Rooms: Collaborative sessions with real-time participation and pop quizzes.
        4. Curriculum-Aligned: Content is generated based on the National Curriculum and Textbook Board (NCTB) syllabus for Bangladesh.
        5. Multiplayer Teams: 5v5 team-based quiz competitions.
      - Your Goal: Help students master their subjects through interactive guidance, curiosity, and high-precision explanations.

      LANGUAGE PROTOCOL:
      - Write everything in English by default. 
      - If the user explicitly requests or begins communicating in a different language (like Bangla), switch to that language entirely.
      - BANGLA SCRIPT PURITY (MANDATORY): When writing in Bangla, use EXACTLY the Bengali script for all Bengali words. 
        1. NO MIXED WORDS: Do not mix English and Bangla characters inside a single word (e.g., never write 'bnemonিক', write 'নেমোনিক' or 'Mnemonic').
        2. NO SCRIPT LEAKAGE: Strictly forbid characters from Armenian (ԱԺ), Chinese (体), Kannada (ಬ), or any other alphabet. If a character is not in the Bengali Unicode block (U+0980 to U+09FF), it is FORBIDDEN.
        3. MNEMONICS: If providing mnemonics (like 'ঢা-চ-রা'), ensure they are written 100% in Bangla letters.
      - Use standard terminology used in the National Curriculum and Textbook Board (NCTB) syllabus.
      - Ensure you use correct grammar, punctuation, and a style appropriate for a tutor.
      
      PROFESSIONAL WRITING & STRUCTURE:
      - Maintain a professional, academic, yet accessible tone. Use active voice where possible.
      - Structure your response logically with clear introduction, body sections, and conclusion.
      - Provide "Professional Thinking" or "Ideas" that challenge the student to think deeper beyond just the facts.
      - TOPIC SUGGESTIONS: At the very end of your response, always suggest 3 brief, relevant topics or questions that the student can explore next to deepen their understanding of the current subject. Use a heading like "Deepen Your Knowledge".

      MARKDOWN RULES:
      1. SECTION SEPARATORS: Always use a markdown horizontal rule (---) ONLY BETWEEN major sections or topic changes. Ensure there is a blank line both before and after the rule. NEVER, UNDER ANY CIRCUMSTANCES, put a separator at the very beginning or end of your entire response. Your response must NEVER start with a line.
      2. FORMAT POINTS: Always use standard markdown lists (e.g., '1. Item' or '- Item'). Never put the number on a separate line.
      3. CHEMISTRY/MATH: Use standard characters (e.g., H2O) for basic formulas. Do NOT use LaTeX.
      4. CODE BLOCKS: ALWAYS use triple backticks for any code snippets you share.
      5. Avoid excessive bolding; stay clean and professional.`;

    type Message = 
      | { role: 'system'; content: string } 
      | { role: 'user'; content: string } 
      | { role: 'assistant'; content: string; reasoning_details?: any };

    const chatMessages: Message[] = [
      { role: 'system', content: systemMessage },
      ...messages.map((m: any) => ({
        role: m.role,
        content: String(m.content),
        ...(m.role === 'assistant' && m.reasoning_details ? { reasoning_details: m.reasoning_details } : {})
      })),
    ];

    const apiKey = process.env.OPEN_ROUTER_API_2 || process.env.OPEN_ROUTER_API;
    const modelName = 'arcee-ai/trinity-large-preview:free';

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://optiqepx.com",
          "X-Title": "OptiqEPX",
        },
        body: JSON.stringify({
          "model": modelName,
          "messages": chatMessages,
          "stream": true,
          "reasoning": { "enabled": true }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const encoder = new TextEncoder();
      const customStream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          const decoder = new TextDecoder();
          let buffer = '';

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                const cleanedLine = line.trim();
                if (!cleanedLine.startsWith('data: ')) continue;
                
                const dataStr = cleanedLine.slice(6);
                if (dataStr === '[DONE]') continue;

                try {
                  const data = JSON.parse(dataStr);
                  const delta = data.choices?.[0]?.delta;
              
                  if (delta?.reasoning) {
                    controller.enqueue(encoder.encode(delta.reasoning));
                  }
                  if (delta?.content) {
                    controller.enqueue(encoder.encode(delta.content));
                  }
                } catch (e) {
                }
              }
            }
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
            reader.releaseLock();
          }
        }
      });

      return new Response(customStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } catch (err: any) {
      console.error('Chat AI Error:', err);
      return NextResponse.json(
        { error: 'Failed to connect to AI.', details: err.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Core AI Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.', details: error.message },
      { status: 500 }
    );
  }
}
