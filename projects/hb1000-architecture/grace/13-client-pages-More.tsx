// client/src/pages/More.tsx
// "Psst... I can do a lot more" - upcoming features page

import { Link } from "wouter";
import { ArrowLeft, Calculator, Calendar, BookOpen, Heart, Shield, TrendingUp, Users, Wallet } from "lucide-react";

const upcomingFeatures = [
  {
    icon: Calculator,
    title: "Budget Builder",
    description: "A simple tool to help you see where your money goes and find room to breathe.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Wallet,
    title: "Emergency Fund Tracker",
    description: "Small steps add up. Track your progress toward your safety net.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Calendar,
    title: "Bill Calendar",
    description: "Never miss a due date. See all your bills in one place.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Local programs, grants, and resources you might not know about.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Heart,
    title: "Community Stories",
    description: "Real stories from Maven members who've been where you are.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Shield,
    title: "Financial Coaching",
    description: "One-on-one guidance from someone who gets it.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: TrendingUp,
    title: "Credit Builder",
    description: "Practical steps to build or rebuild your credit score.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Users,
    title: "Maven Village",
    description: "Connect with other members. You're not alone.",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function More() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-purple-100 p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link href="/">
            <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="font-semibold text-gray-800">Coming Soon ✨</h1>
            <p className="text-xs text-gray-500">Grace is learning new tricks</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-md mx-auto p-4">
        <p className="text-sm text-gray-600 mb-6">
          We're building these features to help make life a little easier. Stay tuned! 💜
        </p>

        <div className="grid grid-cols-1 gap-3">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-purple-50 opacity-80"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800 text-sm">{feature.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
