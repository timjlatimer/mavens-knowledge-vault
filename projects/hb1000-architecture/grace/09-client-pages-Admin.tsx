// client/src/pages/Admin.tsx
// Trina's Dashboard - Admin panel to view all intakes and chat transcripts

import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Phone, Mail, MessageSquare, Clock, User, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface Intake {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  contactPreference: string | null;
  story: string | null;
  status: "pending" | "contacted" | "completed" | "cancelled";
  source: "chat" | "voice";
  sessionId: string | null;
  createdAt: string;
}

interface ConversationMessage {
  id: number;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedIntake, setExpandedIntake] = useState<number | null>(null);

  const { data: intakes, isLoading } = trpc.admin.getIntakes.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: conversation } = trpc.admin.getConversation.useQuery(
    { intakeId: expandedIntake! },
    { enabled: expandedIntake !== null }
  );

  const updateStatus = trpc.admin.updateStatus.useMutation({
    onSuccess: () => {
      // Invalidate to refresh
      trpc.useUtils().admin.getIntakes.invalidate();
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="animate-pulse text-purple-400">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Please log in to access the dashboard.</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const filteredIntakes = intakes?.filter((intake: Intake) =>
    statusFilter === "all" ? true : intake.status === statusFilter
  ) || [];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    contacted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const contactIcons: Record<string, any> = {
    phone: Phone,
    text: MessageSquare,
    email: Mail,
    any: User,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-purple-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Trina's Dashboard</h1>
              <p className="text-sm text-gray-500">{filteredIntakes.length} intake{filteredIntakes.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-purple-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Intakes List */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {filteredIntakes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No intakes yet</p>
          </div>
        ) : (
          filteredIntakes.map((intake: Intake) => {
            const name = [intake.firstName, intake.lastName].filter(Boolean).join(" ") || "Unknown";
            const ContactIcon = contactIcons[intake.contactPreference || "any"] || User;
            const isExpanded = expandedIntake === intake.id;

            return (
              <div key={intake.id} className="bg-white rounded-2xl shadow-sm border border-purple-50 overflow-hidden">
                {/* Intake Card */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(intake.createdAt).toLocaleString()}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
                          {intake.source === "voice" ? "🎤 Voice" : "💬 Chat"}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[intake.status]}`}>
                      {intake.status}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    {intake.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-purple-400" />
                        <a href={`tel:${intake.phone}`} className="hover:text-purple-600">{intake.phone}</a>
                      </div>
                    )}
                    {intake.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-purple-400" />
                        <a href={`mailto:${intake.email}`} className="hover:text-purple-600">{intake.email}</a>
                      </div>
                    )}
                    {intake.contactPreference && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ContactIcon className="w-4 h-4 text-purple-400" />
                        Prefers: {intake.contactPreference}
                      </div>
                    )}
                  </div>

                  {/* Story */}
                  {intake.story && (
                    <div className="bg-purple-50 rounded-xl p-3 mb-3">
                      <p className="text-sm text-gray-700">{intake.story}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {["pending", "contacted", "completed", "cancelled"].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus.mutate({ id: intake.id, status: status as any })}
                          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                            intake.status === status
                              ? statusColors[status] + " border-transparent"
                              : "border-gray-200 text-gray-400 hover:border-purple-200 hover:text-purple-600"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpandedIntake(isExpanded ? null : intake.id)}
                      className="flex items-center gap-1 text-sm text-purple-500 hover:text-purple-700"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {isExpanded ? "Hide" : "View"} Chat Transcript
                    </button>
                  </div>
                </div>

                {/* Chat Transcript */}
                {isExpanded && (
                  <div className="border-t border-purple-50 bg-gray-50 p-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Chat Transcript</h4>
                    {conversation && conversation.length > 0 ? (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {conversation.map((msg: ConversationMessage) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                                msg.role === "user"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-white text-gray-700 border border-gray-200"
                              }`}
                            >
                              <p className="text-xs font-medium mb-1 opacity-60">
                                {msg.role === "user" ? name : "Grace"}
                              </p>
                              <p>{msg.content}</p>
                              <p className="text-xs opacity-40 mt-1">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No conversation history found for this intake.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
