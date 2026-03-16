import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

const TOUR_STEPS: TourStep[] = [
  {
    target: "[data-tour='take-your-time']",
    title: "Take Your Time",
    description: "Deep reflection can't be rushed. Many people complete this questionnaire over several days. There's no pressure to finish in one sitting.",
    position: "bottom"
  },
  {
    target: "[data-tour='save-return']",
    title: "Save & Return Later",
    description: "Click this button anytime to save your progress and schedule an email reminder to continue when you're ready.",
    position: "top"
  },
  {
    target: "[data-tour='progress']",
    title: "Track Your Progress",
    description: "See how far you've come with this progress indicator. You can always return to previous questions.",
    position: "bottom"
  }
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const currentTourStep = TOUR_STEPS[currentStep];

  useEffect(() => {
    // Wait a bit for the page to render
    const timer = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const updatePosition = () => {
    const targetElement = document.querySelector(currentTourStep.target);
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const cardWidth = 320;
    const cardHeight = 200;
    const padding = 16;

    let top = 0;
    let left = 0;

    switch (currentTourStep.position) {
      case "bottom":
        top = rect.bottom + padding;
        left = rect.left + (rect.width / 2) - (cardWidth / 2);
        break;
      case "top":
        top = rect.top - cardHeight - padding;
        left = rect.left + (rect.width / 2) - (cardWidth / 2);
        break;
      case "left":
        top = rect.top + (rect.height / 2) - (cardHeight / 2);
        left = rect.left - cardWidth - padding;
        break;
      case "right":
        top = rect.top + (rect.height / 2) - (cardHeight / 2);
        left = rect.right + padding;
        break;
    }

    // Keep within viewport bounds
    const maxLeft = window.innerWidth - cardWidth - padding;
    const maxTop = window.innerHeight - cardHeight - padding;
    
    left = Math.max(padding, Math.min(left, maxLeft));
    top = Math.max(padding, Math.min(top, maxTop));

    setPosition({ top, left });

    // Highlight the target element
    targetElement.classList.add("tour-highlight");
    
    // Remove highlight from previous elements
    document.querySelectorAll(".tour-highlight").forEach(el => {
      if (el !== targetElement) {
        el.classList.remove("tour-highlight");
      }
    });
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Remove all highlights
    document.querySelectorAll(".tour-highlight").forEach(el => {
      el.classList.remove("tour-highlight");
    });
    
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleComplete} />
      
      {/* Tour Card */}
      <Card 
        className="fixed z-50 w-80 shadow-2xl"
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
          transition: "all 0.3s ease-in-out"
        }}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{currentTourStep.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep + 1} of {TOUR_STEPS.length}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleComplete}
              className="h-8 w-8 -mt-2 -mr-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm mb-6">
            {currentTourStep.description}
          </p>
          
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button
              size="sm"
              onClick={handleNext}
            >
              {currentStep === TOUR_STEPS.length - 1 ? "Got it!" : "Next"}
              {currentStep < TOUR_STEPS.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Add CSS for highlight effect */}
      <style>{`
        .tour-highlight {
          position: relative;
          z-index: 45;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.25);
          border-radius: 8px;
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
