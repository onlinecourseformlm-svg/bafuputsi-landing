import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Type definitions
interface Message {
  sender: string;
  text: string;
}

interface ChatRequest {
  message: string;
  conversationHistory?: Message[];
}

const SYSTEM_PROMPT = `You are a helpful virtual assistant for Bafuputsi Trading, a labour law and HR consulting firm based in Centurion, South Africa.

Company Information:
- Name: Bafuputsi Trading
- Location: Centurion, South Africa
- Years in business: Over 10 years
- Email: admin@bafuputsi.co.za
- Phone: +27 62 323 2533

Office Hours:
- Monday - Wednesday: 8:00am - 06:00pm
- Thursday - Saturday: 10:00am - 10:00pm
- Sunday: Closed
- Emergency calls accepted after hours

Services Offered:
1. Choosing the right Labour Law and HR Consultant
2. Labour Law & Labour Relations Services
3. HR Services and Compliance Support
4. Dispute Resolutions (CCMA, investigations, hearings)
5. Training (SETA accredited programs, labour law fundamentals)

Key Features:
- Fair Fees: Transparent pricing, may not charge for additional gaps identified
- Free Consultation: Initial consultations are complimentary
- Quality Representation: Complete investigation, charge formulation, and witness management

Common Questions:
- Pre-suspension hearings are not required per Constitutional Court ruling (2019)
- Legal representation at CCMA depends on complexity, nature of case, and comparative abilities
- Misconduct vs Poor Performance: Misconduct = behavior violations; Poor Performance = work quality issues
- SETA funding available through Mandatory and Discretionary Grants

Your role is to:
1. Answer questions about labour law and HR consulting
2. Provide information about services, pricing, and booking
3. Be professional, helpful, and concise
4. Encourage users to book a free consultation for detailed matters
5. Direct urgent matters to call directly

Keep responses friendly, professional, and under 150 words unless detailed explanation is needed.`;

export async function POST(request: Request) {
  try {
    const body = await request.json() as ChatRequest;
    const { message, conversationHistory } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // If no API key, fall back to simple responses
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: "I'm here to help! For detailed assistance, please call us at +27 62 323 2533 or book a free consultation through our contact form."
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build messages array
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history (limit to last 10 messages)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.slice(-10).forEach((msg: Message) => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content ||
      "I'm here to help! For detailed assistance, please call us at +27 62 323 2533.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('OpenAI API error:', error);

    // Fallback response if OpenAI fails
    return NextResponse.json({
      reply: "Thank you for your question. For detailed information, please call us at +27 62 323 2533 or email admin@bafuputsi.co.za. We offer free consultations!"
    });
  }
}
