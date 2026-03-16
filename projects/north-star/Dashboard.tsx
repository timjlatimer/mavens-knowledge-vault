import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrintQuestionnaire } from "@/components/PrintQuestionnaire";
import { ProgressBanner } from "@/components/ProgressBanner";
import { trpc } from "@/lib/trpc";
import { Loader2, Edit, CheckCircle, Circle, Compass, Clock, ArrowRight, Calendar } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";
import { QUESTIONS } from "@shared/questions";

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { data: myData, isLoading } = trpc.questionnaire.getMyResponses.useQuery(undefined, {
    enabled: isAuthenticated
  });

  const { data: reminders } = trpc.questionnaire.getMyReminders.useQuery(undefined, {
    enabled: isAuthenticated
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const hasStarted = myData && myData.responses && myData.responses.length > 0;
  const isComplete = myData?.respondent?.isComplete;
  const answeredQuestions = myData?.responses?.length || 0;
  const totalQuestions = QUESTIONS.length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <>
      {/* Progress Banner - Shows journey progress */}
      <ProgressBanner questionsCompleted={answeredQuestions} />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Destiny Discovered</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PrintQuestionnaire userResponses={myData?.responses} variant="outline" />
              <Button variant="outline" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Continue Where You Left Off Card */}
        {hasStarted && !isComplete && (
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Continue Where You Left Off</CardTitle>
                  <CardDescription>
                    Pick up your journey exactly where you paused
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Last Question Info */}
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">Question {answeredQuestions + 1} of {totalQuestions}</Badge>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                      </div>
                      <p className="text-sm font-medium mb-1">
                        {QUESTIONS[answeredQuestions]?.text || "Continue your questionnaire"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Category: {QUESTIONS[answeredQuestions]?.category || "Unknown"}
                      </p>
                    </div>
                    <Button asChild size="lg" className="shrink-0">
                      <a href="/questionnaire">
                        Resume
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Upcoming Reminders */}
                {reminders && reminders.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Upcoming Reminders</span>
                    </div>
                    <div className="space-y-2">
                      {reminders.slice(0, 2).map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              {new Date(reminder.scheduledFor).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </span>
                            {reminder.reminderNote && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                "{reminder.reminderNote}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Encouragement Message */}
                <p className="text-sm text-muted-foreground text-center pt-2">
                  💡 Take your time. Deep reflection can't be rushed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  {isComplete ? "You've completed the questionnaire!" : "Continue your journey of self-discovery"}
                </CardDescription>
              </div>
              {isComplete ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <Circle className="w-12 h-12 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Questions Answered</span>
                  <span className="font-medium">{answeredQuestions} of {totalQuestions}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {!hasStarted && (
                <div className="pt-4">
                  <p className="text-muted-foreground mb-4">
                    You haven't started the questionnaire yet. Begin your journey to discover your North Star.
                  </p>
                  <Button asChild className="w-full sm:w-auto">
                    <a href="/questionnaire">Start Questionnaire</a>
                  </Button>
                </div>
              )}

              {hasStarted && !isComplete && (
                <div className="pt-4">
                  <Button asChild className="w-full sm:w-auto">
                    <a href="/questionnaire">Continue Questionnaire</a>
                  </Button>
                </div>
              )}

              {isComplete && (
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    You can review and edit your responses below.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="/questionnaire">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Responses
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Responses Summary */}
        {hasStarted && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Responses</h2>
              <Badge variant="secondary">{answeredQuestions} answered</Badge>
            </div>

            <div className="grid gap-4">
              {myData?.responses?.map((response) => {
                const question = QUESTIONS.find(q => q.number === response.questionNumber);
                if (!question) return null;

                return (
                  <Card key={response.id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {response.questionNumber}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base mb-1">{question.text}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {question.category}
                            </Badge>
                            {response.tags && response.tags.length > 0 && (
                              response.tags.slice(0, 3).map((tag: any) => (
                                <Badge key={tag.tagId} variant="secondary" className="text-xs">
                                  {tag.tagName}
                                </Badge>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Text Response */}
                      {response.responseType === "text" && response.responseText && (
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {response.responseText}
                        </p>
                      )}

                      {/* List Response */}
                      {response.responseType === "list" && response.listItems && response.listItems.length > 0 && (
                        <ul className="space-y-2">
                          {response.listItems.map((item: any, idx: number) => (
                            <li key={item.id} className="text-sm text-muted-foreground flex gap-2">
                              <span className="font-medium">{idx + 1}.</span>
                              <span>{item.itemText}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Multiple Choice Response */}
                      {response.responseType === "multiple_choice" && response.multipleChoice && response.multipleChoice.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Selected:</span> {response.multipleChoice[0].optionSelected}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Belief Response */}
            {myData?.beliefResponse && (
              <Card>
                <CardHeader>
                  <CardTitle>Belief System</CardTitle>
                  <CardDescription>Questions 22-23</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Believes in God/Superior Being:</p>
                    <p className="text-sm text-muted-foreground">
                      {myData.beliefResponse.believesInGod ? "Yes" : "No"}
                    </p>
                  </div>
                  {myData.beliefResponse.whyText && (
                    <div>
                      <p className="text-sm font-medium mb-1">Why:</p>
                      <p className="text-sm text-muted-foreground">{myData.beliefResponse.whyText}</p>
                    </div>
                  )}
                  {myData.beliefResponse.advantagesText && (
                    <div>
                      <p className="text-sm font-medium mb-1">Advantages:</p>
                      <p className="text-sm text-muted-foreground">{myData.beliefResponse.advantagesText}</p>
                    </div>
                  )}
                  {myData.beliefResponse.evidenceText && (
                    <div>
                      <p className="text-sm font-medium mb-1">Evidence:</p>
                      <p className="text-sm text-muted-foreground">{myData.beliefResponse.evidenceText}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Success Factors */}
            {myData?.successFactors && (
              <Card>
                <CardHeader>
                  <CardTitle>Success Attribution</CardTitle>
                  <CardDescription>Question 30</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Personal Influence:</span>
                      <span className="text-sm font-medium">{myData.successFactors.personalInfluencePct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Influence of Others:</span>
                      <span className="text-sm font-medium">{myData.successFactors.othersInfluencePct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Economic/Social:</span>
                      <span className="text-sm font-medium">{myData.successFactors.economicSocialPct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uncontrollable:</span>
                      <span className="text-sm font-medium">{myData.successFactors.uncontrollablePct}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
