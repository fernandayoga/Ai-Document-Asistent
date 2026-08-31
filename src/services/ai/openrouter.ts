import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'X-Title': 'AI Document Assistant',
  },
});

interface Summary {
  overview: string;
  keyPoints: string[];
  mainTopics: string[];
}

export async function generateSummary(text: string): Promise<Summary> {
  const prompt = `
You are a professional document analysis assistant.

Given the following document text, generate a structured summary that includes:
1. Overview: A concise summary of the document's main purpose and content.
2. Key Points: 3-5 bullet points of the most important information.
3. Main Topics: 3-5 topics that the document covers.

Document:
${text}

Return a JSON object with this exact structure:
{
  "overview": string,
  "keyPoints": string[],
  "mainTopics": string[]
}

Do not include any other text or markdown. Return only valid JSON.
`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 4096,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content received from AI');
  }

  const result = JSON.parse(content.trim()) as Summary;
  return result;
}

export async function generateChatResponse(
  question: string,
  documentText: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const systemPrompt = `
You are an AI assistant that answers questions based solely on the provided document.

Instructions:
1. The document is the primary source of information.
2. Do not make up facts that are not in the document.
3. If information is not found, clearly state that.
4. Do not claim something is from the document if it isn't.
5. Keep answers relevant to the question.
6. Use the same language as the question if possible.
7. Keep responses concise but informative.

If the answer cannot be found in the document, respond:
"I couldn't find that information in the document."

Document:
${documentText}
`;

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    ...conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: 'user',
      content: question,
    },
  ];

  const response = await openai.chat.completions.create({
    model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free',
    messages,
    temperature: 0.7,
    max_tokens: 4096,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content received from AI');
  }

  return content;
}

export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

export const MAX_CONTEXT_TOKENS = 128000;
export const RESPONSE_TOKENS = 8192;
export const SAFE_DOCUMENT_TOKENS = MAX_CONTEXT_TOKENS - RESPONSE_TOKENS - 4000;