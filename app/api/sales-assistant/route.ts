import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ObjectionKey, customResponses } from './customResponses';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { input } = await request.json();
    console.log('Received input:', input);

    if (!input) {
      return NextResponse.json({ error: 'No input provided' }, { status: 400 });
    }

    const lowerInput = input.toLowerCase();
    const matchingObjection = Object.keys(customResponses).find(key => 
      lowerInput.includes(key)
    ) as ObjectionKey | undefined;

    let customResponsePrompt = "";
    if (matchingObjection) {
      customResponsePrompt = `Consider these pre-written responses for this objection:
        ${customResponses[matchingObjection].join('\n')}
        
        You can use these responses as is, modify them, or create a new response if more appropriate.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert sales assistant specializing in handling objections. Treat EVERY input as a sales objection that needs to be overcome, not as a statement of fact. Your goal is to help salespeople turn objections into opportunities.

For example:
- "I have a financial advisor" → This is an objection about not needing another advisor
- "We're too small" → This is an objection about company size/fit
- "I'm busy" → This is an objection about time/priority

Provide:
1. Recognition of the objection
2. Strategic response to overcome it
3. Questions to advance the conversation
4. Next steps

${customResponsePrompt}`
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    console.log('AI Response:', response);

    return NextResponse.json({ response });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}