import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Send, CheckCircle, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

const SURVEY_QUESTIONS = [
  {
    id: "q1ToughestConversation",
    label: "The Toughest Conversation",
    question: "Tell us about one of the toughest conversations you've had with a client. How did you handle it, and what did you learn?",
    placeholder: "Share a difficult moment and how you navigated it with empathy...",
  },
  {
    id: "q2BuildingTrust",
    label: "Building Trust",
    question: "Describe a time when you built a strong, trusting relationship with a client. What made it work?",
    placeholder: "What actions or words helped create that bond?",
  },
  {
    id: "q3FirstInteraction",
    label: "First Interaction Magic",
    question: "What do you do in the first few minutes of meeting a new client to make them feel comfortable and heard?",
    placeholder: "Your opening moves that set the tone...",
  },
  {
    id: "q4DenialConversation",
    label: "The 'Not Yet' Conversation",
    question: "How do you handle telling a client they've been denied? What do you say, and how do you leave them with hope?",
    placeholder: "How do you deliver hard news with compassion?",
  },
  {
    id: "q5CommunityResources",
    label: "Community Connector",
    question: "What community resources, organizations, or local supports do you recommend to clients? Why are they valuable?",
    placeholder: "Share the hidden gems in your community...",
  },
  {
    id: "q6ClientWins",
    label: "Celebrating Wins",
    question: "Tell us about a time a client achieved something meaningful—paid off a loan, improved their situation, or celebrated a milestone. How did you celebrate with them?",
    placeholder: "A success story that made your day...",
  },
  {
    id: "q7SecretWeapon",
    label: "Your Secret Weapon",
    question: "What's your 'secret weapon' for connecting with clients? A phrase you use, a technique, or something unique to your approach?",
    placeholder: "The thing that makes you, you...",
  },
  {
    id: "q8IdealBotFeatures",
    label: "Dream Bot Features",
    question: "If you could give clients a personal AI assistant to help them, what features would it have? What would it do for them?",
    placeholder: "Imagine the perfect helper for our clients...",
  },
  {
    id: "q9AdditionalThoughts",
    label: "Additional Thoughts",
    question: "Is there anything else you'd like to share about your experience working with clients?",
    placeholder: "Any wisdom, insights, or stories we haven't asked about...",
  },
  {
    id: "q10MemorableStory",
    label: "Most Memorable Story",
    question: "What's the most memorable client story you have? The one that reminds you why you do this work?",
    placeholder: "The story that stays with you...",
  },
];

export default function SubmitStory() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    submitterName: "",
    submitterEmail: "",
    submitterTitle: "",
    submitterOrganization: "",
    q1ToughestConversation: "",
    q2BuildingTrust: "",
    q3FirstInteraction: "",
    q4DenialConversation: "",
    q5CommunityResources: "",
    q6ClientWins: "",
    q7SecretWeapon: "",
    q8IdealBotFeatures: "",
    q9AdditionalThoughts: "",
    q10MemorableStory: "",
  });

  const submitMutation = trpc.submissions.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Thank you! Your story has been submitted.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit. Please try again.");
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.submitterName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    submitMutation.mutate(formData);
  };

  const filledQuestions = SURVEY_QUESTIONS.filter(
    (q) => formData[q.id as keyof typeof formData]?.trim()
  ).length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        <div className="container py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your frontline wisdom has been submitted and is awaiting review.
                Your insights will help shape the Maven Cashco Guardian.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-600 mb-8">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Your empathy makes a difference</span>
              </div>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Insights Hub
                  </Button>
                </Link>
                <Button onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    submitterName: "",
                    submitterEmail: "",
                    submitterTitle: "",
                    submitterOrganization: "",
                    q1ToughestConversation: "",
                    q2BuildingTrust: "",
                    q3FirstInteraction: "",
                    q4DenialConversation: "",
                    q5CommunityResources: "",
                    q6ClientWins: "",
                    q7SecretWeapon: "",
                    q8IdealBotFeatures: "",
                    q9AdditionalThoughts: "",
                    q10MemorableStory: "",
                  });
                }}>
                  Submit Another Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Insights Hub
              </Button>
            </Link>
            <div className="text-white/80 text-sm">
              {filledQuestions} of {SURVEY_QUESTIONS.length} questions answered
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Hero Section */}
        <div className="text-center text-white mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Share Your Frontline Wisdom</h1>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your experiences and insights are invaluable. Help us build the Maven Cashco Guardian
            by sharing the wisdom you've gained from working with clients every day.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Info Card */}
          <Card className="mb-6 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>About You</CardTitle>
              <CardDescription>
                Tell us a bit about yourself so we can credit your contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="submitterName">Your Name *</Label>
                <Input
                  id="submitterName"
                  value={formData.submitterName}
                  onChange={(e) => handleChange("submitterName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="submitterEmail">Email (optional)</Label>
                <Input
                  id="submitterEmail"
                  type="email"
                  value={formData.submitterEmail}
                  onChange={(e) => handleChange("submitterEmail", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="submitterTitle">Your Title/Role (optional)</Label>
                <Input
                  id="submitterTitle"
                  value={formData.submitterTitle}
                  onChange={(e) => handleChange("submitterTitle", e.target.value)}
                  placeholder="e.g., Branch Manager, Customer Service Rep"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="submitterOrganization">Organization (optional)</Label>
                <Input
                  id="submitterOrganization"
                  value={formData.submitterOrganization}
                  onChange={(e) => handleChange("submitterOrganization", e.target.value)}
                  placeholder="e.g., Maven, Cashco Financial"
                />
              </div>
            </CardContent>
          </Card>

          {/* Survey Questions */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {SURVEY_QUESTIONS.map((q, index) => (
              <Card key={q.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{q.label}</CardTitle>
                      <CardDescription className="mt-1">{q.question}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData[q.id as keyof typeof formData]}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={4}
                    className="resize-none"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Button
              type="submit"
              size="lg"
              disabled={submitMutation.isPending || !formData.submitterName.trim()}
              className="px-8"
            >
              {submitMutation.isPending ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Your Story
                </>
              )}
            </Button>
            <p className="text-white/60 text-sm mt-4">
              Your submission will be reviewed by an admin before being added to the wisdom library.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
