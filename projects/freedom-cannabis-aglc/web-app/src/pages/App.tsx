import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Share2, Printer, Users, Mail } from "lucide-react";
import storyData from "@/data/personal-story.json";

export default function Story() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-red-100 selection:text-red-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="h-6 w-6 bg-[#FF0000]" />
            <span>AGLC STRATEGY</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/">
              <a className="transition-colors hover:text-[#FF0000]">Strategy</a>
            </Link>
            <Link href="/story">
              <a className="text-[#FF0000]">The Story</a>
            </Link>
            <a href="#contact" className="transition-colors hover:text-[#FF0000]">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="container py-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 space-y-6">
            <Link href="/">
              <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-[#FF0000] mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Strategy
              </Button>
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground uppercase tracking-widest">
                <span className="text-[#FF0000]">Personal Story</span>
                <span>•</span>
                <span>{storyData.date}</span>
                <span>•</span>
                <span>{storyData.author}</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                {storyData.title}
              </h1>
              
              <p className="text-xl text-muted-foreground md:text-2xl font-light leading-relaxed">
                {storyData.subtitle}
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => {
                const subject = encodeURIComponent("The Human Cost: The Mole Who Got Charged");
                const body = encodeURIComponent("\"When doing the right thing costs you everything.\"\n\nI wanted to share this story with you before the hearing. It's not just about legal arguments; it's about the 50 families whose livelihoods are on the line.\n\nRead the full story here: " + window.location.href);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
              }}>
                <Mail className="h-4 w-4" />
                Email to Board
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'The Mole Who Got Charged',
                    text: 'When doing the right thing costs you everything.',
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  // You might want to add a toast here in a real app
                }
              }}>
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
                <Printer className="h-4 w-4" />
                Print Story
              </Button>
            </div>
          </div>

          {/* Faces of Freedom Visualization */}
          <div className="my-16 p-8 bg-muted/20 border border-border rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-[#FF0000]" />
              <h3 className="text-xl font-bold tracking-tight">The Human Cost: 50 Families</h3>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Behind every legal argument and bureaucratic decision, there are real people. 
              These 50 points represent the 50 jobs at Freedom Cannabis—50 mortgages, 
              50 families, and 50 livelihoods currently hanging in the balance.
            </p>
            <div className="grid grid-cols-10 gap-2 md:gap-3">
              {Array.from({ length: 50 }).map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-foreground/10 rounded-sm flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors cursor-default group"
                  title={`Job #${i + 1}`}
                >
                  <Users className="h-3 w-3 md:h-4 md:w-4 opacity-50 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg prose-gray max-w-none">
            {storyData.content.map((paragraph, index) => {
              if (paragraph === "———") {
                return (
                  <div key={index} className="flex justify-center my-12">
                    <div className="w-12 h-1 bg-[#FF0000]" />
                  </div>
                );
              }
              
              // Check if paragraph starts with a quote to style it differently
              if (paragraph.startsWith('"') || paragraph.startsWith("'")) {
                return (
                  <p key={index} className="text-xl font-serif italic text-foreground/80 leading-relaxed pl-6 border-l-4 border-[#FF0000]/20">
                    {paragraph}
                  </p>
                );
              }

              // First paragraph drop cap style
              if (index === 0) {
                return (
                  <p key={index} className="first-letter:float-left first-letter:text-7xl first-letter:font-bold first-letter:text-foreground first-letter:mr-3 first-letter:mt-[-10px]">
                    {paragraph}
                  </p>
                );
              }

              return (
                <p key={index} className="leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* Footer Call to Action */}
          <div className="mt-16 p-8 bg-muted/30 border border-border rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Why This Matters</h3>
            <p className="text-muted-foreground mb-6">
              This isn't just about one company. It's about the integrity of the entire regulatory system. 
              When we punish those who cooperate, we create a culture of silence.
            </p>
            <div className="flex gap-4">
              <Link href="/">
                <Button className="bg-[#FF0000] hover:bg-[#CC0000] text-white">
                  View Full Strategy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <div className="h-6 w-6 bg-[#FF0000]" />
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
