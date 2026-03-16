// client/src/App.tsx
// Main app with routes

import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Voice from "@/pages/Voice";
import Flypaper from "@/pages/Flypaper";
import Admin from "@/pages/Admin";
import More from "@/pages/More";
import Widget from "@/pages/Widget";
import Knowledge from "@/pages/Knowledge";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/voice" component={Voice} />
        <Route path="/flypaper" component={Flypaper} />
        <Route path="/admin" component={Admin} />
        <Route path="/more" component={More} />
        <Route path="/widget" component={Widget} />
        <Route path="/knowledge" component={Knowledge} />
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h1>
              <a href="/" className="text-purple-600 hover:text-purple-700">Back to Grace</a>
            </div>
          </div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}
