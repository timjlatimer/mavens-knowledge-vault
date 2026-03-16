import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Download, Presentation, FileText, ChevronRight } from "lucide-react";

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="h-4 w-4 bg-accent rounded-full" />
            <div className="h-4 w-4 bg-primary" />
            <span>AGLC STRATEGY</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/">
              <a className="transition-colors hover:text-accent">Strategy</a>
            </Link>
            <Link href="/presentation">
              <a className="text-accent">Presentation</a>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 space-y-6">
            <Link href="/">
              <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-accent mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Strategy
              </Button>
            </Link>
            
            <div className="space-y-4">
              <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-bold tracking-widest uppercase transition-colors border-transparent bg-accent/10 text-accent">
                Board Presentation
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                The Mole Who Got Charged
              </h1>
              
              <p className="text-xl text-muted-foreground md:text-2xl font-light leading-relaxed">
                Visual evidence and strategic breakdown for the February 4th Appeal Hearing.
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <a href="/The_Mole_Who_Got_Charged.pptx" download>
                <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-white">
                  <Download className="h-4 w-4" />
                  Download PPTX
                </Button>
              </a>
            </div>
          </div>

          {/* Preview Section */}
          <div className="grid gap-8">
            <Card className="bg-muted/30 border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-background flex items-center justify-center border-b border-border relative group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-10 transition-opacity" />
                  <div className="relative z-10 text-center space-y-4 p-8">
                    <Presentation className="h-24 w-24 mx-auto text-accent opacity-80" />
                    <h3 className="text-2xl font-bold">Presentation Deck</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      This deck contains the complete visual timeline, redacted evidence, and the "Golden Bridge" proposal for the Board.
                    </p>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Key Slides Overview
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      "The Betrayal Loop: Visualizing the Process Abuse",
                      "The Human Cost: 50 Families at Risk",
                      "Redacted Evidence: The 'Cleared' Investigation",
                      "The Golden Bridge: A Path to Resolution"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-background border border-border rounded-sm">
                        <div className="mt-1 bg-accent/10 text-accent h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 mt-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <div className="h-4 w-4 bg-accent rounded-full" />
                <div className="h-4 w-4 bg-primary" />
                <span>AGLC STRATEGY</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A strategic initiative to restore fairness and integrity to the regulatory process.
              </p>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Freedom Cannabis. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
