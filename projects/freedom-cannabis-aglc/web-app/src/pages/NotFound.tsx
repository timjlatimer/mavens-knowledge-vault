import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, FileText, Gavel, ShieldAlert, Users, Quote, Calendar, Mic, Newspaper, Download, RefreshCw, AlertTriangle, Check, Eye, Mail, Share2, Printer } from "lucide-react";
import { Link } from "wouter";
import narrativeData from "@/data/narrative.json";
import pressRelease from "@/data/press-release.json";
import storyData from "@/data/personal-story.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Header / Nav */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="h-4 w-4 bg-accent rounded-full" />
            <div className="h-4 w-4 bg-primary" />
            <span>THE MOLE WHO GOT CHARGED</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#narrative" className="hover:text-accent transition-colors">Narrative</a>
            <a href="#timeline" className="hover:text-accent transition-colors">Timeline</a>
            <a href="#legal" className="hover:text-accent transition-colors">Legal Strategy</a>
            <a href="#golden-bridge" className="hover:text-accent transition-colors">Golden Bridge</a>
            <Link href="/presentation">
              <a className="hover:text-accent transition-colors font-bold">Presentation</a>
            </Link>
            <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-white border-none rounded-none">
              Certified LLP V9.0
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-12 md:py-24 space-y-24">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-accent text-white">
              Appeal Hearing • Feb 4, 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              A CASE OF <br />
              <span className="text-accent">BUREAUCRATIC</span> <br />
              BETRAYAL
            </h1>
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              Freedom Cannabis v. AGLC. The story of a cooperating witness who got charged while the gangsters walked free.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="rounded-none text-base px-8" asChild>
                <a href="#narrative">Read the Story <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none text-base px-8 gap-2" onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
                <Users className="h-4 w-4" />
                The Human Cost
              </Button>
            </div>
          </div>
          <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden border border-border">
            <img 
              src="/slide_title.webp" 
              alt="The Mole Who Got Charged Title Slide" 
              className="object-contain w-full h-full hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>

        <Separator className="bg-border" />

      {/* Full Personal Story Section */}
      <section id="story" className="py-16 bg-muted/10 border-b border-border">
        <div className="container max-w-4xl">
          <div className="mb-12 space-y-6 text-center">
            <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-bold tracking-widest uppercase transition-colors border-transparent bg-accent/10 text-accent">
              Personal Story
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              {storyData.title}
            </h2>
            <p className="text-xl text-muted-foreground md:text-2xl font-light leading-relaxed">
              {storyData.subtitle}
            </p>

            {/* Audio Narration */}
            <div className="max-w-md mx-auto mt-8 p-4 bg-background border border-border rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Mic className="h-5 w-5 text-accent" />
                <span className="font-bold text-sm uppercase tracking-wider">Listen to the Story</span>
              </div>
              <audio controls className="w-full h-8">
                <source src="/story-narration.wav" type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
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
          <div className="my-12 p-8 bg-background border border-border rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold tracking-tight">The Human Cost: 50 Families</h3>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Behind every legal argument and bureaucratic decision, there are real people. 
              These are the faces of the 50 jobs at Freedom Cannabis—50 mortgages, 
              50 families, and 50 livelihoods currently hanging in the balance.
            </p>
            
            {/* Faces of Freedom Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg group">
                <img src="/faces/face1.jpg" alt="Retail Worker" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs font-medium">Retail Staff</div>
              </div>
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg group">
                <img src="/faces/face2.jpg" alt="Warehouse Staff" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs font-medium">Warehouse Team</div>
              </div>
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg group">
                <img src="/faces/face3.jpg" alt="Logistics Coordinator" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs font-medium">Logistics</div>
              </div>
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg group">
                <img src="/faces/face4.jpg" alt="Production Staff" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs font-medium">Production</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic mb-8">
              *Representative photos of the 50 hard-working staff members whose livelihoods are at risk.
            </p>
          </div>

          {/* Story Content */}
          <article className="prose prose-lg prose-gray max-w-none">
            {storyData.content.map((paragraph, index) => {
              if (paragraph === "———") {
                return (
                  <div key={index} className="flex justify-center my-12">
                    <div className="w-12 h-1 bg-accent" />
                  </div>
                );
              }
              
              if (paragraph.startsWith('"') || paragraph.startsWith("'")) {
                return (
                  <p key={index} className="text-xl font-serif italic text-foreground/80 leading-relaxed pl-6 border-l-4 border-accent/20">
                    {paragraph}
                  </p>
                );
              }

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
        </div>
      </section>

        <Separator className="bg-border" />

        {/* The Betrayal Loop Section */}
        <section className="py-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Betrayal Loop</h2>
            <p className="text-xl text-muted-foreground">
              How a closed file was reopened to punish a cooperator. Click each step to see the details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border -z-10" />

            {/* Step 1: Investigated & Cleared */}
            <div className="group cursor-pointer" onClick={() => document.getElementById('detail-1')?.classList.toggle('hidden')}>
              <div className="bg-background border border-border p-6 relative hover:border-green-500 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md h-full">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-background relative z-10">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-green-700 transition-colors">1. Investigated & Cleared</h3>
                  <p className="text-sm text-muted-foreground">
                    AGLC investigates the initial transaction. Finds no wrongdoing. File is officially closed.
                  </p>
                  <p className="text-xs font-bold text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details ↓</p>
                </div>
              </div>
            </div>

            {/* Step 2: Asked for Help */}
            <div className="group cursor-pointer" onClick={() => document.getElementById('detail-2')?.classList.toggle('hidden')}>
              <div className="bg-background border border-border p-6 relative hover:border-blue-500 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md h-full">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-background relative z-10">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-blue-700 transition-colors">2. Asked for Help</h3>
                  <p className="text-sm text-muted-foreground">
                    AGLC approaches Freedom Cannabis for help investigating a larger target (Connect Logistics).
                  </p>
                  <p className="text-xs font-bold text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details ↓</p>
                </div>
              </div>
            </div>

            {/* Step 3: Cooperated */}
            <div className="group cursor-pointer" onClick={() => document.getElementById('detail-3')?.classList.toggle('hidden')}>
              <div className="bg-background border border-border p-6 relative hover:border-yellow-500 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md h-full">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-background relative z-10">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-yellow-700 transition-colors">3. Cooperated</h3>
                  <p className="text-sm text-muted-foreground">
                    Freedom provides full transparency, handing over all records to assist the regulator.
                  </p>
                  <p className="text-xs font-bold text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details ↓</p>
                </div>
              </div>
            </div>

            {/* Step 4: Charged */}
            <div className="group cursor-pointer" onClick={() => document.getElementById('detail-4')?.classList.toggle('hidden')}>
              <div className="bg-background border border-border p-6 relative hover:border-red-500 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md h-full">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-background relative z-10">
                  <Gavel className="w-6 h-6" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-red-700 transition-colors">4. Charged</h3>
                  <p className="text-sm text-muted-foreground">
                    AGLC uses the provided evidence to reopen the closed file and charge the whistleblower.
                  </p>
                  <p className="text-xs font-bold text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details ↓</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Details Panels */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div id="detail-1" className="hidden bg-green-50 border border-green-200 p-6 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Check className="h-4 w-4" /> Phase 1: The Clean Slate (Jan 2023)</h4>
              <p className="text-green-900/80">
                The AGLC initially flagged the transaction in question. After a standard compliance review, investigators found no evidence of inducement or regulatory breach. The file was officially closed, and Freedom Cannabis was given a "clean bill of health" regarding this matter.
              </p>
            </div>
            <div id="detail-2" className="hidden bg-blue-50 border border-blue-200 p-6 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Phase 2: The Request (Mar 2023)</h4>
              <p className="text-blue-900/80">
                Seeking to investigate larger systemic issues with Connect Logistics, AGLC investigators approached Freedom Cannabis not as a suspect, but as a partner. They explicitly requested assistance and data to help build a case against the logistics provider.
              </p>
            </div>
            <div id="detail-3" className="hidden bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Phase 3: The Handover (Apr 2023)</h4>
              <p className="text-yellow-900/80">
                Acting in good faith and believing in the "Golden Bridge" of cooperation, Freedom Cannabis handed over comprehensive internal records, emails, and transaction logs—materials they were not legally obligated to provide but did so to assist the regulator.
              </p>
            </div>
            <div id="detail-4" className="hidden bg-red-50 border border-red-200 p-6 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2"><Gavel className="h-4 w-4" /> Phase 4: The Betrayal (Jun 2023)</h4>
              <p className="text-red-900/80">
                Instead of using the evidence against Connect Logistics, the AGLC weaponized Freedom's own cooperation against them. They reopened the previously closed file (Phase 1) solely based on the voluntary disclosures (Phase 3) and issued charges—a clear abuse of process.
              </p>
            </div>
          </div>
        </section>

        {/* Key Documents Section */}
        <section className="py-12 bg-muted/30 border-y border-border">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">The Evidence</h2>
            <p className="text-muted-foreground">
              Redacted documents confirming the initial investigation and file closure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Document 1: Initial Investigation Report */}
            <Card className="bg-background border-border hover:border-accent transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      Investigation Report
                    </CardTitle>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Mid 2025 • Phase 2</p>
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase">
                    Cleared
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[3/4] bg-muted relative overflow-hidden border border-border rounded-sm flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]"></div>
                  <div className="text-center p-6 opacity-50">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-mono">[REDACTED]</p>
                    <p className="text-xs mt-2">Initial Findings Report</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" className="gap-2">
                      <Eye className="h-4 w-4" /> View Document
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Official record showing the initial review of the independent retailer strategy, concluding with no findings of inducement.
                </p>
              </CardContent>
            </Card>

            {/* Document 2: Closure Letter */}
            <Card className="bg-background border-border hover:border-accent transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      File Closure Letter
                    </CardTitle>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Mid 2025 • Phase 2</p>
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase">
                    Closed
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[3/4] bg-muted relative overflow-hidden border border-border rounded-sm flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]"></div>
                  <div className="text-center p-6 opacity-50">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-mono">[REDACTED]</p>
                    <p className="text-xs mt-2">Official Closure Notice</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" className="gap-2">
                      <Eye className="h-4 w-4" /> View Document
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Formal correspondence from AGLC confirming the matter was resolved and the file was officially closed with no penalties.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="bg-border" />

        {/* Narrative Section */}
        <section id="narrative" className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold tracking-tight mb-4">The Narrative</h2>
              <p className="text-muted-foreground">
                How AGLC turned their own informant into the enemy.
              </p>
            </div>
            <div className="md:col-span-8 grid gap-8 md:grid-cols-2">
              <Card className="border-none shadow-none bg-secondary/30 rounded-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    The Recruitment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  AGLC management asked us to help investigate gangster behavior. We cooperated fully, providing emails and interviews based on "wink-wink" assurances of safety.
                </CardContent>
              </Card>
              <Card className="border-none shadow-none bg-secondary/30 rounded-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-accent" />
                    The Betrayal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  A separate Investigation Division used our own evidence to charge us. They reopened a closed matter. The actual gangsters (High Tide) faced zero charges.
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative w-full aspect-[16/9] border border-border overflow-hidden group">
            <img 
              src="/AGLC_Timeline_Infographic.png" 
              alt="Timeline of Bureaucratic Betrayal" 
              className="object-contain w-full h-full"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
          </div>
        </section>

        {/* Narrative & Evidence Library */}
        <section id="narrative-library" className="space-y-12 py-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Narrative & Evidence Library</h2>
            <p className="text-xl text-muted-foreground">
              A timeline of truth: The detailed story supported by key evidence and exchanges.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {narrativeData.map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-card border border-border shadow-sm rounded-lg hover:border-accent transition-colors">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">{item.phase}</span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Evidence Box */}
                  <div className="bg-secondary/30 rounded-md p-4 space-y-3 border-l-2 border-accent/50">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <Quote className="w-3 h-3" /> Key Evidence
                    </h4>
                    <ul className="space-y-3">
                      {item.evidence.map((ev, j) => (
                        <li key={j} className="text-sm">
                          <span className="font-medium text-foreground">{ev.type}:</span>{" "}
                          <span className="text-muted-foreground italic">"{ev.content}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-secondary/20 p-8 md:p-12 -mx-4 md:-mx-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">The Irony</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 shrink-0 bg-black text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg">The Gangsters Walked</h3>
                  <p className="text-muted-foreground">High Tide faced 0 investigations, 0 fines, and 0 consequences.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 shrink-0 bg-accent text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg">The Mole Got Charged</h3>
                  <p className="text-muted-foreground">Freedom Cannabis faces a $100,000 fine and 50+ job losses for helping the regulator.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-border shadow-sm">
            <img src="/slide_gangsters.webp" alt="Gangsters vs Mole Comparison" className="w-full h-auto" />
          </div>
        </section>

        {/* Legal Strategy Section */}
        <section id="legal" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Six Legal Grounds for Dismissal</h2>
            <p className="text-xl text-muted-foreground">
              This charge should never have been filed. The Board has the authority to dismiss it entirely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Legitimate Expectation", desc: "AGLC made representations we relied on. They are bound by them." },
              { title: "Promissory Estoppel", desc: "AGLC promised protection. They cannot resile from that promise now." },
              { title: "Abuse of Process", desc: "Reopening a closed matter using cooperator evidence is abusive." },
              { title: "Procedural Fairness", desc: "Evidence obtained for one purpose cannot be used for another without notice." },
              { title: "Res Judicata", desc: "The matter was previously reviewed and closed. It cannot be re-litigated." },
              { title: "Proportionality", desc: "$100K fine for 3 days of harmless conduct is grossly unreasonable." }
            ].map((item, i) => (
              <Card key={i} className="rounded-none border-border hover:border-accent transition-colors group">
                <CardHeader>
                  <CardTitle className="group-hover:text-accent transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <img src="/AGLC_Legal_Arguments_Infographic.png" alt="Six Legal Grounds Infographic" className="w-full border border-border" />
             <div className="bg-secondary/30 p-8 flex flex-col justify-center space-y-6 border-l-4 border-accent">
               <h3 className="text-2xl font-bold">Key Precedents Added (V9.0)</h3>
               <ul className="space-y-4">
                 <li className="flex gap-3">
                   <Gavel className="h-5 w-5 text-accent shrink-0" />
                   <div>
                     <span className="font-bold block">Mount Sinai v. Quebec</span>
                     <span className="text-sm text-muted-foreground">Establishes estoppel against the Crown.</span>
                   </div>
                 </li>
                 <li className="flex gap-3">
                   <Gavel className="h-5 w-5 text-accent shrink-0" />
                   <div>
                     <span className="font-bold block">Vavilov Standard</span>
                     <span className="text-sm text-muted-foreground">Reasonableness review for administrative penalties.</span>
                   </div>
                 </li>
               </ul>
             </div>
          </div>
        </section>

        {/* Media Center Section */}
        <section id="media-center" className="space-y-12 py-12 bg-secondary/10 -mx-4 md:-mx-12 px-4 md:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Media Center</h2>
            <p className="text-xl text-muted-foreground">
              Resources for the press and public record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Press Release Preview */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                <Newspaper className="w-4 h-4" /> Sample Press Release
              </div>
              <Card className="border-border shadow-sm rounded-none bg-background">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-muted-foreground uppercase">{pressRelease.date} • {pressRelease.location}</div>
                    <h3 className="text-2xl font-bold leading-tight">{pressRelease.title}</h3>
                    <p className="text-lg font-medium text-accent">{pressRelease.subtitle}</p>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>{pressRelease.content[0]}</p>
                    <p>{pressRelease.content[1]}</p>
                    <p className="italic border-l-2 border-accent pl-4 py-1 text-foreground">
                      "{pressRelease.content[3]}"
                    </p>
                  </div>
                  <Button variant="outline" className="w-full rounded-none group" asChild>
                    <a href="#">
                      <Download className="mr-2 h-4 w-4 group-hover:text-accent transition-colors" /> Download Full Release (PDF)
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recordings / Multimedia */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                <Mic className="w-4 h-4" /> Evidence Recordings
              </div>
              <div className="grid gap-4">
                {[
                  { title: "Meeting with AGLC President", date: "Oct 12, 2024", duration: "45:20", type: "Audio" },
                  { title: "Investigation Interview #1", date: "Nov 05, 2024", duration: "1:12:05", type: "Audio" },
                  { title: "Investigation Interview #2", date: "Nov 18, 2024", duration: "58:30", type: "Audio" }
                ].map((rec, i) => (
                  <Card key={i} className="border-border shadow-sm rounded-none bg-background hover:border-accent transition-colors cursor-pointer group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                          <Mic className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold group-hover:text-accent transition-colors">{rec.title}</div>
                          <div className="text-xs text-muted-foreground">{rec.date} • {rec.duration}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs uppercase tracking-wider font-bold">
                        Play
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="bg-secondary/20 border border-dashed border-border p-8 text-center space-y-2 rounded-none">
                  <p className="text-muted-foreground font-medium">Full Audio Archive Available Upon Request</p>
                  <p className="text-xs text-muted-foreground/70">Access restricted to authorized parties.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Golden Bridge Section */}
        <section id="golden-bridge" className="bg-black text-white p-8 md:p-16 -mx-4 md:-mx-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Golden Bridge</h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                We are offering the Board a dignified exit. A way to fix an institutional mistake before it becomes a public spectacle.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1 bg-accent h-full min-h-[3rem]" />
                  <div>
                    <h4 className="font-bold text-xl mb-1">Path A: Testimony</h4>
                    <p className="text-gray-400">Public record. Media headlines. AGLC credibility damaged.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-green-500 h-full min-h-[3rem]" />
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-green-400">Path B: Dismissal</h4>
                    <p className="text-gray-400">Matter closed quietly. Internal issues stay internal. Trust preserved.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-none mt-4" asChild>
                <a href="#ask">See The Ask</a>
              </Button>
            </div>
            <div className="border border-gray-800">
              <img src="/slide_paths.webp" alt="Two Paths Slide" className="w-full h-auto opacity-90" />
            </div>
          </div>
        </section>

        {/* The Ask Section */}
        <section id="ask" className="text-center space-y-8 py-12">
          <h2 className="text-4xl font-bold tracking-tight">The Ask</h2>
          <p className="text-2xl text-accent font-medium">Complete Dismissal.</p>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            We are not asking for mercy. We are asking for justice. This charge should never have been filed.
          </p>
          <div className="max-w-4xl mx-auto border border-border shadow-lg">
            <img src="/slide_ask.webp" alt="The Ask Slide" className="w-full h-auto" />
          </div>
        </section>

        {/* Case Files & Downloads */}
        <section id="downloads" className="space-y-12 py-12 border-t border-border">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Case Files & Downloads</h2>
            <p className="text-xl text-muted-foreground">
              Access the complete strategic and legal package prepared for the hearing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Strategic Analysis", type: "PDF", size: "Document", href: "/AGLC_Hearing_Strategic_Analysis.pdf", icon: FileText },
              { title: "Talking Points", type: "PDF", size: "One-Pager", href: "/AGLC_Hearing_Talking_Points.pdf", icon: FileText },
              { title: "Legal Strategy", type: "PDF", size: "Brief", href: "/AGLC_Legal_Strategy.md.pdf", icon: Gavel },
              { title: "Presentation Deck", type: "PPTX", size: "Slides", href: "/The_Mole_Who_Got_Charged.pptx", icon: FileText },
            ].map((file, i) => (
              <a key={i} href={file.href} download className="block group">
                <Card className="h-full rounded-none border-border group-hover:border-accent transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {file.type}
                    </CardTitle>
                    <file.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{file.title}</div>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • Download
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Full Presentation Gallery */}
        <section id="presentation" className="space-y-12 py-12 bg-secondary/10 -mx-4 md:-mx-12 px-4 md:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Full Case Deck</h2>
            <p className="text-xl text-muted-foreground">
              Review the complete 11-slide presentation prepared for the February 4th hearing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: "/slide_01.png", title: "Title Slide" },
              { src: "/slide_02.png", title: "The Recruitment" },
              { src: "/slide_03.png", title: "The Cooperation" },
              { src: "/slide_04.png", title: "The Betrayal" },
              { src: "/slide_05.png", title: "The Gangsters" },
              { src: "/slide_06.png", title: "The Loop" },
              { src: "/slide_07.png", title: "Legal Grounds" },
              { src: "/slide_08.png", title: "Two Paths" },
              { src: "/slide_09.png", title: "Our Commitment" },
              { src: "/slide_10.png", title: "The Ask" },
              { src: "/slide_11.png", title: "Closing Promise" },
            ].map((slide, i) => (
              <div key={i} className="space-y-3 group">
                <div className="relative aspect-video border border-border overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                  <img 
                    src={slide.src} 
                    alt={slide.title} 
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-sm">
                    #{i + 1}
                  </div>
                </div>
                <h3 className="font-medium text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
                  {slide.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Certification Footer */}
        <footer className="border-t border-border pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h3 className="font-bold text-lg mb-2">Learning Loop V9.0 Certified</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                This strategy has been rigorously tested, enhanced with new legal precedents, and certified for integrity and alignment by the Learning Loop Protocol.
              </p>
            </div>
            <div className="border border-border">
              <img src="/header.png" alt="Gamification Header Certification" className="w-full h-auto" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Freedom Cannabis. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Transparency</span>
              <span>Cooperation</span>
              <span>Justice</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
