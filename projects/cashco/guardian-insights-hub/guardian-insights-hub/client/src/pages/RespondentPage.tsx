import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Briefcase, Building, Loader2 } from "lucide-react";
import { Link, useParams } from "wouter";
import { KPIDashboardBar } from "@/components/KPIDashboardBar";

export default function RespondentPage() {
  const params = useParams<{ id: string }>();
  const respondentId = parseInt(params.id || "0", 10);

  const { user, isAuthenticated } = useAuth();

  const { data, isLoading, error } = trpc.respondents.getById.useQuery(
    { id: respondentId },
    { enabled: respondentId > 0 }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-destructive mb-4">Respondent not found</p>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const { respondent, responses } = data;

  const questionLabels: Record<number, string> = {
    1: "The Unforgettable Client Story",
    2: "The Toughest Conversation",
    3: "Beyond the Loan",
    4: "Celebrating the Wins",
    5: "Your Secret Weapon",
    6: "The First Five Minutes",
    7: 'The "Not Yet" Moment',
    8: "The Community Connector",
    9: "The Power of Remembering",
    10: "If You Had a Superpower...",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">{respondent.name}</h1>
                <p className="text-sm text-muted-foreground">Full Survey Responses</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name || user?.email}</span>
                </div>
              ) : (
                <a href={getLoginUrl()}>
                  <Button variant="default" size="sm">Sign in to add to the wisdom</Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* KPI Dashboard Bar */}
      <KPIDashboardBar />

      {/* Respondent Info */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-8">
        <div className="container">
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{respondent.name}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                {respondent.title && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{respondent.title}</span>
                  </div>
                )}
                {respondent.organization && (
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{respondent.organization}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Responses */}
      <main className="container py-8">
        <div className="max-w-3xl space-y-6">
          {responses.map((response) => (
            <Card key={response.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <span className="text-primary font-bold mr-2">Q{response.questionNumber}.</span>
                  {questionLabels[response.questionNumber] || response.questionText}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 italic">{response.questionText}</p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap">{response.answerText}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {responses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No survey responses available for this contributor.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Maven Cashco Guardian Insights Hub</p>
          <p className="mt-1">Empathy is our superpower. Relief today, hope for tomorrow.</p>
        </div>
      </footer>
    </div>
  );
}
