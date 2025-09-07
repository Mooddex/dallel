import { LumenBrainDriver } from "@lumenlabs/lumen-brain";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    // Get request data
    const { message, memoryId, conversationId } = await req.json();

    // Check for API keys
    if (!process.env.BRAINAPI_API_KEY || !process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ message: "Server Error" }),
        { status: 500 }
      );
    }

    // Initialize services
    const brain = new LumenBrainDriver(process.env.BRAINAPI_API_KEY);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Save user message to memory
    await brain.saveMessage(memoryId, message, "user", conversationId);

    // Get conversation context from memory
    const brainResponse = await brain.queryMemory(
      message,
      memoryId,
      conversationId
    );
    const additionalContext = brainResponse.context;

    // Compose prompt with context
    const prompt = message + additionalContext;

    let stream;
    try {
      // Call OpenAI with streaming
      stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        stream: true,
      });
    } catch (err) {
      console.error("OpenAI API error:", err);

      // Fallback message
      return new Response(
  JSON.stringify({
    success: false,
    message:
      "⚠️ The chatbot is currently unavailable. Please try again later or use ChatGPT directly at https://chat.openai.com",
  }),
  { status: 200 } // keep 200 so frontend can parse cleanly
);

    }

    // Prepare streaming response
    let aiResponse = "";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              aiResponse += content;
              const data = `data: ${JSON.stringify({
                content,
                conversationId,
              })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }

          // Send completion signal
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();

          // Save AI response to memory
          await brain.saveMessage(
            memoryId,
            aiResponse,
            "assistant",
            conversationId
          );
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    // Return streaming response
    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
