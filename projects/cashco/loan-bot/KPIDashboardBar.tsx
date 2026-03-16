import { trpc } from "@/lib/trpc";
import { TrendingUp, Users, MessageSquare, ThumbsUp, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export function KPIDashboardBar() {
  const { data: stats } = trpc.kpi.getStats.useQuery(undefined, {
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (!stats) return null;

  const topTheme = stats.topThemes[0];

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
      <div className="container py-2">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6 overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <ThumbsUp className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">{stats.totalVotes}</span>
              <span className="text-muted-foreground">Votes</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Users className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">{stats.totalParticipants}</span>
              <span className="text-muted-foreground">Participants</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">{stats.totalComments}</span>
              <span className="text-muted-foreground">Comments</span>
            </div>
            {topTheme && (
              <div className="flex items-center gap-2 whitespace-nowrap">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Leading:</span>
                <span className="font-medium text-foreground">{topTheme.themeName}</span>
              </div>
            )}
          </div>
          <Link href="/dashboard">
            <button className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium whitespace-nowrap">
              <BarChart3 className="h-4 w-4" />
              Full Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
