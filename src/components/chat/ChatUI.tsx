"use client";

import { useState } from "react";
import { Message } from "./types";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAttempt, setLastAttempt] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    // Add user message to UI immediately
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setLastAttempt(text);
    
    await executeRequest(text);
  };

  const retryLastMessage = async () => {
    if (lastAttempt) {
      await executeRequest(lastAttempt);
    }
  };

  const executeRequest = async (text: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          context: {
            platform: navigator.userAgent.includes("Windows") ? "Windows" : 
                      navigator.userAgent.includes("Mac") ? "Mac" : 
                      navigator.userAgent.includes("Android") ? "Android" : 
                      navigator.userAgent.includes("iPhone") ? "iOS" : "Tidak diketahui",
            screenReader: "Tidak diketahui" // Can't reliably detect from browser without settings
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi peladen");
      }

      const assistantMsg: Message = { 
        id: crypto.randomUUID(), 
        role: "assistant", 
        content: data.result 
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      setLastAttempt(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menghubungi asisten.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col w-full bg-white">
      <MessageList messages={messages} isLoading={isLoading} error={error} />
      <MessageInput 
        onSend={sendMessage} 
        isLoading={isLoading} 
        onRetry={retryLastMessage}
        hasError={!!error}
      />
    </div>
  );
}
