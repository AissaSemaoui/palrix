import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const sendAiPrompt = async (systemPrompt: string, userPrompt?: string) => {
  const message = await generateText({
    model: anthropic("claude-3-5-sonnet-latest"),
    // model: deepseek("deepseek-chat"),
    system: systemPrompt,
    messages: userPrompt ? [{ role: "user", content: userPrompt }] : [],
    maxTokens: 3000,
    temperature: 1,
  });

  return {
    id: message.response.id,
    content: message.text,
    input_tokens: message.usage.promptTokens,
    output_tokens: message.usage.promptTokens,
    total_tokens: message.usage.totalTokens,
  };
};
