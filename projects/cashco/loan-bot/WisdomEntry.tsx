import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { 
  ArrowLeft, BookOpen, MessageCircle, AlertTriangle, 
  User, Calendar, Tag, Copy, Check
} from "lucide-react";
import { Streamdown } from "streamdown";
import { useState } from "react";

const sourceTypeColors: Record<string, string> = {
  "frontline": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  "philosophy": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "external": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "anti-pattern": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const sourceTypeLabels: Record<string, string> = {
  "frontline": "Frontline Wisdom",
  "philosophy": "Core Philosophy",
  "external": "External Source",
  "anti-pattern": "Anti-Pattern",
};

export default function WisdomEntry() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [copiedScript, setCopiedScript] = useState(false);
  
  const { data: entry, isLoading, error } = trpc.wisdom.getEntryBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  const copyScript = () => {
    if (entry?.scriptExample) {
      navigator.clipboard.writeText(entry.scriptExample);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading entry...</p>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Entry Not Found</CardTitle>
            <CardDescription>
              The wisdom entry you're looking for doesn't exist.
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

  const tags = entry.tags ? entry.tags.split(',').map(t => t.trim()) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container py-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Link href="/wisdom">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Library
              </Button>
            </Link>
            <span className="text-white/50 flex items-center">/</span>
            <Link href={`/wisdom/${entry.categorySlug}`}>
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                {entry.categoryName}
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge className={`${sourceTypeColors[entry.sourceType]}`}>
              {sourceTypeLabels[entry.sourceType]}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
          {entry.subtitle && (
            <p className="text-xl text-purple-100">{entry.subtitle}</p>
          )}
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <Streamdown>{entry.content}</Streamdown>
              </CardContent>
            </Card>

            {/* Script Example */}
            {entry.scriptExample && (
              <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <MessageCircle className="h-5 w-5" />
                      Guardian Script Example
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyScript}
                      className="text-emerald-700 dark:text-emerald-300"
                    >
                      {copiedScript ? (
                        <><Check className="h-4 w-4 mr-1" /> Copied</>
                      ) : (
                        <><Copy className="h-4 w-4 mr-1" /> Copy</>
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    A suggested script the Guardian can use in this situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-emerald-400 pl-4 py-2 italic text-emerald-800 dark:text-emerald-200 bg-white/50 dark:bg-black/20 rounded-r-lg">
                    "{entry.scriptExample}"
                  </blockquote>
                </CardContent>
              </Card>
            )}

            {/* Anti-Pattern */}
            {entry.antiPattern && (
              <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertTriangle className="h-5 w-5" />
                    What NOT to Do (Anti-Pattern)
                  </CardTitle>
                  <CardDescription>
                    Behaviors or approaches to avoid
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-red-800 dark:text-red-200">
                    <Streamdown>{entry.antiPattern}</Streamdown>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Entry Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {entry.source && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Source</div>
                      <div className="text-sm text-muted-foreground">{entry.source}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Added</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium mb-2">Tags</div>
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Navigate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/wisdom/${entry.categorySlug}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    More in {entry.categoryName}
                  </Button>
                </Link>
                <Link href="/wisdom">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Library
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start">
                    Insights Hub
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
