import { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  onRetry?: () => void;
  hasError?: boolean;
}

export function MessageInput({ onSend, isLoading, onRetry, hasError }: MessageInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };
  
  // Kembalikan fokus ke input saat loading selesai atau saat terjadi error
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      // Small timeout to ensure DOM update is complete before focusing
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto p-4 bg-white border-t border-gray-200 flex flex-col gap-2"
    >
      {hasError && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm self-start text-blue-700 font-semibold hover:underline focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 mb-2"
        >
          Kirim ulang pesan terakhir
        </button>
      )}
      <div className="flex gap-2 items-end">
        <label htmlFor="chat-input" className="sr-only">Tulis pesan untuk asisten</label>
        <textarea
          id="chat-input"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Tanya sesuatu..."
          className="flex-1 min-h-[60px] max-h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y disabled:opacity-50"
          aria-invalid={hasError ? "true" : "false"}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed h-[60px]"
          aria-label="Kirim pesan"
        >
          Kirim
        </button>
      </div>
    </form>
  );
}
