import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Compass } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { QUESTIONS } from "@shared/questions";

export default function RespondentDetail() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const params = useParams();
  const respondentId = parseInt(params.id || "0");

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "admin")) {
      window.location.href = "/";
    }
  }, [authLoading, isAuthenticated, user]);

  const { data: respondentData, isLoading } = trpc.admin.getRespondentDetail.useQuery(
    { respondentId },
    { enabled: isAuthenticated && user?.role === "admin" && respondentId > 0 }
  );

  const { data: respondents } = trpc.admin.getAllRespondents.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin"
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const respondent = respondents?.find(r => r.id === respondentId);

  if (!respondent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Respondent not found</p>
          <Button asChild>
            <Link href="/admin">Back to Admin</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{respondent.fullName}</h1>
                <p className="text-sm text-muted-foreground">
                  {respondent.email || "No email provided"}
                </p>
              </div>
            </div>
            <div>
              {respondent.isComplete ? (
                <Badge variant="default" className="bg-green-600">Complete</Badge>
              ) : (
                <Badge variant="secondary">In Progress</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Respondent Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Respondent Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{respondent.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{respondent.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Job Title</p>
                <p className="font-medium">{respondent.jobTitle || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Organization</p>
                <p className="font-medium">{respondent.organization || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Submitted</p>
                <p className="font-medium">{new Date(respondent.dateSubmitted).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{new Date(respondent.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responses */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Responses</h2>

          {respondentData?.responses && respondentData.responses.length > 0 ? (
            <div className="space-y-4">
              {respondentData.responses.map((response) => {
                const question = QUESTIONS.find(q => q.number === response.questionNumber);
                if (!question) return null;

                return (
                  <Card key={response.id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold flex-shrink-0">
                          {response.questionNumber}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{question.text}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {question.category}
                            </Badge>
                            {response.tags && response.tags.length > 0 && (
                              response.tags.map((tag: any) => (
                                <Badge 
                                  key={tag.tagId} 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {tag.tagName}
                                  {tag.confidence !== "high" && (
                                    <span className="ml-1 text-[10px] opacity-60">
                                      ({tag.confidence})
                                    </span>
                                  )}
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
                        <div className="prose prose-sm max-w-none">
                          <p className="whitespace-pre-wrap text-foreground">{response.responseText}</p>
                        </div>
                      )}

                      {/* List Response */}
                      {response.responseType === "list" && response.listItems && response.listItems.length > 0 && (
                        <ul className="space-y-2">
                          {response.listItems.map((item: any, idx: number) => (
                            <li key={item.id} className="flex gap-3">
                              <span className="font-semibold text-primary">{idx + 1}.</span>
                              <span className="text-foreground">{item.itemText}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Multiple Choice Response */}
                      {response.responseType === "multiple_choice" && response.multipleChoice && response.multipleChoice.length > 0 && (
                        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                          <span className="text-sm font-medium text-primary">Selected:</span>
                          <span className="text-sm font-semibold">{response.multipleChoice[0].optionSelected}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No responses recorded yet
              </CardContent>
            </Card>
          )}

          {/* Belief Response */}
          {respondentData?.beliefResponse && (
            <Card>
              <CardHeader>
                <CardTitle>Belief System</CardTitle>
                <CardDescription>Questions 22-23: Spiritual and philosophical beliefs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-2 text-primary">Believes in God/Superior Being:</p>
                  <p className="text-base">
                    {respondentData.beliefResponse.believesInGod ? "Yes" : "No"}
                  </p>
                </div>
                {respondentData.beliefResponse.whyText && (
                  <div>
                    <p className="text-sm font-semibold mb-2 text-primary">Why:</p>
                    <p className="text-sm whitespace-pre-wrap">{respondentData.beliefResponse.whyText}</p>
                  </div>
                )}
                {respondentData.beliefResponse.advantagesText && (
                  <div>
                    <p className="text-sm font-semibold mb-2 text-primary">Advantages:</p>
                    <p className="text-sm whitespace-pre-wrap">{respondentData.beliefResponse.advantagesText}</p>
                  </div>
                )}
                {respondentData.beliefResponse.disadvantagesText && (
                  <div>
                    <p className="text-sm font-semibold mb-2 text-primary">Disadvantages:</p>
                    <p className="text-sm whitespace-pre-wrap">{respondentData.beliefResponse.disadvantagesText}</p>
                  </div>
                )}
                {respondentData.beliefResponse.evidenceText && (
                  <div>
                    <p className="text-sm font-semibold mb-2 text-primary">Evidence:</p>
                    <p className="text-sm whitespace-pre-wrap">{respondentData.beliefResponse.evidenceText}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Success Factors */}
          {respondentData?.successFactors && (
            <Card>
              <CardHeader>
                <CardTitle>Success Attribution</CardTitle>
                <CardDescription>Question 30: Percentage breakdown of success factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Personal Influence:</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${respondentData.successFactors.personalInfluencePct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{respondentData.successFactors.personalInfluencePct}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Influence of Others:</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent" 
                          style={{ width: `${respondentData.successFactors.othersInfluencePct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{respondentData.successFactors.othersInfluencePct}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Economic/Social:</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary" 
                          style={{ width: `${respondentData.successFactors.economicSocialPct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{respondentData.successFactors.economicSocialPct}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uncontrollable:</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-muted-foreground" 
                          style={{ width: `${respondentData.successFactors.uncontrollablePct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{respondentData.successFactors.uncontrollablePct}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
