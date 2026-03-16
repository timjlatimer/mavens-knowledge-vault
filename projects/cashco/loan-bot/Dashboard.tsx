import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIDashboardBar } from "@/components/KPIDashboardBar";
import { 
  ThumbsUp, ThumbsDown, Users, MessageSquare, Lightbulb, 
  Layers, TrendingUp, Award, ArrowLeft, User, Shield,
  BarChart3, PieChart
} from "lucide-react";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  
  const { data: stats, isLoading: statsLoading } = trpc.kpi.getStats.useQuery(undefined, {
    refetchInterval: 30000,
  });
  
  const { data: themePerformance } = trpc.kpi.getThemePerformance.useQuery();
  const { data: votingTrends } = trpc.kpi.getVotingTrends.useQuery();

  if (statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const themeChartData = themePerformance?.map(t => ({
    name: t.themeName.length > 20 ? t.themeName.substring(0, 20) + '...' : t.themeName,
    fullName: t.themeName,
    netScore: Number(t.netScore) || 0,
    upvotes: Number(t.totalUpvotes) || 0,
    downvotes: Number(t.totalDownvotes) || 0,
    insights: Number(t.insightCount) || 0,
  })) || [];

  const pieData = themePerformance?.map((t, i) => ({
    name: t.themeName,
    value: Number(t.insightCount) || 0,
    color: COLORS[i % COLORS.length],
  })).filter(d => d.value > 0) || [];

  const trendData = votingTrends?.map(t => ({
    date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    upvotes: Number(t.upvotes) || 0,
    downvotes: Number(t.downvotes) || 0,
    total: Number(t.totalVotes) || 0,
  })) || [];

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
                <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Maven Cashco Guardian Insights Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
                  <Button variant="default" size="sm">Sign in to add to the wisdom</Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* KPI Bar */}
      <KPIDashboardBar />

      <main className="container py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats?.totalInsights || 0}</p>
                  <p className="text-xs text-muted-foreground">Insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <ThumbsUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats?.totalVotes || 0}</p>
                  <p className="text-xs text-muted-foreground">Total Votes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats?.totalParticipants || 0}</p>
                  <p className="text-xs text-muted-foreground">Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats?.totalComments || 0}</p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Award className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats?.totalRespondents || 0}</p>
                  <p className="text-xs text-muted-foreground">Contributors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg">
                  <Layers className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats?.totalThemes || 0}</p>
                  <p className="text-xs text-muted-foreground">Themes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Theme Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Theme Performance
              </CardTitle>
              <CardDescription>Net score by theme (upvotes - downvotes)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={themeChartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-card border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold">{data.fullName}</p>
                              <p className="text-sm text-success">Upvotes: {data.upvotes}</p>
                              <p className="text-sm text-destructive">Downvotes: {data.downvotes}</p>
                              <p className="text-sm font-medium">Net Score: {data.netScore}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="netScore" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Insights Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Insights Distribution
              </CardTitle>
              <CardDescription>Number of insights per theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, value }) => `${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      layout="vertical" 
                      align="right" 
                      verticalAlign="middle"
                      formatter={(value) => <span className="text-xs">{value.length > 25 ? value.substring(0, 25) + '...' : value}</span>}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voting Trends */}
        {trendData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Voting Activity Over Time
              </CardTitle>
              <CardDescription>Daily voting trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="upvotes" stroke="#10b981" strokeWidth={2} name="Upvotes" />
                    <Line type="monotone" dataKey="downvotes" stroke="#ef4444" strokeWidth={2} name="Downvotes" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top 10 Insights
              </CardTitle>
              <CardDescription>Highest rated insights by net score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.topInsights.map((insight, index) => (
                  <div key={insight.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{insight.title}</p>
                      <p className="text-xs text-muted-foreground">{insight.respondentName} • {insight.themeName}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-success flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {insight.upvotes}
                      </span>
                      <span className="text-destructive flex items-center gap-1">
                        <ThumbsDown className="h-3 w-3" />
                        {insight.downvotes}
                      </span>
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        Number(insight.netScore) > 0 ? 'bg-success/10 text-success' : 
                        Number(insight.netScore) < 0 ? 'bg-destructive/10 text-destructive' : 
                        'bg-muted'
                      }`}>
                        {Number(insight.netScore) > 0 ? '+' : ''}{insight.netScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contributor Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contributor Leaderboard
              </CardTitle>
              <CardDescription>Frontline experts ranked by total insight score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.contributorLeaderboard?.map((contributor, index) => (
                  <Link key={contributor.respondentId} href={`/respondent/${contributor.respondentId}`}>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{contributor.respondentName}</p>
                        <p className="text-xs text-muted-foreground">{contributor.insightCount} insights</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-success flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {contributor.totalUpvotes || 0}
                        </span>
                        <span className="text-destructive flex items-center gap-1">
                          <ThumbsDown className="h-3 w-3" />
                          {contributor.totalDownvotes || 0}
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          Number(contributor.netScore) > 0 ? 'bg-success/10 text-success' : 
                          Number(contributor.netScore) < 0 ? 'bg-destructive/10 text-destructive' : 
                          'bg-muted'
                        }`}>
                          {Number(contributor.netScore) > 0 ? '+' : ''}{contributor.netScore || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
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
