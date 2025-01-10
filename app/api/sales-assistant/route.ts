import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const customResponses = {
  "too expensive": [
    "Let's focus on the value rather than the price. Our solution will save you X amount in the long run by...",
    "I understand budget is a concern. Would it help to break down the ROI for you?",
  ],
  "need to think about it": [
    "I appreciate you wanting to give this careful consideration. What specific aspects would you like to think about?",
    "To help you make an informed decision, what additional information would be helpful?",
  ],
  "send me an email": [
    "Sure, absolutely is it more details about the company or the ideas? – first it is key to be positive, not reacting with conflict. Company: Brief description. Ideas: In terms of ideas, I wish I could send you something over, it would make my life so much easier. But there's a number of difficulties: 1. I don't know which ideas are suitable for you, I don't know your situation so it's a far better use of both our time to ascertain your situation and then give you something relevant. 2. Notwithstanding the fact that you probably wouldn't read the email. 3. Notwithstanding the fact that it probably wouldn't get through as it would be out of context and carrying about 50 different ideas in there. 4. But also there's a decision-making problem, as given 3 different relevant ideas based on your situation, you can make a decision. But if we send you over 50 different ideas you won't be able to; so, it's unlikely to lead anywhere anyway. But from my perspective it's a bit of give and take, if you're asking us to give away our secret formula then you need to do at least something to justify us doing that. So with that in mind, we've found out that the best way for you to learn about us and for us to take as little as possible from you in order to do that, the best way is to set aside half an hour, to do so in such a way that doesn't cost you anything, and during that meeting we can find out about you and furnish you with the ideas that are relevant so you can go off and find out more about them. So, if you think about it, apart from half an hour what have you got to lose?"
  ]
};

export async function POST(request: Request) {
  try {
    const { input } = await request.json();
    console.log('Received input:', input);

    const lowerInput = input.toLowerCase();
    const matchingObjection = Object.keys(customResponses).find(key => 
      lowerInput.includes(key)
    );

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
          content: `You are an expert sales assistant. Your goal is to help salespeople handle objections and advance their sales conversations effectively. Provide strategic advice, suggested responses, and next steps based on the sales situation described. Focus on being practical, professional, and persuasive. ${customResponsePrompt}`
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