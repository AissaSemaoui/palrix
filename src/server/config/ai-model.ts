import Anthropic from "@anthropic-ai/sdk";

import env from "@environments";

const anthropic = new Anthropic({
  apiKey: env.ai.modelApiKey,
});

export const sendAiPrompt = async (systemPrompt: string, userPrompt?: string) => {
  const msg = await anthropic.messages.create({
    system: systemPrompt,
    messages: userPrompt ? [{ role: "user", content: userPrompt }] : [],
    model: "claude-3-sonnet-20240229",
    max_tokens: 1024,
    temperature: 1,
  });

  return {
    id: msg.id,
    content: msg.content[0].text,
    input_tokens: msg.usage.input_tokens,
    output_tokens: msg.usage.output_tokens,
    total_tokens: msg.usage.input_tokens + msg.usage.output_tokens,
  };
};
