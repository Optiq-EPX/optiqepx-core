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
      
      LANGUAGE PROTOCOL:
      - Respond in the same language the student uses (Bangla or English).
      - Use standard terminology used in the National Curriculum and Textbook Board (NCTB) syllabus, regardless of the language.
      - Ensure you use correct grammar, punctuation, and a style appropriate for a tutor.
      
      CORE INSTRUCTIONS:
      ${modeInstructions}
      Tailor your vocabulary perfectly to a student of this level. 
      Never give direct answers to homework; instead, guide them using the Socratic method. 
      
      MARKDOWN RULES:
      1. FORMAT POINTS: Always use standard markdown lists (e.g., '1. Item' or '- Item'). Never put the number on a separate line.
      2. CHEMISTRY/MATH: Use unicode subscripts/superscripts (e.g., H₂O) for basic formulas. Do NOT use LaTeX (\text{}).
      3. CODE BLOCKS: ALWAYS use triple backticks with the correct language identifier (e.g., \`\`\`python) for any code snippets you share.
      4. Avoid excessive bolding; stay clean and professional.`;

    type Message = { role: 'system'; content: string } | { role: 'user'; content: string } | { role: 'assistant'; content: string };
    const chatMessages: Message[] = [
      { role: 'system', content: systemMessage },
      ...messages.map((m: any): Message =>
        m.role === 'assistant'
          ? { role: 'assistant' as const, content: String(m.content) }
          : { role: 'user' as const, content: String(m.content) }
      ),
    ];

    const models = [
      'stepfun/step-3.5-flash:free',
      'deepseek/deepseek-r1:free',
      'google/gemma-3-12b-it:free',
    ];
    let lastError: any = null;

    for (const modelName of models) {
      try {
        const stream = await openrouter.chat.send({
          chatGenerationParams: {
            model: modelName,
            messages: chatMessages,
            stream: true
          }
        });

        const encoder = new TextEncoder();
        const customStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of stream) {
                const content = chunk.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              }
              controller.close();
            } catch (error) {
              controller.error(error);
            }
          }
        });

        return new Response(customStream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          },
        });
      } catch (err: any) {
        lastError = err;
        console.warn(
          `Model ${modelName} failed (${err?.status || err?.message}), trying next fallback...`
        );
        continue;
      }
    }

    return NextResponse.json(
      {
        error:
          'All AI models are currently unavailable. Please try again in a moment.',
        rateLimited: true,
        retryAfter: 30,
      },
      { status: 429 }
    );
  } catch (error: any) {
    console.error('Chat AI Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to communicate with your AI Tutor.',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
