// client/src/pages/Widget.tsx
// Embeddable chat widget version of Grace

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, X, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Widget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Maven! I'm Grace 💜 What brings you here today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `widget-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = trpc.chat.sendMessage.useMutation();
  const saveMessage = trpc.chat.saveMessage.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      await saveMessage.mutateAsync({ sessionId, role: "user", content: userMessage });

      const response = await sendMessage.mutateAsync({
        message: userMessage,
        history: messages,
      });

      const reply: Message = { role: "assistant", content: response.reply };
      setMessages([...newMessages, reply]);

      await saveMessage.mutateAsync({ sessionId, role: "assistant", content: response.reply });
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I'm having trouble. Try again? 💜" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 flex items-center justify-center transition-transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-[500px] bg-white rounded-2xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden">
      {/* Widget Header */}
      <div className="flex items-center justify-between p-3 bg-purple-600 text-white">
        <div className="flex items-center gap-2">
          <img src="/grace-avatar.png" alt="Grace" className="w-8 h-8 rounded-full" />
          <span className="font-medium text-sm">Grace</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-purple-700 rounded-full">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              msg.role === "user"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl px-3 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 text-sm border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
