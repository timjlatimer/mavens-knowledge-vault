import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PrintQuestionnaire } from "@/components/PrintQuestionnaire";
import { ProgressBanner } from "@/components/ProgressBanner";
import { getLoginUrl } from "@/const";
import { Compass, Heart, Lightbulb, Target, Users, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();
  const { data: myData } = trpc.questionnaire.getMyResponses.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const questionsCompleted = myData?.responses?.length || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Progress Banner - Shows journey progress */}
      <ProgressBanner questionsCompleted={questionsCompleted} />
      {/* Hero Section - High Visual Impact */}
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
              <Compass className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Main Headline - Extra Large */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              North Star
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A transformative 30-question journey to uncover your deepest values, purpose, and the principles that guide your life.
          </p>

          {/* Primary CTA - Large and Prominent */}
          <div className="pt-4">
            {isAuthenticated ? (
              <Link href="/questionnaire">
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            )}
          </div>

          {/* Trust Indicator */}
          <p className="text-sm text-muted-foreground">
            ✨ Free • 20-30 minutes • Completely confidential
          </p>

          {/* Print Option */}
          <div className="pt-6 border-t border-border/50 mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              💡 <strong>Prefer to reflect offline?</strong> Print the questionnaire and take your time with pen and paper.
            </p>
            <PrintQuestionnaire variant="outline" size="lg" />
          </div>
        </div>
      </div>

      {/* What is Destiny Discovered Section */}
      <div className="container py-16 bg-card/50 rounded-3xl my-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-foreground">
            What is Destiny Discovered?
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
            Destiny Discovered is a comprehensive self-assessment designed to help you explore the fundamental questions of life: What do you value? What drives you? What legacy do you want to leave? Through 30 thoughtfully crafted questions, you'll gain clarity on your purpose and the principles that shape your decisions.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Discover Your Values</h3>
                <p className="text-sm text-muted-foreground">
                  Identify the core principles that guide your thoughts and actions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Clarify Your Purpose</h3>
                <p className="text-sm text-muted-foreground">
                  Understand what you want your life to stand for and the impact you want to make
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                  <Lightbulb className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Gain Self-Awareness</h3>
                <p className="text-sm text-muted-foreground">
                  Recognize your strengths, limitations, and areas for growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            How It Works
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-muted-foreground">
                  Sign in securely to begin your journey. Your responses are private and confidential.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Answer 30 Questions</h3>
                <p className="text-muted-foreground">
                  Explore questions about your values, beliefs, purpose, and vision for the future. Take your time—there are no right or wrong answers.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reflect on Your Insights</h3>
                <p className="text-muted-foreground">
                  Review your responses and discover patterns in your thinking. See how your values and beliefs shape your worldview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Explore Section */}
      <div className="container py-16 bg-muted/30 rounded-3xl my-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            What You'll Explore
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Core Values & Beliefs</h4>
                <p className="text-sm text-muted-foreground">
                  What matters most to you? What principles govern your decisions?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Purpose & Legacy</h4>
                <p className="text-sm text-muted-foreground">
                  What do you want your life to stand for? What impact do you want to make?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Self-Awareness</h4>
                <p className="text-sm text-muted-foreground">
                  What influences are in your control? What are your limiting factors?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Success Philosophy</h4>
                <p className="text-sm text-muted-foreground">
                  How do you define success? What factors contribute to achievement?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Action & Impact</h4>
                <p className="text-sm text-muted-foreground">
                  How can you change the world? What obligations do you feel?
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Sparkles className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Worldview</h4>
                <p className="text-sm text-muted-foreground">
                  What shapes your perspective? What do you believe about the universe?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Discover Your North Star?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join others on a journey of self-discovery and purpose.
          </p>
          {isAuthenticated ? (
            <Link href="/questionnaire">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent"
              >
                Start Your Journey Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent"
              >
                Start Your Journey Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="container py-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2026 Destiny Discovered. All rights reserved.</p>
          <p className="mt-2">A tool for personal growth and self-discovery.</p>
        </div>
      </footer>
    </div>
  );
}
