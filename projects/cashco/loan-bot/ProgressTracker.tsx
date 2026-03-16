import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  Circle, 
  FileText, 
  Star, 
  Trophy, 
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface ProgressTrackerProps {
  compact?: boolean;
}

export default function ProgressTracker({ compact = false }: ProgressTrackerProps) {
  const { user, loading: authLoading } = useAuth();
  const { data: progress, isLoading } = trpc.progress.getMyProgress.useQuery(undefined, {
    enabled: !!user,
  });

  if (authLoading || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className={compact ? "bg-amber-50/50" : ""}>
        <CardContent className="py-4">
          <div className="animate-pulse flex items-center gap-4">
            <div className="h-10 w-10 bg-amber-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-amber-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-amber-100 rounded w-1/2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!progress) {
    return null;
  }

  const questionProgress = (progress.questionsAnswered / 10) * 100;
  const judgingProgress = progress.totalAnswersToGrade > 0 
    ? (progress.gradesGiven / progress.totalAnswersToGrade) * 100 
    : 0;

  // Determine overall status
  let status: 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'judging' | 'complete';
  if (!progress.hasSubmitted) {
    status = 'not_started';
  } else if (progress.submissionStatus === 'pending') {
    status = 'submitted';
  } else if (progress.submissionStatus === 'approved') {
    if (progress.gradesGiven === 0) {
      status = 'approved';
    } else if (judgingProgress >= 100) {
      status = 'complete';
    } else {
      status = 'judging';
    }
  } else {
    status = 'in_progress';
  }

  const statusConfig = {
    not_started: {
      icon: Circle,
      color: 'text-gray-400',
      bg: 'bg-gray-100',
      label: 'Not Started',
      message: 'Share your frontline wisdom to get started!',
    },
    in_progress: {
      icon: Clock,
      color: 'text-amber-500',
      bg: 'bg-amber-100',
      label: 'In Progress',
      message: 'Continue your story submission',
    },
    submitted: {
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
      label: 'Awaiting Review',
      message: 'Your submission is being reviewed by the team',
    },
    approved: {
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-100',
      label: 'Approved!',
      message: 'You can now judge other answers',
    },
    judging: {
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-100',
      label: 'Judging',
      message: `${progress.gradesGiven} of ${progress.totalAnswersToGrade} answers graded`,
    },
    complete: {
      icon: Trophy,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      label: 'Champion!',
      message: 'You\'ve graded all available answers!',
    },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  if (compact) {
    return (
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${currentStatus.bg}`}>
                <StatusIcon className={`h-5 w-5 ${currentStatus.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-amber-900">Your Progress</span>
                  <Badge variant="outline" className={`${currentStatus.bg} ${currentStatus.color} border-0`}>
                    {currentStatus.label}
                  </Badge>
                </div>
                <p className="text-sm text-amber-700">{currentStatus.message}</p>
              </div>
            </div>
            {status === 'not_started' && (
              <Link href="/submit">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 gap-2">
                  Start <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {status === 'approved' && (
              <Link href="/judging">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 gap-2">
                  Start Judging <Star className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {status === 'judging' && (
              <Link href="/judging">
                <Button size="sm" variant="outline" className="gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${currentStatus.bg}`}>
              <StatusIcon className={`h-6 w-6 ${currentStatus.color}`} />
            </div>
            <div>
              <CardTitle className="text-amber-900">Your Journey</CardTitle>
              <CardDescription>{currentStatus.message}</CardDescription>
            </div>
          </div>
          <Badge className={`${currentStatus.bg} ${currentStatus.color} border-0 text-sm px-3 py-1`}>
            {currentStatus.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Story Submission Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-900">Story Submission</span>
            </div>
            <span className="text-sm text-amber-700">
              {progress.questionsAnswered}/10 questions
            </span>
          </div>
          <Progress value={questionProgress} className="h-2 bg-amber-100" />
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  i < progress.questionsAnswered
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-400'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          {!progress.hasSubmitted && (
            <Link href="/submit">
              <Button className="w-full mt-2 bg-amber-500 hover:bg-amber-600 gap-2">
                <FileText className="h-4 w-4" />
                {progress.questionsAnswered > 0 ? 'Continue Your Story' : 'Share Your Story'}
              </Button>
            </Link>
          )}
          {progress.hasSubmitted && progress.submissionStatus === 'pending' && (
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-sm text-blue-700">Your submission is being reviewed</p>
            </div>
          )}
        </div>

        {/* Judging Progress */}
        {progress.isEligibleJudge && (
          <div className="space-y-3 pt-4 border-t border-amber-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-amber-900">Judging Progress</span>
              </div>
              <span className="text-sm text-amber-700">
                {progress.gradesGiven}/{progress.totalAnswersToGrade} graded
              </span>
            </div>
            <Progress value={judgingProgress} className="h-2 bg-amber-100" />
            {judgingProgress >= 100 ? (
              <div className="bg-amber-100 rounded-lg p-3 text-center">
                <Sparkles className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                <p className="text-sm text-amber-700 font-medium">
                  Amazing! You've graded all available answers!
                </p>
              </div>
            ) : (
              <Link href="/judging">
                <Button variant="outline" className="w-full mt-2 gap-2 border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Star className="h-4 w-4" />
                  {progress.gradesGiven > 0 ? 'Continue Judging' : 'Start Judging'}
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Not eligible for judging yet */}
        {!progress.isEligibleJudge && progress.hasSubmitted && progress.submissionStatus === 'approved' && (
          <div className="pt-4 border-t border-amber-200">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Star className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Once your submission is approved, you'll be able to judge other answers!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
