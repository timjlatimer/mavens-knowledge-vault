// client/src/pages/Voice.tsx
// Voice chat interface with Grace using speech recognition and ElevenLabs TTS

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { ArrowLeft, Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Voice() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Maven! I'm so glad you're here! I'm Grace. What brings you to Maven today?",
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sessionId] = useState(() => `voice-${Date.now()}-${Math.random().toString(36).slice(2)}`);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sendMessage = trpc.chat.sendMessage.useMutation();
  const synthesize = trpc.voice.synthesize.useMutation();
  const extractInfo = trpc.chat.extractInfo.useMutation();
  const submitIntake = trpc.chat.submitIntake.useMutation();
  const saveMessage = trpc.chat.saveMessage.useMutation();

  // Save initial greeting
  useEffect(() => {
    saveMessage.mutateAsync({
      sessionId,
      role: "assistant",
      content: messages[0].content,
    }).catch(console.error);

    // Speak the initial greeting
    speakText(messages[0].content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speakText = useCallback(async (text: string) => {
    setIsSpeaking(true);
    try {
      const result = await synthesize.mutateAsync({ text });
      const audioBlob = new Blob(
        [Uint8Array.from(atob(result.audio), c => c.charCodeAt(0))],
        { type: result.contentType }
      );
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      await audio.play();
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser. Please use Chrome.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-CA"; // Canadian English

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript("");
  }, []);

  const stopListening = useCallback(async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);

    if (!transcript.trim()) return;

    const userMessage = transcript.trim();
    setTranscript("");
    setIsProcessing(true);

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

      // Speak the response
      await speakText(response.reply);

      // Check if we have enough info to submit
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
              source: "voice",
              sessionId,
            });
            setHasSubmitted(true);
          }
        } catch (e) {
          console.error("Extraction/submission error:", e);
        }
      }
    } catch (error) {
      console.error("Voice chat error:", error);
      const errorMsg = "I'm sorry, I'm having a little trouble right now. Could you try again?";
      setMessages([...newMessages, { role: "assistant", content: errorMsg }]);
      await speakText(errorMsg);
    } finally {
      setIsProcessing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, messages, hasSubmitted, sessionId]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-pink-50 to-amber-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur border-b border-amber-100">
        <Link href="/">
          <button className="p-2 hover:bg-amber-50 rounded-full transition-colors">
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
            {isSpeaking && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Grace</h2>
            <p className="text-xs text-amber-500">
              {isSpeaking ? "Speaking..." : isProcessing ? "Thinking..." : "Voice Chat"}
            </p>
          </div>
        </div>
      </div>

      {/* Conversation Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-amber-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-sm border border-amber-50 rounded-bl-sm"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Live transcript */}
        {transcript && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-amber-100 text-amber-800 rounded-br-sm border border-amber-200">
              <p className="text-sm italic">{transcript}...</p>
            </div>
          </div>
        )}
      </div>

      {/* Voice Controls */}
      <div className="p-6 bg-white/80 backdrop-blur border-t border-amber-100">
        <div className="flex flex-col items-center gap-4">
          {isSpeaking && (
            <div className="flex items-center gap-2 text-amber-600">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Grace is speaking...</span>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Grace is thinking...</span>
            </div>
          )}

          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking || isProcessing}
            className={`rounded-full w-16 h-16 flex items-center justify-center transition-all ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {isListening ? (
              <MicOff className="w-7 h-7" />
            ) : (
              <Mic className="w-7 h-7" />
            )}
          </Button>

          <p className="text-xs text-gray-400">
            {isListening ? "Tap to stop" : "Tap to speak"}
          </p>
        </div>
      </div>
    </div>
  );
}
