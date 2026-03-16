// client/src/pages/Flypaper.tsx
// "Catch cloud butterflies" - idea capture page

import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Send, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export default function Flypaper() {
  const [input, setInput] = useState("");

  const { data: thoughts, isLoading } = trpc.flypaper.getAll.useQuery();
  const createThought = trpc.flypaper.create.useMutation({
    onSuccess: () => {
      setInput("");
      trpc.useUtils().flypaper.getAll.invalidate();
    },
  });

  const handleSubmit = () => {
    if (!input.trim()) return;
    createThought.mutate({ content: input.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-yellow-100 p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link href="/">
            <button className="p-2 hover:bg-yellow-50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Catch Cloud Butterflies
            </h1>
            <p className="text-xs text-gray-500">Have ideas? Drop them here!</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-4 mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind? Drop your idea, thought, or butterfly here..."
            className="w-full resize-none border-0 focus:outline-none text-sm min-h-[80px] placeholder-gray-400"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || createThought.isPending}
              className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm"
            >
              <Send className="w-4 h-4 mr-1" />
              Drop it
            </Button>
          </div>
        </div>

        {/* Thoughts List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">
              <Sparkles className="w-8 h-8 mx-auto mb-2 animate-pulse" />
              <p className="text-sm">Catching butterflies...</p>
            </div>
          ) : thoughts && thoughts.length > 0 ? (
            thoughts.map((thought: any) => (
              <div
                key={thought.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-yellow-50 hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-700">{thought.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {new Date(thought.createdAt).toLocaleString()}
                  </span>
                  {thought.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                      {thought.category}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No butterflies caught yet</p>
              <p className="text-xs mt-1">Drop your first idea above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
