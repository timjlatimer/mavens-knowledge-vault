import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { 
  Star, 
  Award, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Trophy,
  BookOpen,
  Gavel
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function JudgingPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);
  
  const { data: eligibility, isLoading: eligibilityLoading } = trpc.judging.checkEligibility.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const { data: answersByQuestion, isLoading: answersLoading } = trpc.judging.getAnswersByQuestion.useQuery();
  const { data: judgingStats, isLoading: statsLoading } = trpc.judging.getStats.useQuery();
  
  const gradeMutation = trpc.judging.gradeAnswer.useMutation({
    onSuccess: () => {
      toast.success("Grade submitted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const isEligible = eligibility?.isEligible ?? false;

  const handleGrade = (surveyResponseId: number, grade: number) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to grade answers");
      return;
    }
    if (!isEligible) {
      toast.error("You must submit your own story first to become a judge");
      return;
    }
    gradeMutation.mutate({ surveyResponseId, grade });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Gavel className="h-8 w-8 text-amber-600" />
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Maven Cashco Guardian</h1>
                  <p className="text-xs text-slate-500">Wisdom Giant Library Collection & Judging Project</p>
                </div>
              </a>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/wisdom">
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Wisdom Library
                </Button>
              </Link>
              <Link href="/submit">
                <Button variant="outline" size="sm">
                  Share Your Story
                </Button>
              </Link>
              {isAuthenticated ? (
                <span className="text-sm text-slate-600">
                  <Users className="h-4 w-4 inline mr-1" />
                  {user?.name}
                </span>
              ) : (
                <a href={getLoginUrl()}>
                  <Button size="sm">Sign In to Judge</Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            <Trophy className="h-10 w-10 inline mr-3 text-amber-500" />
            Judging Competition
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Help us identify the best answers from our frontline experts. 
            Rate each answer on a scale of 1-10 based on how well it aligns with our mission 
            to <strong>end financial exclusion</strong> and provide <strong>relief today and hope for tomorrow</strong>.
          </p>
        </div>

        {/* Eligibility Banner */}
        {!authLoading && (
          <Card className={`mb-8 ${isAuthenticated && isEligible ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'}`}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isAuthenticated && isEligible ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">You are eligible to judge!</p>
                        <p className="text-sm text-green-600">Thank you for sharing your story. You can now rate all answers.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-6 w-6 text-amber-600" />
                      <div>
                        <p className="font-semibold text-amber-800">
                          {isAuthenticated ? "Submit your story to become a judge" : "Sign in and submit your story to judge"}
                        </p>
                        <p className="text-sm text-amber-600">
                          Only team members who have shared their own frontline wisdom can participate in judging.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {(!isAuthenticated || !isEligible) && (
                  <Link href="/submit">
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Share Your Story First
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Bar */}
        {!statsLoading && judgingStats && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="py-4 text-center">
                <p className="text-3xl font-bold text-slate-900">{judgingStats.totalJudges}</p>
                <p className="text-sm text-slate-500">Active Judges</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4 text-center">
                <p className="text-3xl font-bold text-slate-900">{judgingStats.totalGrades}</p>
                <p className="text-sm text-slate-500">Grades Submitted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4 text-center">
                <p className="text-3xl font-bold text-slate-900">{judgingStats.questionsGraded}</p>
                <p className="text-sm text-slate-500">Questions Graded</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4 text-center">
                <p className="text-3xl font-bold text-slate-900">{answersByQuestion?.length || 0}</p>
                <p className="text-sm text-slate-500">Total Questions</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Questions and Answers */}
        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            {answersLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-500">Loading questions...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {answersByQuestion?.map((question) => (
                  <Card key={question.questionNumber} className="overflow-hidden">
                    <CardHeader 
                      className="cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => setExpandedQuestion(
                        expandedQuestion === question.questionNumber ? null : question.questionNumber
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-sm">
                            Q{question.questionNumber}
                          </span>
                          <CardTitle className="text-lg">{question.questionText}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-500">
                            {question.answers.length} answers
                          </span>
                          {expandedQuestion === question.questionNumber ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {expandedQuestion === question.questionNumber && (
                      <CardContent className="border-t">
                        <div className="space-y-4 pt-4">
                          {question.answers.map((answer, idx) => (
                            <AnswerCard
                              key={answer.id}
                              answer={answer}
                              rank={idx + 1}
                              isEligible={isEligible}
                              isAuthenticated={isAuthenticated}
                              onGrade={(grade) => handleGrade(answer.id, grade)}
                            />
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Top Answers by Question
                </CardTitle>
                <CardDescription>
                  The highest-rated answer for each question based on judge scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {judgingStats?.topAnswers && judgingStats.topAnswers.length > 0 ? (
                  <div className="space-y-4">
                    {judgingStats.topAnswers.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-sm">
                            Q{item.questionNumber}
                          </span>
                          <div>
                            <p className="font-medium text-slate-900 line-clamp-1">
                              {item.questionText}
                            </p>
                            <p className="text-sm text-slate-500">
                              Best answer by: <strong>{item.respondentName}</strong>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                          <span className="font-bold text-lg">{item.averageGrade.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Award className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>No grades submitted yet. Be the first to judge!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Answer Card Component
function AnswerCard({ 
  answer, 
  rank, 
  isEligible, 
  isAuthenticated,
  onGrade 
}: { 
  answer: {
    id: number;
    respondentId: number;
    respondentName: string;
    answerText: string;
    averageGrade: number;
    gradeCount: number;
  };
  rank: number;
  isEligible: boolean;
  isAuthenticated: boolean;
  onGrade: (grade: number) => void;
}) {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  
  const { data: myGrade } = trpc.judging.getMyGrade.useQuery(
    { surveyResponseId: answer.id },
    { enabled: isAuthenticated }
  );

  const currentGrade = selectedGrade ?? myGrade?.grade ?? null;

  return (
    <div className={`p-4 rounded-lg border ${rank === 1 && answer.gradeCount > 0 ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {rank === 1 && answer.gradeCount > 0 && (
              <Trophy className="h-4 w-4 text-amber-500" />
            )}
            <Link href={`/respondent/${answer.respondentId}`}>
              <a className="font-semibold text-blue-600 hover:underline">
                {answer.respondentName}
              </a>
            </Link>
            {answer.gradeCount > 0 && (
              <span className="text-sm text-slate-500">
                ({answer.gradeCount} {answer.gradeCount === 1 ? 'grade' : 'grades'})
              </span>
            )}
          </div>
          <p className="text-slate-700 whitespace-pre-wrap">{answer.answerText}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2 min-w-[140px]">
          {/* Average Grade Display */}
          {answer.gradeCount > 0 && (
            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="font-bold">{answer.averageGrade.toFixed(1)}</span>
              <span className="text-slate-400">/10</span>
            </div>
          )}
          
          {/* Grade Input */}
          {isAuthenticated && isEligible && (
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-slate-500">Your grade:</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => {
                      setSelectedGrade(grade);
                      onGrade(grade);
                    }}
                    className={`w-6 h-6 text-xs rounded ${
                      currentGrade === grade 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {!isAuthenticated && (
            <p className="text-xs text-slate-400">Sign in to grade</p>
          )}
          
          {isAuthenticated && !isEligible && (
            <p className="text-xs text-amber-600">Submit story to grade</p>
          )}
        </div>
      </div>
    </div>
  );
}
