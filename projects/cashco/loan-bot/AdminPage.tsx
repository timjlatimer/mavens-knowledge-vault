import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Loader2, Shield, AlertCircle, Inbox, CheckCircle, XCircle, Eye, Clock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { KPIDashboardBar } from "@/components/KPIDashboardBar";

const SURVEY_QUESTIONS = [
  { num: 1, text: "The Unforgettable Client Story: Think about a client you'll never forget. What made that relationship so special or memorable? Can you share a brief story?" },
  { num: 2, text: "The Toughest Conversation: When a client calls in distress because they can't make a payment, what are the first words you say, and what is your primary goal in that conversation (beyond collecting the payment)?" },
  { num: 3, text: "Beyond the Loan: What are the most common topics you talk about with clients that have nothing to do with their loan or finances? (e.g., family, hobbies, work, their community)." },
  { num: 4, text: "Celebrating the Wins: How do you celebrate a client's success, whether it's paying off their loan or just making a few on-time payments in a row? What does that sound like?" },
  { num: 5, text: "Your Secret Weapon: What is one small, simple thing you do that seems to have the biggest positive impact on how a client feels? (e.g., remembering a pet's name, asking about a recent trip)." },
  { num: 6, text: "The First Five Minutes: When you talk to a new client for the first time, what is the most important thing you do to build a connection and earn their trust right away?" },
  { num: 7, text: 'The "Not Yet" Moment: If you have to tell someone they aren\'t approved for a loan, how do you handle that conversation to ensure they still feel respected and hopeful, not rejected?' },
  { num: 8, text: "The Community Connector: Have you ever suggested a non-financial resource to a client (e.g., a community event, a local charity, a job fair)? What was the situation?" },
  { num: 9, text: "The Power of Remembering: What are 2-3 types of personal details you try to remember about your long-term clients? How do you use that information to strengthen the relationship?" },
  { num: 10, text: "If You Had a Superpower...: Imagine you had a perfect digital assistant (our Maven + Cashco Guardian!) that could help you care for your clients. What are three things you would have it do for them every day or every week to make their lives better?" },
];

export default function AdminPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  // Respondent form state
  const [respondentName, setRespondentName] = useState("");
  const [respondentTitle, setRespondentTitle] = useState("");
  const [respondentOrg, setRespondentOrg] = useState("");
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});

  // Insight form state
  const [selectedRespondentId, setSelectedRespondentId] = useState<string>("");
  const [themeName, setThemeName] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [insightTitle, setInsightTitle] = useState("");
  const [insightDescription, setInsightDescription] = useState("");
  const [guardianBehavior, setGuardianBehavior] = useState("");
  const [scriptIdea, setScriptIdea] = useState("");

  const { data: respondents } = trpc.respondents.list.useQuery();
  const { data: themes } = trpc.themes.list.useQuery();

  const createRespondent = trpc.respondents.create.useMutation({
    onSuccess: () => {
      toast.success("Respondent added successfully!");
      setRespondentName("");
      setRespondentTitle("");
      setRespondentOrg("");
      setSurveyAnswers({});
      utils.respondents.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add respondent");
    },
  });

  const createInsight = trpc.insights.createWithTheme.useMutation({
    onSuccess: () => {
      toast.success("Insight added successfully!");
      setInsightTitle("");
      setInsightDescription("");
      setGuardianBehavior("");
      setScriptIdea("");
      utils.insights.listGroupedByTheme.invalidate();
      utils.themes.list.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add insight");
    },
  });

  const handleAddRespondent = () => {
    const surveyResponses = Object.entries(surveyAnswers)
      .filter(([_, answer]) => answer.trim())
      .map(([num, answer]) => ({
        questionNumber: parseInt(num),
        questionText: SURVEY_QUESTIONS.find(q => q.num === parseInt(num))?.text || "",
        answerText: answer,
      }));

    createRespondent.mutate({
      name: respondentName,
      title: respondentTitle || undefined,
      organization: respondentOrg || undefined,
      surveyResponses,
    });
  };

  const handleAddInsight = () => {
    createInsight.mutate({
      themeName,
      themeDescription: themeDescription || undefined,
      respondentId: parseInt(selectedRespondentId),
      title: insightTitle,
      description: insightDescription,
      guardianBehavior: guardianBehavior || undefined,
      scriptIdea: scriptIdea || undefined,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-lg">Please sign in to access the admin panel.</p>
        <a href={getLoginUrl()}>
          <Button>Sign In</Button>
        </a>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-lg">You do not have admin access.</p>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

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
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              </div>
            </div>
            <Link href="/admin/reminders">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Email Reminders
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* KPI Dashboard Bar */}
      <KPIDashboardBar />

      <main className="container py-8">
        <Tabs defaultValue="respondent" className="max-w-4xl">
          <TabsList className="mb-6">
            <TabsTrigger value="submissions">Review Submissions</TabsTrigger>
            <TabsTrigger value="respondent">Add Respondent</TabsTrigger>
            <TabsTrigger value="insight">Add Insight</TabsTrigger>
          </TabsList>

          {/* Add Respondent Tab */}
          <TabsContent value="respondent">
            <Card>
              <CardHeader>
                <CardTitle>Add New Frontline Expert</CardTitle>
                <CardDescription>
                  Add a new respondent and their survey answers. All 10 questions are optional.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={respondentName}
                      onChange={(e) => setRespondentName(e.target.value)}
                      placeholder="e.g., Michelle Craig"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={respondentTitle}
                      onChange={(e) => setRespondentTitle(e.target.value)}
                      placeholder="e.g., Branch Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org">Organization</Label>
                    <Input
                      id="org"
                      value={respondentOrg}
                      onChange={(e) => setRespondentOrg(e.target.value)}
                      placeholder="e.g., Venue Financial"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Survey Responses</h3>
                  <div className="space-y-6">
                    {SURVEY_QUESTIONS.map((q) => (
                      <div key={q.num} className="space-y-2">
                        <Label htmlFor={`q${q.num}`} className="text-sm">
                          <span className="font-bold text-primary">Q{q.num}.</span> {q.text}
                        </Label>
                        <Textarea
                          id={`q${q.num}`}
                          value={surveyAnswers[q.num] || ""}
                          onChange={(e) => setSurveyAnswers({ ...surveyAnswers, [q.num]: e.target.value })}
                          placeholder="Enter their response..."
                          className="min-h-[100px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAddRespondent}
                  disabled={!respondentName.trim() || createRespondent.isPending}
                  className="w-full"
                >
                  {createRespondent.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Add Respondent
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Insight Tab */}
          <TabsContent value="insight">
            <Card>
              <CardHeader>
                <CardTitle>Add New Insight</CardTitle>
                <CardDescription>
                  Extract and add a new insight from a respondent's answers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Respondent *</Label>
                    <Select value={selectedRespondentId} onValueChange={setSelectedRespondentId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a respondent" />
                      </SelectTrigger>
                      <SelectContent>
                        {respondents?.map((r) => (
                          <SelectItem key={r.id} value={r.id.toString()}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="themeName">Theme Name *</Label>
                    <Input
                      id="themeName"
                      value={themeName}
                      onChange={(e) => setThemeName(e.target.value)}
                      placeholder='e.g., The "Rock Bottom" Partnership'
                      list="existing-themes"
                    />
                    <datalist id="existing-themes">
                      {themes?.map((t) => (
                        <option key={t.id} value={t.name} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="themeDesc">Theme Description (optional)</Label>
                  <Input
                    id="themeDesc"
                    value={themeDescription}
                    onChange={(e) => setThemeDescription(e.target.value)}
                    placeholder="Brief description of this theme..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insightTitle">Insight Title *</Label>
                  <Input
                    id="insightTitle"
                    value={insightTitle}
                    onChange={(e) => setInsightTitle(e.target.value)}
                    placeholder='e.g., The "Split Funding" Strategy'
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insightDesc">Insight Description *</Label>
                  <Textarea
                    id="insightDesc"
                    value={insightDescription}
                    onChange={(e) => setInsightDescription(e.target.value)}
                    placeholder="Describe the insight extracted from the respondent's answer..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianBehavior">Guardian Behavior (optional)</Label>
                  <Textarea
                    id="guardianBehavior"
                    value={guardianBehavior}
                    onChange={(e) => setGuardianBehavior(e.target.value)}
                    placeholder="How should the Guardian implement this insight?"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scriptIdea">Script Idea (optional)</Label>
                  <Textarea
                    id="scriptIdea"
                    value={scriptIdea}
                    onChange={(e) => setScriptIdea(e.target.value)}
                    placeholder="Example script or dialogue for the Guardian..."
                    className="min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleAddInsight}
                  disabled={
                    !selectedRespondentId ||
                    !themeName.trim() ||
                    !insightTitle.trim() ||
                    !insightDescription.trim() ||
                    createInsight.isPending
                  }
                  className="w-full"
                >
                  {createInsight.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Add Insight
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Review Submissions Tab */}
          <TabsContent value="submissions">
            <SubmissionsReview />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Submissions Review Component
function SubmissionsReview() {
  const utils = trpc.useUtils();
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const { data: stats } = trpc.submissions.stats.useQuery();
  const { data: submissions, isLoading } = trpc.submissions.pending.useQuery();
  const { data: submissionDetail } = trpc.submissions.getById.useQuery(
    { id: selectedSubmission! },
    { enabled: !!selectedSubmission }
  );

  const approveMutation = trpc.submissions.approve.useMutation({
    onSuccess: () => {
      toast.success("Submission approved!");
      setSelectedSubmission(null);
      setReviewNotes("");
      utils.submissions.pending.invalidate();
      utils.submissions.stats.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const rejectMutation = trpc.submissions.reject.useMutation({
    onSuccess: () => {
      toast.success("Submission rejected");
      setSelectedSubmission(null);
      setReviewNotes("");
      utils.submissions.pending.invalidate();
      utils.submissions.stats.invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const QUESTION_LABELS: Record<string, string> = {
    q1ToughestConversation: "The Toughest Conversation",
    q2BuildingTrust: "Building Trust",
    q3FirstInteraction: "First Interaction Magic",
    q4DenialConversation: "The 'Not Yet' Conversation",
    q5CommunityResources: "Community Connector",
    q6ClientWins: "Celebrating Wins",
    q7SecretWeapon: "Your Secret Weapon",
    q8IdealBotFeatures: "Dream Bot Features",
    q9AdditionalThoughts: "Additional Thoughts",
    q10MemorableStory: "Most Memorable Story",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Inbox className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.pending || 0}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.approved || 0}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.rejected || 0}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Submissions List */}
      {!selectedSubmission ? (
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>
              Review and approve frontline stories submitted by team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissions?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending submissions</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions?.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedSubmission(sub.id)}
                  >
                    <div>
                      <p className="font-medium">{sub.submitterName}</p>
                      <p className="text-sm text-muted-foreground">
                        {sub.submitterTitle && `${sub.submitterTitle} • `}
                        {sub.submitterOrganization || "No organization"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Submitted {new Date(sub.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Submission Detail View */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{submissionDetail?.submitterName}</CardTitle>
                <CardDescription>
                  {submissionDetail?.submitterTitle && `${submissionDetail.submitterTitle} • `}
                  {submissionDetail?.submitterOrganization || "No organization"}
                  {submissionDetail?.submitterEmail && ` • ${submissionDetail.submitterEmail}`}
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setSelectedSubmission(null)}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Survey Responses */}
            {Object.entries(QUESTION_LABELS).map(([key, label]) => {
              const answer = submissionDetail?.[key as keyof typeof submissionDetail];
              if (!answer || typeof answer !== 'string') return null;
              return (
                <div key={key} className="space-y-2">
                  <Label className="text-sm font-medium text-primary">{label}</Label>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg whitespace-pre-wrap">{answer}</p>
                </div>
              );
            })}

            {/* Review Actions */}
            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reviewNotes">Review Notes (optional)</Label>
                <Textarea
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add any notes about this submission..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => approveMutation.mutate({ id: selectedSubmission, reviewNotes: reviewNotes || undefined })}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                  className="flex-1"
                >
                  {approveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => rejectMutation.mutate({ id: selectedSubmission, reviewNotes: reviewNotes || undefined })}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                  className="flex-1"
                >
                  {rejectMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
