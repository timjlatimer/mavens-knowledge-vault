import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { 
  BookOpen, ChevronRight, ArrowLeft, Heart, Shield, MessageCircle, 
  Users, Lightbulb, AlertTriangle, Sparkles, Compass, Target, Zap
} from "lucide-react";
import { Streamdown } from "streamdown";

const categoryIcons: Record<string, React.ReactNode> = {
  "north-star": <Compass className="h-8 w-8" />,
  "protocols": <Shield className="h-8 w-8" />,
  "scripts": <MessageCircle className="h-8 w-8" />,
  "anti-patterns": <AlertTriangle className="h-8 w-8" />,
  "superpowers": <Zap className="h-8 w-8" />,
  "personas": <Users className="h-8 w-8" />,
  "lifecycle": <Target className="h-8 w-8" />,
  "horsemen": <Shield className="h-8 w-8" />,
  "frontline-wisdom": <Heart className="h-8 w-8" />,
};

const sourceTypeColors: Record<string, string> = {
  "frontline": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  "philosophy": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "external": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "anti-pattern": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function WisdomCategory() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  
  const { data, isLoading, error } = trpc.wisdom.getCategoryBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Category Not Found</CardTitle>
            <CardDescription>
              The wisdom category you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/wisdom">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { category, entries } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container py-12">
          <Link href="/wisdom">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              {categoryIcons[category.slug] || <BookOpen className="h-8 w-8" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <p className="text-purple-100 mt-1">{entries.length} wisdom entries</p>
            </div>
          </div>
          
          {category.description && (
            <p className="text-lg text-purple-100 max-w-3xl mt-4">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="container py-8">
        {entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <Link key={entry.id} href={`/wisdom/entry/${entry.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:border-purple-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            #{index + 1}
                          </span>
                          <Badge className={`text-xs ${sourceTypeColors[entry.sourceType]}`}>
                            {entry.sourceType}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                          {entry.title}
                        </CardTitle>
                        {entry.subtitle && (
                          <CardDescription className="mt-1 text-base">
                            {entry.subtitle}
                          </CardDescription>
                        )}
                      </div>
                      <ChevronRight className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {entry.content.substring(0, 300)}...
                    </p>
                    
                    {entry.scriptExample && (
                      <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                          Script Example:
                        </div>
                        <p className="text-sm text-emerald-800 dark:text-emerald-200 italic line-clamp-2">
                          "{entry.scriptExample.substring(0, 150)}..."
                        </p>
                      </div>
                    )}
                    
                    {entry.source && (
                      <div className="text-xs text-muted-foreground mt-3">
                        Source: {entry.source}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No entries yet</h3>
            <p className="text-muted-foreground">
              This category is being populated with wisdom entries.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
