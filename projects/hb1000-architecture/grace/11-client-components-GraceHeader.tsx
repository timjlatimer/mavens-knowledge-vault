// client/src/components/GraceHeader.tsx
// Header component with navigation and village activity ticker tape

import { Link, useLocation } from "wouter";
import { MessageCircle, Phone, Sparkles, Type } from "lucide-react";
import { useState } from "react";

const TICKER_MESSAGES = [
  "💬 Someone just shared their story with Grace...",
  "💜 A new Maven member joined the village...",
  "🤝 Trina just connected with a community member...",
  "✨ Another family supported by the Maven village...",
];

export default function GraceHeader() {
  const [location] = useLocation();
  const [fontSize, setFontSize] = useState(16);

  const toggleFontSize = () => {
    setFontSize((prev) => (prev >= 20 ? 14 : prev + 2));
    document.documentElement.style.fontSize = `${fontSize}px`;
  };

  const navItems = [
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/voice", label: "Talk", icon: Phone },
    { href: "/flypaper", label: "Flypaper", icon: Sparkles },
  ];

  return (
    <header>
      {/* Ticker Tape - Village Activity */}
      <div className="bg-purple-800 text-white overflow-hidden py-1.5">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
          {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, i) => (
            <span key={i} className="text-sm font-medium opacity-90">
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur border-b border-purple-100 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="/grace-avatar.png"
                alt="Grace"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-800">Grace</span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <button
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                    location === href
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              </Link>
            ))}

            {/* Accessibility: Font size toggle */}
            <button
              onClick={toggleFontSize}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50"
              title="Adjust text size"
            >
              <Type className="w-4 h-4" />
              <span className="sr-only">A</span>
            </button>

            <Link href="/more">
              <button className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1.5">
                More
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
