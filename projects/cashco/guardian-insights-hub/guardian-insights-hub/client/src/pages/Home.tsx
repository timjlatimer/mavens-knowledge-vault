import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Brain, 
  PenLine, 
  Gavel, 
  User, 
  Shield, 
  Loader2, 
  ChevronRight, 
  MessageSquare,
  Trophy,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Eye,
  Star
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { KPIDashboardBar } from "@/components/KPIDashboardBar";
import ProgressTracker from "@/components/ProgressTracker";

// The 10 Survey Questions
const SURVEY_QUESTIONS = [
  {
    number: 1,
    title: "The Toughest Conversation",
    question: "Tell me about a time when you had a really tough conversation with a client who was struggling to make payments. What did you say? How did they respond? What made that conversation work (or not work)?"
  },
  {
    number: 2,
    title: "Building Trust in Crisis",
    question: "Describe a moment when you felt you truly connected with a client during a difficult financial situation. What happened? What did you do or say that seemed to make the difference?"
  },
  {
    number: 3,
    title: "The Relationship Builder",
    question: "What's one thing you do to build a relationship with clients beyond just the loan transaction? Is there something you remember about them, ask them about, or do for them that makes them feel valued?"
  },
  {
    number: 4,
    title: "The Community Connector",
    question: "Have you ever connected a client with a community resource, service, or support outside of our company? What was it, and how did you know to suggest it?"
  },
  {
    number: 5,
    title: "The New Client Welcome",
    question: "When a brand new client walks in (or calls) for the first time, what do you do in the first few minutes to make them feel comfortable and understood?"
  },
  {
    number: 6,
    title: "The 'Not Yet' Conversation",
    question: "When you have to tell someone they didn't qualify for a loan, how do you handle that conversation? What do you say to leave them with hope rather than shame?"
  },
  {
    number: 7,
    title: "The Celebration Moment",
    question: "Tell me about a time when a client achieved something—paid off their loan, improved their situation, or had a win in their life. How did you acknowledge or celebrate that with them?"
  },
  {
    number: 8,
    title: "The Secret Weapon",
    question: "What's your 'secret weapon' for building loyalty with clients? Something you do that you think other people might not think of?"
  },
  {
    number: 9,
    title: "The Superpower Request",
    question: "If you could give clients a 'superpower' tool that would help them manage their finances or life better, what would it do? (Think: reminders, budgeting help, finding deals, connecting to resources, etc.)"
  },
  {
    number: 10,
    title: "The Empathy Moment",
    question: "What's the most important thing you've learned about showing empathy to people who are struggling financially? What advice would you give to someone new about how to truly connect with our clients?"
  }
];

// Process steps for participation
const PROCESS_STEPS = [
  {
    step: 1,
    title: "Sign In",
    description: "Create your account to join our community of wisdom contributors",
    icon: User,
    color: "bg-blue-500"
  },
  {
    step: 2,
    title: "Share Your Story",
    description: "Answer the 10 questions below based on your frontline experience",
    icon: PenLine,
    color: "bg-green-500"
  },
  {
    step: 3,
    title: "Explore Answers",
    description: "Read how your colleagues answered each question",
    icon: Eye,
    color: "bg-purple-500"
  },
  {
    step: 4,
    title: "Become a Judge",
    description: "Once you've submitted, you can grade others' answers",
    icon: Gavel,
    color: "bg-amber-500"
  },
  {
    step: 5,
    title: "Build the Guardian",
    description: "The best answers become the Guardian's empathy engine",
    icon: Heart,
    color: "bg-rose-500"
  }
];

export default function Home() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">("normal");

  const { data: respondents } = trpc.respondents.list.useQuery();
  const { data: kpiStats } = trpc.kpi.getStats.useQuery();
  const { data: judgingStats } = trpc.judging.getStats.useQuery();

  const textSizeClass = {
    normal: "",
    large: "text-lg",
    xlarge: "text-xl"
  }[textSize];

  return (
    <div className={`min-h-screen bg-background ${textSizeClass}`}>
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Maven Cashco Guardian</h1>
              <p className="text-sm text-muted-foreground">Wisdom Giant Library Collection & Judging Project</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Text Size Controls */}
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button 
                  variant={textSize === "normal" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={() => setTextSize("normal")}
                >
                  A
                </Button>
                <Button 
                  variant={textSize === "large" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-7 px-2 text-sm"
                  onClick={() => setTextSize("large")}
                >
                  A
                </Button>
                <Button 
                  variant={textSize === "xlarge" ? "default" : "ghost"} 
                  size="sm" 
                  className="h-7 px-2 text-base"
                  onClick={() => setTextSize("xlarge")}
                >
                  A
                </Button>
              </div>
              
              <Link href="/submit">
                <Button variant="default" size="sm">
                  <PenLine className="h-4 w-4 mr-1" />
                  Share Your Story
                </Button>
              </Link>
              <Link href="/judging">
                <Button variant="outline" size="sm" className="bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100">
                  <Gavel className="h-4 w-4 mr-1" />
                  Judging Competition
                </Button>
              </Link>
              <Link href="/wisdom">
                <Button variant="outline" size="sm">
                  <Brain className="h-4 w-4 mr-1" />
                  Wisdom Library
                </Button>
              </Link>
              <Link href="/best-answers">
                <Button variant="outline" size="sm" className="bg-green-50 border-green-300 text-green-700 hover:bg-green-100">
                  <Trophy className="h-4 w-4 mr-1" />
                  Best Answers
                </Button>
              </Link>
              {user?.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Admin
                  </Button>
                </Link>
              )}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name || user?.email}</span>
                </div>
              ) : (
                <a href={getLoginUrl()}>
                  <Button variant="default" size="sm">Sign In</Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* KPI Dashboard Bar */}
      <KPIDashboardBar />

      {/* Progress Tracker for logged-in users */}
      {isAuthenticated && (
        <div className="container py-4">
          <ProgressTracker compact />
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-background py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Empathy is Our Superpower
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building the Guardian's <span className="text-primary">Empathy Engine</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're collecting the wisdom of our frontline experts—the people who build incredible relationships 
              with clients every day. Your stories, insights, and secret weapons will become the soul of the 
              Maven Cashco Guardian, helping us <strong>end financial exclusion</strong> and provide 
              <strong> relief today and hope for tomorrow</strong>.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-card border rounded-xl px-6 py-4 shadow-sm">
                <div className="text-3xl font-bold text-primary">{respondents?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
              <div className="bg-card border rounded-xl px-6 py-4 shadow-sm">
                <div className="text-3xl font-bold text-primary">{kpiStats?.totalVotes || 0}</div>
                <div className="text-sm text-muted-foreground">Votes Cast</div>
              </div>
              <div className="bg-card border rounded-xl px-6 py-4 shadow-sm">
                <div className="text-3xl font-bold text-primary">{judgingStats?.totalGrades || 0}</div>
                <div className="text-sm text-muted-foreground">Grades Given</div>
              </div>
              <div className="bg-card border rounded-xl px-6 py-4 shadow-sm">
                <div className="text-3xl font-bold text-primary">10</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {!isAuthenticated ? (
                <a href={getLoginUrl()}>
                  <Button size="lg" className="text-lg px-8">
                    <User className="h-5 w-5 mr-2" />
                    Sign In to Participate
                  </Button>
                </a>
              ) : (
                <Link href="/submit">
                  <Button size="lg" className="text-lg px-8">
                    <PenLine className="h-5 w-5 mr-2" />
                    Share Your Story
                  </Button>
                </Link>
              )}
              <Link href="/judging">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100">
                  <Gavel className="h-5 w-5 mr-2" />
                  Join the Judging
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Participate - Process Map */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Participate</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these steps to contribute your wisdom and help build the Guardian's empathy engine.
            </p>
          </div>

          {/* Process Steps */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.step} className="relative">
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Step {step.step}</div>
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <div className="max-w-3xl mx-auto mt-8">
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">Important: Submit First, Then Judge</h4>
                    <p className="text-amber-700">
                      To participate in the Judging Competition and grade others' answers, you must first submit your own story. 
                      This ensures everyone contributing to the wisdom library has skin in the game and understands the questions from personal experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The 10 Questions */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The 10 Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These questions are designed to extract the wisdom of our frontline experts. 
              Click any question to see how others have answered.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {SURVEY_QUESTIONS.map((q) => (
              <Link key={q.number} href={`/judging?question=${q.number}`}>
                <Card className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group">
                  <CardContent className="py-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="font-bold">{q.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {q.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {q.question}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA after questions */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to share your wisdom? Your answers will help build the Guardian's soul.
            </p>
            <Link href="/submit">
              <Button size="lg" className="text-lg px-8">
                <PenLine className="h-5 w-5 mr-2" />
                Answer These Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      {respondents && respondents.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Wisdom Contributors</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These frontline experts have shared their stories and insights. Click on any name to read their full answers.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {respondents.map((r) => (
                <Link key={r.id} href={`/respondent/${r.id}`}>
                  <Card className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                    <CardContent className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{r.name}</h3>
                          {r.title && <p className="text-sm text-muted-foreground">{r.title}</p>}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why This Matters */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why This Matters</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Empathy is Our Superpower</h3>
                  <p className="text-muted-foreground">
                    We practice empathy with a sense of "there but for the grace of God go I." 
                    Your stories teach the Guardian how to truly care.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Relief Today, Hope Tomorrow</h3>
                  <p className="text-muted-foreground">
                    We provide immediate relief while building a path back to regular credit. 
                    Your wisdom shows how to balance both.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">End Financial Exclusion</h3>
                  <p className="text-muted-foreground">
                    "It's expensive to be poor." We're changing that. Your insights help us serve 
                    the unbanked, underbanked, and left behind.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quote */}
            <div className="mt-12 text-center">
              <blockquote className="text-2xl font-medium italic text-muted-foreground max-w-3xl mx-auto">
                "People don't care how much you know until they know how much you care about them."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/submit">
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <PenLine className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold">Share Your Story</h3>
                    <p className="text-sm text-muted-foreground mt-2">Answer the 10 questions</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/judging">
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full bg-amber-50 border-amber-200">
                  <CardContent className="pt-6 text-center">
                    <Gavel className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                    <h3 className="font-bold text-amber-800">Judging Competition</h3>
                    <p className="text-sm text-amber-700 mt-2">Grade the best answers</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/wisdom">
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold">Wisdom Library</h3>
                    <p className="text-sm text-muted-foreground mt-2">Explore the knowledge base</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard">
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold">Dashboard</h3>
                    <p className="text-sm text-muted-foreground mt-2">View analytics & leaders</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container text-center">
          <h3 className="font-bold text-lg mb-2">Maven Cashco Guardian</h3>
          <p className="text-muted-foreground mb-4">Wisdom Giant Library Collection & Judging Project</p>
          <p className="text-sm text-muted-foreground">
            <Heart className="h-4 w-4 inline-block text-rose-500 mr-1" />
            Empathy is our superpower. Relief today, hope for tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
}
