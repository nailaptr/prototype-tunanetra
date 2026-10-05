import { Message } from "./types";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function MessageList({ messages, isLoading, error }: MessageListProps) {
  return (
    <div 
      className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-4 flex-1 overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-atomic="false"
      aria-relevant="additions"
      aria-label="Riwayat obrolan"
    >
      {messages.length === 0 && !isLoading && (
        <p className="text-gray-500 text-center py-8">Belum ada pesan. Silakan ketik pertanyaan Anda di bawah.</p>
      )}
      
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`p-4 rounded-lg max-w-[85%] ${
            msg.role === "user" 
              ? "bg-blue-600 text-white self-end rounded-br-none" 
              : "bg-gray-100 text-gray-900 self-start rounded-bl-none border border-gray-200"
          }`}
        >
          <p className="sr-only">{msg.role === "user" ? "Anda berkata:" : "Asisten berkata:"}</p>
          <div className="whitespace-pre-wrap">{msg.content}</div>
        </div>
      ))}

      {isLoading && (
        <div className="p-4 bg-gray-100 rounded-lg self-start max-w-[85%] border border-gray-200" aria-live="assertive">
          <p className="text-gray-600">Sedang memikirkan...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg self-start border border-red-200 w-full" role="alert">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
