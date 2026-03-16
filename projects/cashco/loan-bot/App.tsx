import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import RespondentPage from "./pages/RespondentPage";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import WisdomLibrary from "./pages/WisdomLibrary";
import WisdomCategory from "./pages/WisdomCategory";
import WisdomEntry from "./pages/WisdomEntry";
import SubmitStory from "./pages/SubmitStory";
import JudgingPage from "./pages/JudgingPage";
import BestAnswers from "./pages/BestAnswers";
import AdminReminders from "./pages/AdminReminders";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/respondent/:id" component={RespondentPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/wisdom" component={WisdomLibrary} />
      <Route path="/wisdom/:slug" component={WisdomCategory} />
      <Route path="/wisdom/entry/:slug" component={WisdomEntry} />
      <Route path="/submit" component={SubmitStory} />
      <Route path="/judging" component={JudgingPage} />
      <Route path="/best-answers" component={BestAnswers} />
      <Route path="/admin/reminders" component={AdminReminders} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
