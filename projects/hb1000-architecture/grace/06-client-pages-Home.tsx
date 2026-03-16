// client/src/pages/Home.tsx
// Grace's landing page with main navigation options

import { Link } from "wouter";
import { MessageCircle, Phone, Sparkles, ChevronRight } from "lucide-react";
import GraceHeader from "@/components/GraceHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <GraceHeader />

      <main className="container max-w-md mx-auto px-4 pt-8 pb-20">
        {/* Grace Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src="/grace-avatar.png"
              alt="Grace"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Hey, I'm Grace 💜
          </h1>
          <p className="text-gray-500 mt-1">
            I'm here whenever you need me. What works best for you?
          </p>
        </div>

        {/* Main Options */}
        <div className="space-y-4">
          <Link href="/chat">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Let's text</h3>
                <p className="text-sm text-gray-500">Type it out, no rush</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>

          <Link href="/voice">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Let's talk</h3>
                <p className="text-sm text-gray-500">Sometimes it's easier to just say it</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>

          <Link href="/flypaper">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Catch cloud butterflies</h3>
                <p className="text-sm text-gray-500">Have ideas? Drop them here!</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Psst Link */}
        <Link href="/more">
          <div className="mt-6 text-center">
            <span className="text-sm text-purple-400 hover:text-purple-600 cursor-pointer">
              Psst... I can do a lot more →
            </span>
          </div>
        </Link>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs text-gray-400">
        Powered by Maven
      </div>
    </div>
  );
}
