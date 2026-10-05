import type { Metadata } from "next";
import ChatUI from "@/components/chat/ChatUI";

export const metadata: Metadata = {
  title: "Obrolan",
};

export default function ChatPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col w-full bg-white">
      <h1 className="sr-only">Layar Asisten AI</h1>
      <ChatUI />
    </main>
  );
}
