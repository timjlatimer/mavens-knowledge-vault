import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { 
  BookOpen, Search, Heart, Shield, MessageCircle, Users, 
  Lightbulb, AlertTriangle, Sparkles, ChevronRight, Library,
  Brain, Compass, Target, Zap, Star
} from "lucide-react";
import { useState, useMemo } from "react";
import { Streamdown } from "streamdown";

const categoryIcons: Record<string, React.ReactNode> = {
  "north-star": <Compass className="h-6 w-6" />,
  "protocols": <Shield className="h-6 w-6" />,
  "scripts": <MessageCircle className="h-6 w-6" />,
  "anti-patterns": <AlertTriangle className="h-6 w-6" />,
  "superpowers": <Zap className="h-6 w-6" />,
  "personas": <Users className="h-6 w-6" />,
  "lifecycle": <Target className="h-6 w-6" />,
  "horsemen": <Shield className="h-6 w-6" />,
  "frontline-wisdom": <Heart className="h-6 w-6" />,
};

const sourceTypeColors: Record<string, string> = {
  "frontline": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  "philosophy": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "external": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "anti-pattern": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function WisdomLibrary() {
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  
  const { data: categories, isLoading: categoriesLoading } = trpc.wisdom.categories.useQuery();
  const { data: allEntries, isLoading: entriesLoading } = trpc.wisdom.entries.useQuery();
  const { data: stats } = trpc.wisdom.stats.useQuery();
  const { data: searchResults, isLoading: searchLoading } = trpc.wisdom.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length >= 2 }
  );

  const entriesByCategory = useMemo(() => {
    if (!allEntries) return {};
    return allEntries.reduce((acc, entry) => {
      const key = entry.categorySlug;
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    }, {} as Record<string, typeof allEntries>);
  }, [allEntries]);

  const displayEntries = searchQuery.length >= 2 ? searchResults : allEntries;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjLTIgMC00IDItNCAyczIgMiA0IDJjMiAwIDQtMiA0LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="container py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Empathy Wisdom Library</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl mb-6">
            The complete knowledge base for the Maven Cashco Guardian. A structured repository of 
            protocols, scripts, anti-patterns, and frontline wisdom—designed to power empathetic AI 
            that provides <strong>relief today</strong> and <strong>hope for tomorrow</strong>.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">{stats?.totalCategories || 0}</div>
              <div className="text-purple-200 text-sm">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">{stats?.totalEntries || 0}</div>
              <div className="text-purple-200 text-sm">Wisdom Entries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-3xl font-bold">{stats?.sourceBreakdown?.find(s => s.sourceType === 'frontline')?.count || 0}</div>
              <div className="text-purple-200 text-sm">Frontline Insights</div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                ← Back to Insights Hub
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Dashboard
              </Button>
            </Link>
            {!user && !authLoading && (
              <a href={getLoginUrl()}>
                <Button className="bg-white text-purple-700 hover:bg-purple-50">
                  Sign in to contribute
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search the wisdom library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg bg-white dark:bg-slate-900 shadow-lg border-2 focus:border-purple-500"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white dark:bg-slate-900 shadow-md p-1 h-auto">
            <TabsTrigger value="browse" className="text-base py-3 px-6">
              <Library className="h-4 w-4 mr-2" />
              Browse by Category
            </TabsTrigger>
            <TabsTrigger value="all" className="text-base py-3 px-6">
              <BookOpen className="h-4 w-4 mr-2" />
              All Entries
            </TabsTrigger>
            <TabsTrigger value="export" className="text-base py-3 px-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Export for Bot
            </TabsTrigger>
          </TabsList>

          {/* Browse by Category */}
          <TabsContent value="browse" className="space-y-8">
            {categoriesLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading categories...</div>
            ) : categories && categories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link key={category.id} href={`/wisdom/${category.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-2 hover:border-purple-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                            {categoryIcons[category.slug] || <BookOpen className="h-6 w-6" />}
                          </div>
                          <div>
                            <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                              {category.name}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {entriesByCategory[category.slug]?.length || 0} entries
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base line-clamp-3">
                          {category.description || "Explore this category of wisdom."}
                        </CardDescription>
                        <div className="flex items-center text-purple-600 mt-4 text-sm font-medium group-hover:translate-x-2 transition-transform">
                          Explore <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Library className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Library is being built</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  The Empathy Wisdom Library is currently being populated with protocols, scripts, 
                  and frontline wisdom. Check back soon!
                </p>
              </Card>
            )}
          </TabsContent>

          {/* All Entries */}
          <TabsContent value="all" className="space-y-6">
            {entriesLoading || searchLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading entries...</div>
            ) : displayEntries && displayEntries.length > 0 ? (
              <div className="space-y-4">
                {searchQuery.length >= 2 && (
                  <div className="text-sm text-muted-foreground mb-4">
                    Found {displayEntries.length} results for "{searchQuery}"
                  </div>
                )}
                {displayEntries.map((entry) => (
                  <Link key={entry.id} href={`/wisdom/entry/${entry.slug}`}>
                    <Card className="hover:shadow-lg transition-all duration-200 hover:border-purple-300 cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {entry.categoryName}
                              </Badge>
                              <Badge className={`text-xs ${sourceTypeColors[entry.sourceType]}`}>
                                {entry.sourceType}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg hover:text-purple-600 transition-colors">
                              {entry.title}
                            </CardTitle>
                            {entry.subtitle && (
                              <CardDescription className="mt-1">{entry.subtitle}</CardDescription>
                            )}
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {entry.content.substring(0, 200)}...
                        </p>
                        {entry.source && (
                          <div className="text-xs text-muted-foreground mt-2">
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
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {searchQuery.length >= 2 ? "No results found" : "No entries yet"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery.length >= 2 
                    ? "Try a different search term."
                    : "The library is being populated with wisdom entries."}
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Export for Bot */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Export Wisdom for Bot Integration
                </CardTitle>
                <CardDescription>
                  Export the entire wisdom library in a structured format that can be fed into 
                  another AI bot or service.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">JSON Export</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Structured JSON format with all categories, entries, scripts, and anti-patterns.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const exportData = {
                            exportedAt: new Date().toISOString(),
                            categories: categories,
                            entries: allEntries,
                            stats: stats,
                          };
                          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'empathy-wisdom-library.json';
                          a.click();
                        }}
                        disabled={!allEntries || allEntries.length === 0}
                      >
                        Download JSON
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Markdown Export</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Human-readable Markdown format for documentation or training materials.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          let md = `# Empathy Wisdom Library\n\nExported: ${new Date().toISOString()}\n\n`;
                          categories?.forEach(cat => {
                            md += `## ${cat.name}\n\n${cat.description || ''}\n\n`;
                            entriesByCategory[cat.slug]?.forEach(entry => {
                              md += `### ${entry.title}\n\n`;
                              if (entry.subtitle) md += `*${entry.subtitle}*\n\n`;
                              md += `${entry.content}\n\n`;
                              if (entry.scriptExample) md += `**Script Example:**\n\n> ${entry.scriptExample}\n\n`;
                              if (entry.antiPattern) md += `**Anti-Pattern:**\n\n> ${entry.antiPattern}\n\n`;
                              md += `---\n\n`;
                            });
                          });
                          const blob = new Blob([md], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'empathy-wisdom-library.md';
                          a.click();
                        }}
                        disabled={!allEntries || allEntries.length === 0}
                      >
                        Download Markdown
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      API Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Access the wisdom library programmatically via our tRPC API endpoints:
                    </p>
                    <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div className="text-green-400">// Get all categories</div>
                      <div>trpc.wisdom.categories.useQuery()</div>
                      <div className="mt-2 text-green-400">// Get all entries</div>
                      <div>trpc.wisdom.entries.useQuery()</div>
                      <div className="mt-2 text-green-400">// Search entries</div>
                      <div>trpc.wisdom.search.useQuery({'{ query: "empathy" }'})</div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
