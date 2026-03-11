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

    const body = await req.json();
    const { topic, classLevel, questionCount = 5 } = body;

    if (!topic || !classLevel) {
      return NextResponse.json(
        { error: 'Topic and classLevel are required' },
        { status: 400 }
      );
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

    // Fallback model chain
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
            messages: [{ role: 'user' as const, content: prompt }],
            stream: true
          }
        });

        let outputText = "";
        for await (const chunk of stream) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            outputText += content;
            process.stdout.write(content);
          }
          const reasoningTokens = chunk.usage?.completionTokensDetails?.reasoningTokens;
          if (reasoningTokens) {
            console.log(`\n[${modelName}] Reasoning tokens:`, reasoningTokens);
          }
        }

        if (!outputText) {
          throw new Error('Empty response from AI model');
        }

        const cleanedText = outputText
          .replace(/```json\n/g, '')
          .replace(/```\n?/g, '')
          .trim();
        const quizData = JSON.parse(cleanedText);

        return NextResponse.json({ questions: quizData });
      } catch (err: any) {
        lastError = err;
        console.warn(
          `Quiz model ${modelName} failed (${err?.status || err?.message}), trying next fallback...`
        );
        continue;
      }
    }

    // All models exhausted
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
    console.error('Quiz AI Generation Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate quiz.',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
