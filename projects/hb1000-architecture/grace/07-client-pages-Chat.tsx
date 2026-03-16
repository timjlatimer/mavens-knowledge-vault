// client/src/pages/Chat.tsx
// Text chat interface with Grace

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ExtractedInfo {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  contactPreference: string | null;
  story: string | null;
  isComplete: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Maven! I'm so glad you're here! 💜 I'm Grace, and I'm excited to meet you. What brings you to Maven today? Just curious about us, or is there something specific on your mind?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sessionId] = useState(() => `chat-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = trpc.chat.sendMessage.useMutation();
  const extractInfo = trpc.chat.extractInfo.useMutation();
  const submitIntake = trpc.chat.submitIntake.useMutation();
  const saveMessage = trpc.chat.saveMessage.useMutation();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Save initial greeting
  useEffect(() => {
    saveMessage.mutateAsync({
      sessionId,
      role: "assistant",
      content: messages[0].content,
    }).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    // Save user message
    try {
      await saveMessage.mutateAsync({
        sessionId,
        role: "user",
        content: userMessage,
      });
    } catch (e) {
      console.error("Failed to save user message:", e);
    }

    try {
      // Get Grace's response
      const response = await sendMessage.mutateAsync({
        message: userMessage,
        history: messages,
      });

      const assistantMessage: Message = { role: "assistant", content: response.reply };
      setMessages([...newMessages, assistantMessage]);

      // Save assistant message
      try {
        await saveMessage.mutateAsync({
          sessionId,
          role: "assistant",
          content: response.reply,
        });
      } catch (e) {
        console.error("Failed to save assistant message:", e);
      }

      // Check if we have enough info to submit (after a few exchanges)
      if (!hasSubmitted && newMessages.length >= 6) {
        try {
          const extracted = await extractInfo.mutateAsync({
            history: [...newMessages, assistantMessage],
          });

          if (extracted.isComplete) {
            await submitIntake.mutateAsync({
              firstName: extracted.firstName,
              lastName: extracted.lastName,
              phone: extracted.phone,
              email: extracted.email,
              contactPreference: extracted.contactPreference as any,
              story: extracted.story,
              source: "chat",
              sessionId,
            });
            setHasSubmitted(true);
          }
        } catch (e) {
          console.error("Extraction/submission error:", e);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "I'm sorry, I'm having a little trouble right now. Could you try again? 💜" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur border-b border-purple-100">
        <Link href="/">
          <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/grace-avatar.png"
              alt="Grace"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Grace</h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-sm border border-purple-50 rounded-bl-sm"
              }`}
            >
              <Streamdown>{msg.content}</Streamdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-purple-50 rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/80 backdrop-blur border-t border-purple-100">
        <div className="flex items-end gap-2 max-w-2xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-2xl border border-purple-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white min-h-[44px] max-h-[120px]"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="rounded-full w-11 h-11 bg-purple-600 hover:bg-purple-700 flex items-center justify-center shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
