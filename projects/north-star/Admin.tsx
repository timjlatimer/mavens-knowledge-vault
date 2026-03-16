import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Loader2, Users, Tag, TrendingUp, Download, Search, Eye, Compass } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const COLORS = ["#7c3aed", "#06b6d4", "#f97316", "#10b981", "#ec4899"];

export default function Admin() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== "admin")) {
      window.location.href = "/";
    }
  }, [authLoading, isAuthenticated, user]);

  const { data: respondents, isLoading: loadingRespondents } = trpc.admin.getAllRespondents.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin"
  });

  const { data: tagFrequency, isLoading: loadingTags } = trpc.admin.getTagFrequency.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin"
  });

  const { data: successAverages, isLoading: loadingSuccess } = trpc.admin.getSuccessFactorAverages.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin"
  });

  const { data: beliefDist, isLoading: loadingBelief } = trpc.admin.getBeliefDistribution.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin"
  });

  const { data: commonValues, isLoading: loadingValues } = trpc.admin.getCommonValues.useQuery({ limit: 20 }, {
    enabled: isAuthenticated && user?.role === "admin"
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  // Filter respondents by search query
  const filteredRespondents = respondents?.filter(r => 
    r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const totalRespondents = respondents?.length || 0;
  const completeRespondents = respondents?.filter(r => r.isComplete).length || 0;
  const completionRate = totalRespondents > 0 ? (completeRespondents / totalRespondents) * 100 : 0;

  // Prepare chart data
  const topTags = tagFrequency?.slice(0, 10) || [];
  const tagChartData = topTags.map(t => ({
    name: t.tagName,
    count: Number(t.count)
  }));

  const successChartData = successAverages ? [
    { name: "Personal", value: Number(successAverages.avgPersonal) },
    { name: "Others", value: Number(successAverages.avgOthers) },
    { name: "Economic/Social", value: Number(successAverages.avgEconomic) },
    { name: "Uncontrollable", value: Number(successAverages.avgUncontrollable) }
  ] : [];

  const beliefChartData = beliefDist ? [
    { name: "Believes in God", value: beliefDist.believers },
    { name: "Does Not Believe", value: beliefDist.nonBelievers }
  ] : [];

  return (
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
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">North Star Insights & Analytics</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard">My Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Respondents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRespondents}</div>
              <p className="text-xs text-muted-foreground">
                {completeRespondents} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {completeRespondents} of {totalRespondents}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tags</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tagFrequency?.filter(t => Number(t.count) > 0).length || 0}</div>
              <p className="text-xs text-muted-foreground">
                of 34 predefined tags
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="space-y-8 mb-8">
          <h2 className="text-2xl font-bold">Analytics</h2>

          {/* Tag Frequency */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Tags by Frequency</CardTitle>
              <CardDescription>Most commonly applied tags across all responses</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingTags ? (
                <div className="h-64 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : tagChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tagChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-muted-foreground py-8">No tag data available yet</p>
              )}
            </CardContent>
          </Card>

          {/* Success Factors & Belief Distribution */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Success Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Success Attribution (Average)</CardTitle>
                <CardDescription>How respondents attribute success factors</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSuccess ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : successChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={successChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {successChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No success factor data available yet</p>
                )}
              </CardContent>
            </Card>

            {/* Belief Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Belief Distribution</CardTitle>
                <CardDescription>Respondents' belief in God/Superior Being</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingBelief ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : beliefChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={beliefChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {beliefChartData.map((entry: { name: string; value: number }, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No belief data available yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Common Values */}
          <Card>
            <CardHeader>
              <CardTitle>Most Common Values (Question 20)</CardTitle>
              <CardDescription>Top absolutes that govern thoughts and actions</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingValues ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : commonValues && commonValues.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {commonValues.map((value, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">{value.itemText}</span>
                      <Badge variant="secondary">{value.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No value data available yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Respondents List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Respondents</h2>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Respondents Table */}
          <Card>
            <CardContent className="p-0">
              {loadingRespondents ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredRespondents.length > 0 ? (
                <div className="divide-y">
                  {filteredRespondents.map((respondent) => (
                    <div key={respondent.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{respondent.fullName}</h3>
                            {respondent.isComplete ? (
                              <Badge variant="default" className="bg-green-600">Complete</Badge>
                            ) : (
                              <Badge variant="secondary">In Progress</Badge>
                            )}
                          </div>
                          <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                            {respondent.email && <span>{respondent.email}</span>}
                            {respondent.jobTitle && <span>• {respondent.jobTitle}</span>}
                            {respondent.organization && <span>• {respondent.organization}</span>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted: {new Date(respondent.dateSubmitted).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/respondent/${respondent.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  {searchQuery ? "No respondents match your search" : "No respondents yet"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
