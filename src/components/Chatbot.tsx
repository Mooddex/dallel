"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/types/Mesages";

export default function Chatbot() {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState("");

  // Refs for abort controller and auto-scroll
  const abortControllerRef = useRef<AbortController | null>(null);
  const bottomRefScrollHook = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bottomRefScrollHook.current) {
      bottomRefScrollHook.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      memoryId: "test-chat-app-user-1",
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      // Make API call
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          memoryId: userMessage.memoryId,
          conversationId,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      // Create empty assistant message for streaming
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        memoryId: "test-chat-app-user-1",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              setIsLoading(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.conversationId) {
                setConversationId(parsed.conversationId);
              }

              if (parsed.content) {
                accumulatedContent += parsed.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: accumulatedContent }
                      : m
                  )
                );
              }
            } catch {
              continue;
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.error("Error:", error);

        // Fallback assistant message
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "⚠️ Sorry, I’m not available right now. Please try again later.",
          memoryId: "test-chat-app-user-1",
        };

        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 h-screen flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Chat a Little</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Start a conversation by typing a message below
                </p>
              )}

              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    message.role === "user" ? "justify-end" : "justify-start",
                    "flex"
                  )}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRefScrollHook} />
            </div>
          </ScrollArea>

          <div className="border-t p-4 mt-auto">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                onClick={(e) => {
                  if (isLoading && abortControllerRef.current) {
                    e.preventDefault();
                    abortControllerRef.current.abort();
                  }
                }}
              >
                {isLoading ? "Stop" : "Send"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
