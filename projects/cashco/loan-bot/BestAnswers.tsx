import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, Trophy, Medal, Star, Download, FileText, Share2 } from "lucide-react";
import { toast } from "sonner";

const QUESTIONS = [
  "What's the toughest conversation you've ever had with a client, and how did you handle it?",
  "What's your secret for building trust with someone who's been burned by financial institutions before?",
  "If you could give a new team member one piece of advice about their first interaction with a client, what would it be?",
  "How do you handle the conversation when you have to tell someone they're not approved?",
  "What community resources do you find yourself recommending most often to clients?",
  "Can you share a story about a client win that still makes you smile?",
  "What's your 'secret weapon' - that one thing you do that you think makes the biggest difference?",
  "If we built a bot to help clients between visits, what would you want it to be able to do?",
  "What do you wish more people understood about the clients we serve?",
  "Is there a particular story or moment that captures why this work matters to you?",
];

export default function BestAnswers() {
  const { data: summary, isLoading } = trpc.bestAnswers.getSummary.useQuery();
  const { data: judgingStats } = trpc.judging.getStats.useQuery();

  const handleExportMarkdown = () => {
    if (!summary) return;
    
    let markdown = `# Maven Cashco Guardian Wisdom Giant Library\n## Best Answers Summary Report\n\n`;
    markdown += `*Generated: ${new Date().toLocaleDateString()}*\n\n`;
    markdown += `---\n\n`;
    
    summary.forEach((q, index) => {
      markdown += `## Question ${index + 1}\n\n`;
      markdown += `**${QUESTIONS[index]}**\n\n`;
      
      if (q.bestAnswer) {
        markdown += `### 🏆 Best Answer (${q.bestAnswer.averageGrade.toFixed(1)}/10 from ${q.bestAnswer.gradeCount} judges)\n\n`;
        markdown += `**${q.bestAnswer.respondentName}**${q.bestAnswer.respondentTitle ? ` - ${q.bestAnswer.respondentTitle}` : ''}\n\n`;
        markdown += `> ${q.bestAnswer.answerText}\n\n`;
      } else {
        markdown += `*No graded answers yet for this question.*\n\n`;
      }
      
      if (q.runnerUp) {
        markdown += `### 🥈 Runner-Up (${q.runnerUp.averageGrade.toFixed(1)}/10 from ${q.runnerUp.gradeCount} judges)\n\n`;
        markdown += `**${q.runnerUp.respondentName}**\n\n`;
        markdown += `> ${q.runnerUp.answerText}\n\n`;
      }
      
      markdown += `---\n\n`;
    });
    
    markdown += `\n## About This Report\n\n`;
    markdown += `This report compiles the highest-rated answers from frontline staff who participated in the Maven Cashco Guardian Wisdom Collection project. `;
    markdown += `These insights will help inform the Guardian bot's empathetic responses and relationship-building behaviors.\n\n`;
    markdown += `**Total Judges:** ${judgingStats?.totalJudges || 0}\n`;
    markdown += `**Total Grades Given:** ${judgingStats?.totalGrades || 0}\n`;
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `best-answers-summary-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Report exported as Markdown!");
  };

  const handleExportJSON = () => {
    if (!summary) return;
    
    const exportData = {
      exportedAt: new Date().toISOString(),
      title: "Maven Cashco Guardian Best Answers Summary",
      totalJudges: judgingStats?.totalJudges || 0,
      totalGrades: judgingStats?.totalGrades || 0,
      questions: summary.map((q, index) => ({
        questionNumber: index + 1,
        questionText: QUESTIONS[index],
        bestAnswer: q.bestAnswer ? {
          respondentName: q.bestAnswer.respondentName,
          respondentTitle: q.bestAnswer.respondentTitle,
          answerText: q.bestAnswer.answerText,
          averageGrade: q.bestAnswer.averageGrade,
          gradeCount: q.bestAnswer.gradeCount,
        } : null,
        runnerUp: q.runnerUp ? {
          respondentName: q.runnerUp.respondentName,
          answerText: q.runnerUp.answerText,
          averageGrade: q.runnerUp.averageGrade,
          gradeCount: q.runnerUp.gradeCount,
        } : null,
      })),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `best-answers-summary-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Report exported as JSON!");
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Maven Cashco Guardian - Best Answers Summary',
          text: 'Check out the top-rated frontline wisdom from the Maven Cashco Guardian project!',
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const answeredQuestions = summary?.filter(q => q.bestAnswer !== null).length || 0;
  const totalQuestions = 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-amber-200" />
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-amber-600" />
                <h1 className="text-xl font-bold text-amber-900">Best Answers Summary</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportMarkdown} className="gap-2">
                <FileText className="h-4 w-4" />
                Export MD
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportJSON} className="gap-2">
                <Download className="h-4 w-4" />
                Export JSON
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Summary Stats */}
        <Card className="mb-8 bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300">
          <CardContent className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-900">{answeredQuestions}/{totalQuestions}</div>
                <div className="text-sm text-amber-700">Questions with Graded Answers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-900">{judgingStats?.totalJudges || 0}</div>
                <div className="text-sm text-amber-700">Active Judges</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-900">{judgingStats?.totalGrades || 0}</div>
                <div className="text-sm text-amber-700">Total Grades Given</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-900">
                  {summary?.filter(q => q.bestAnswer && q.bestAnswer.averageGrade >= 8).length || 0}
                </div>
                <div className="text-sm text-amber-700">Excellent Answers (8+)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              About This Report
            </CardTitle>
            <CardDescription>
              This page automatically compiles the highest-graded answer for each of our 10 survey questions. 
              These top answers represent the collective wisdom of our frontline staff and will help inform 
              the Guardian bot's empathetic responses. The more judges participate, the more refined these 
              selections become.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Best Answers by Question */}
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            summary?.map((q, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-amber-100 text-amber-800 border-amber-300">
                        Question {index + 1}
                      </Badge>
                      <CardTitle className="text-lg text-amber-900">{QUESTIONS[index]}</CardTitle>
                    </div>
                    {q.bestAnswer && (
                      <Badge className="bg-amber-500 text-white">
                        {q.bestAnswer.gradeCount} judge{q.bestAnswer.gradeCount !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {q.bestAnswer ? (
                    <div className="space-y-4">
                      {/* Best Answer */}
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span className="font-semibold text-amber-900">Best Answer</span>
                          <Badge className="bg-amber-500 text-white ml-auto">
                            {q.bestAnswer.averageGrade.toFixed(1)}/10
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-amber-800">{q.bestAnswer.respondentName}</span>
                          {q.bestAnswer.respondentTitle && (
                            <span className="text-amber-600 text-sm"> - {q.bestAnswer.respondentTitle}</span>
                          )}
                        </div>
                        <blockquote className="text-gray-700 italic border-l-4 border-amber-400 pl-4">
                          "{q.bestAnswer.answerText}"
                        </blockquote>
                      </div>

                      {/* Runner-Up */}
                      {q.runnerUp && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Medal className="h-5 w-5 text-gray-500" />
                            <span className="font-semibold text-gray-700">Runner-Up</span>
                            <Badge variant="secondary" className="ml-auto">
                              {q.runnerUp.averageGrade.toFixed(1)}/10
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <span className="font-medium text-gray-700">{q.runnerUp.respondentName}</span>
                          </div>
                          <blockquote className="text-gray-600 italic border-l-4 border-gray-300 pl-4 text-sm">
                            "{q.runnerUp.answerText}"
                          </blockquote>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium">No graded answers yet</p>
                      <p className="text-sm">Be the first to judge answers for this question!</p>
                      <Link href="/judging">
                        <Button variant="outline" size="sm" className="mt-4">
                          Go to Judging
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Help Shape the Guardian's Wisdom</h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Your judgment matters! By grading answers, you help identify the most valuable insights 
              that will inform how the Guardian bot connects with clients.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/judging">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Star className="h-5 w-5" />
                  Start Judging
                </Button>
              </Link>
              <Link href="/submit">
                <Button variant="outline" size="lg" className="gap-2 bg-transparent border-white text-white hover:bg-white/10">
                  <FileText className="h-5 w-5" />
                  Share Your Story
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
