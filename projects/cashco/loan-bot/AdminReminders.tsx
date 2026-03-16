import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  Mail, 
  Clock, 
  AlertCircle, 
  Send,
  Users,
  FileText,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminReminders() {
  const { user, loading: authLoading } = useAuth();
  const { data: incompleteSubmissions, isLoading: loadingIncomplete } = trpc.reminders.getIncomplete.useQuery();
  const { data: nonSubmitters, isLoading: loadingNonSubmitters } = trpc.reminders.getNonSubmitters.useQuery();
  
  const sendReminderMutation = trpc.reminders.sendReminder.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Check if user is admin
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">This page is only accessible to administrators.</p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendReminder = (userId: number, type: 'incomplete' | 'not_started') => {
    sendReminderMutation.mutate({ userId, reminderType: type });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
            <div className="h-6 w-px bg-amber-200" />
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-amber-600" />
              <h1 className="text-xl font-bold text-amber-900">Email Reminders</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-6 text-center">
              <FileText className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-900">
                {incompleteSubmissions?.length || 0}
              </div>
              <div className="text-sm text-amber-700">Incomplete Submissions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {nonSubmitters?.length || 0}
              </div>
              <div className="text-sm text-blue-700">Users Who Haven't Submitted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">
                {(incompleteSubmissions?.length || 0) + (nonSubmitters?.length || 0) === 0 ? '✓' : 'Pending'}
              </div>
              <div className="text-sm text-green-700">
                {(incompleteSubmissions?.length || 0) + (nonSubmitters?.length || 0) === 0 
                  ? 'All caught up!' 
                  : 'Reminders needed'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incomplete Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Incomplete Submissions
            </CardTitle>
            <CardDescription>
              Users who started a submission but haven't completed all 10 questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingIncomplete ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : incompleteSubmissions && incompleteSubmissions.length > 0 ? (
              <div className="space-y-3">
                {incompleteSubmissions.map((submission) => (
                  <div 
                    key={submission.id}
                    className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="font-medium text-amber-900">{submission.userName}</div>
                        <div className="text-sm text-amber-700">
                          {submission.userEmail || 'No email provided'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                          {submission.questionsAnswered}/10 questions
                        </Badge>
                        <div className="text-xs text-amber-600 mt-1">
                          Started {submission.daysSinceCreated} day{submission.daysSinceCreated !== 1 ? 's' : ''} ago
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleSendReminder(submission.userId, 'incomplete')}
                        disabled={sendReminderMutation.isPending}
                        className="gap-2 bg-amber-500 hover:bg-amber-600"
                      >
                        <Send className="h-4 w-4" />
                        Remind
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-400" />
                <p className="font-medium">No incomplete submissions</p>
                <p className="text-sm">All users who started have completed their submissions!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Non-Submitters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Users Who Haven't Submitted
            </CardTitle>
            <CardDescription>
              Users who signed in but haven't started a submission yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingNonSubmitters ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : nonSubmitters && nonSubmitters.length > 0 ? (
              <div className="space-y-3">
                {nonSubmitters.map((user) => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">{user.name || 'Anonymous User'}</div>
                        <div className="text-sm text-blue-700">
                          {user.email || 'No email provided'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                          Not started
                        </Badge>
                        <div className="text-xs text-blue-600 mt-1">
                          Last signed in {user.daysSinceSignIn} day{user.daysSinceSignIn !== 1 ? 's' : ''} ago
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSendReminder(user.id, 'not_started')}
                        disabled={sendReminderMutation.isPending}
                        className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <Send className="h-4 w-4" />
                        Invite
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-400" />
                <p className="font-medium">All users have submitted!</p>
                <p className="text-sm">Everyone who signed in has started their story.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">About Email Reminders</h4>
                <p className="text-sm text-gray-600">
                  Currently, reminder actions are logged and the project owner is notified. 
                  In a production environment, this would send actual emails to users encouraging 
                  them to complete their submissions or participate in the judging process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
