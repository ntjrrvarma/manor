import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { SYSTEM_PROMPT, RESUME_JSON } from '@/lib/ai-system-prompt';

// Configure for Groq (fast & cheap) or OpenAI
const openai = createOpenAI({
  baseURL: process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('llama-3.1-70b-versatile'), // or 'gpt-3.5-turbo'
      system: `${SYSTEM_PROMPT}\n\nRESUME DATA:\n${JSON.stringify(RESUME_JSON, null, 2)}`,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}