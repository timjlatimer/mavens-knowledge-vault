import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { PrintQuestionnaire } from "@/components/PrintQuestionnaire";
import { ProgressBanner } from "@/components/ProgressBanner";
import { trpc } from "@/lib/trpc";
import { QUESTIONS, type QuestionDef } from "@shared/questions";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { ReminderScheduler } from "@/components/ReminderScheduler";
import { OnboardingTour } from "@/components/OnboardingTour";
import { Clock } from "lucide-react";

export default function Questionnaire() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReminderScheduler, setShowReminderScheduler] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Check if user has seen onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding && isAuthenticated && currentStep === 0) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, currentStep]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  // Initialize respondent
  const initRespondent = trpc.questionnaire.initializeRespondent.useMutation();
  
  // Fetch existing responses for print functionality
  const { data: existingData } = trpc.questionnaire.getMyResponses.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const saveText = trpc.questionnaire.saveTextResponse.useMutation();
  const saveList = trpc.questionnaire.saveListResponse.useMutation();
  const saveChoice = trpc.questionnaire.saveMultipleChoiceResponse.useMutation();
  const saveBelief = trpc.questionnaire.saveBeliefResponse.useMutation();
  const saveFactors = trpc.questionnaire.saveSuccessFactors.useMutation();
  const markComplete = trpc.questionnaire.markComplete.useMutation();
  const scheduleReminder = trpc.questionnaire.scheduleReminder.useMutation();

  // Get current question
  const currentQuestion = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Handle response change
  const handleResponseChange = (value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.number]: value
    }));
    
    // Clear existing timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    // Set new timer for auto-save after 3 seconds
    const timer = setTimeout(() => {
      autoSaveResponse(value);
    }, 3000);
    
    setAutoSaveTimer(timer);
  };
  
  // Auto-save function
  const autoSaveResponse = async (value: any) => {
    // Don't auto-save if value is empty
    if (!value || (typeof value === 'string' && value.trim() === '') || 
        (Array.isArray(value) && value.length === 0)) {
      return;
    }
    
    try {
      if (currentQuestion.responseType === "text") {
        await saveText.mutateAsync({
          questionNumber: currentQuestion.number,
          questionCategory: currentQuestion.category,
          responseText: value
        });
      } else if (currentQuestion.responseType === "list") {
        await saveList.mutateAsync({
          questionNumber: currentQuestion.number,
          questionCategory: currentQuestion.category,
          items: value
        });
      } else if (currentQuestion.responseType === "multiple_choice") {
        await saveChoice.mutateAsync({
          questionNumber: currentQuestion.number,
          questionCategory: currentQuestion.category,
          selectedOption: value
        });
      }
      
      setLastSaved(new Date());
      toast.success("Progress auto-saved", { duration: 2000 });
    } catch (error) {
      console.error("Auto-save failed:", error);
      // Silently fail for auto-save
    }
  };
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [autoSaveTimer]);

  // Validate current response
  const validateCurrentResponse = (): boolean => {
    const response = responses[currentQuestion.number];

    if (!response) {
      toast.error("Please provide an answer before continuing");
      return false;
    }

    if (currentQuestion.responseType === "list") {
      if (!Array.isArray(response) || response.length === 0) {
        toast.error("Please provide at least one item");
        return false;
      }
      if (currentQuestion.expectedItemCount && response.length < currentQuestion.expectedItemCount) {
        toast.error(`Please provide at least ${currentQuestion.expectedItemCount} items`);
        return false;
      }
    }

    if (currentQuestion.responseType === "text" && typeof response === "string" && response.trim().length === 0) {
      toast.error("Please provide an answer");
      return false;
    }

    return true;
  };

  // Save current response to backend
  const saveCurrentResponse = async () => {
    const response = responses[currentQuestion.number];
    
    try {
      if (currentQuestion.responseType === "text") {
        await saveText.mutateAsync({
          questionNumber: currentQuestion.number,
          questionCategory: currentQuestion.category,
          responseText: response
        });
      } else if (currentQuestion.responseType === "list") {
        await saveList.mutateAsync({
          questionNumber: currentQuestion.number,
          questionCategory: currentQuestion.category,
          items: response
        });
      } else if (currentQuestion.responseType === "multiple_choice") {
        await saveChoice.mutateAsync({
          questionNumber: currentQuestion.number,
          questionCategory: currentQuestion.category,
          selectedOption: response
        });
      }
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error("Failed to save response. Please try again.");
      throw error;
    }
  };

  // Handle next
  const handleNext = async () => {
    if (!validateCurrentResponse()) return;

    setIsSubmitting(true);
    try {
      await saveCurrentResponse();
      
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      // Error already handled in saveCurrentResponse
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle previous
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle save and return later
  const handleSaveAndReturn = async () => {
    // Save current response if there is one
    if (responses[currentQuestion.number]) {
      setIsSubmitting(true);
      try {
        await saveCurrentResponse();
        toast.success("Progress saved!");
      } catch (error) {
        // Error already handled
      } finally {
        setIsSubmitting(false);
      }
    }
    
    // Show reminder scheduler
    setShowReminderScheduler(true);
  };

  // Handle schedule reminder
  const handleScheduleReminder = async (scheduledFor: Date, note?: string) => {
    await scheduleReminder.mutateAsync({
      scheduledFor,
      lastQuestionNumber: currentQuestion.number,
      reminderNote: note
    });
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validateCurrentResponse()) return;

    setIsSubmitting(true);
    try {
      await saveCurrentResponse();
      
      // Save belief response if exists
      if (responses[22]) {
        await saveBelief.mutateAsync(responses[22]);
      }

      // Save success factors if exists
      if (responses[30]) {
        await saveFactors.mutateAsync(responses[30]);
      }

      // Mark complete
      await markComplete.mutateAsync();

      toast.success("Questionnaire completed! Redirecting to your dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Failed to submit questionnaire. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Progress Banner - Shows journey progress */}
      <ProgressBanner questionsCompleted={existingData?.responses?.length || 0} />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-3xl font-bold text-center flex-1">Destiny Discovered</h1>
            <div className="flex-1 flex justify-end">
              <PrintQuestionnaire userResponses={existingData?.responses} variant="outline" />
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            Question {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div data-tour="progress" className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                {currentQuestion.number}
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{currentQuestion.text}</CardTitle>
                {currentQuestion.helpText && (
                  <CardDescription>{currentQuestion.helpText}</CardDescription>
                )}
                <div className="mt-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {currentQuestion.category}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Reflection Message */}
            <div data-tour="take-your-time" className="bg-muted/50 border border-muted rounded-lg p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-foreground mb-1">Take Your Time</p>
                <p className="text-muted-foreground">
                  Deep reflection can't be rushed. Many people complete this questionnaire over several days. 
                  Feel free to save your progress and return when you're ready.
                </p>
              </div>
            </div>
            {/* Text Response */}
            {currentQuestion.responseType === "text" && (
              <div>
                <Textarea
                  value={responses[currentQuestion.number] || ""}
                  onChange={(e) => handleResponseChange(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={6}
                  className="resize-none"
                />
              </div>
            )}

            {/* List Response */}
            {currentQuestion.responseType === "list" && (
              <ListInput
                value={responses[currentQuestion.number] || []}
                onChange={handleResponseChange}
                expectedCount={currentQuestion.expectedItemCount || 3}
              />
            )}

            {/* Multiple Choice Response */}
            {currentQuestion.responseType === "multiple_choice" && currentQuestion.options && (
              <RadioGroup
                value={responses[currentQuestion.number] || ""}
                onValueChange={handleResponseChange}
              >
                {currentQuestion.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Structured Response - Belief System */}
            {currentQuestion.number === 22 && (
              <BeliefSystemInput
                value={responses[22] || {}}
                onChange={handleResponseChange}
              />
            )}

            {/* Structured Response - Success Factors */}
            {currentQuestion.number === 30 && (
              <SuccessFactorsInput
                value={responses[30] || {}}
                onChange={handleResponseChange}
              />
            )}

            {/* Save and Return Button */}
            <div className="pt-4">
              <Button
                data-tour="save-return"
                variant="outline"
                onClick={handleSaveAndReturn}
                disabled={isSubmitting}
                className="w-full border-dashed"
              >
                <Clock className="w-4 h-4 mr-2" />
                Save & Return Later
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps - 1 ? (
                <Button onClick={handleNext} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-primary to-accent">
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <>
                      Complete
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Category: {currentQuestion.category}</p>
        </div>
      </div>

      {/* Reminder Scheduler Dialog */}
      <ReminderScheduler
        open={showReminderScheduler}
        onOpenChange={setShowReminderScheduler}
        currentQuestion={currentQuestion.number}
        onSchedule={handleScheduleReminder}
      />
      
      {/* Onboarding Tour */}
      {showOnboarding && (
        <OnboardingTour
          onComplete={() => {
            setShowOnboarding(false);
            localStorage.setItem('hasSeenOnboarding', 'true');
          }}
        />
      )}
    </div>
    </>
  );
}

// List Input Component
function ListInput({ value, onChange, expectedCount }: { value: string[]; onChange: (value: string[]) => void; expectedCount: number }) {
  const handleItemChange = (index: number, text: string) => {
    const newValue = [...value];
    newValue[index] = text;
    onChange(newValue);
  };

  const handleAddItem = () => {
    onChange([...value, ""]);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  // Ensure we have at least expectedCount items
  useEffect(() => {
    if (value.length < expectedCount) {
      onChange(Array(expectedCount).fill(""));
    }
  }, []);

  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="w-6 sm:w-8 h-10 sm:h-12 flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
            {index + 1}.
          </div>
          <Input
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            placeholder={`Item ${index + 1}`}
            className="flex-1 h-10 sm:h-12 text-base"
          />
          {value.length > expectedCount && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(index)}
              type="button"
              className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 text-xl"
            >
              ×
            </Button>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={handleAddItem} type="button" className="w-full h-10 sm:h-12 text-base">
        + Add Another Item
      </Button>
    </div>
  );
}

// Belief System Input Component
function BeliefSystemInput({ value, onChange }: { value: any; onChange: (value: any) => void }) {
  const handleChange = (field: string, val: any) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Label className="text-base sm:text-lg mb-3 block font-medium">Do you believe in a God or Superior Being?</Label>
        <RadioGroup
          value={value.believesInGod === true ? "yes" : value.believesInGod === false ? "no" : ""}
          onValueChange={(val) => handleChange("believesInGod", val === "yes")}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="yes" id="yes" className="h-5 w-5" />
            <Label htmlFor="yes" className="cursor-pointer text-base flex-1">Yes</Label>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="no" id="no" className="h-5 w-5" />
            <Label htmlFor="no" className="cursor-pointer text-base flex-1">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="why" className="text-base mb-2 block">Why?</Label>
        <Textarea
          id="why"
          value={value.whyText || ""}
          onChange={(e) => handleChange("whyText", e.target.value)}
          rows={3}
          className="text-base min-h-[100px]"
        />
      </div>

      <div>
        <Label htmlFor="advantages" className="text-base mb-2 block">What are the advantages of your belief?</Label>
        <Textarea
          id="advantages"
          value={value.advantagesText || ""}
          onChange={(e) => handleChange("advantagesText", e.target.value)}
          rows={3}
          className="text-base min-h-[100px]"
        />
      </div>

      <div>
        <Label htmlFor="disadvantages" className="text-base mb-2 block">What are the disadvantages? (if any)</Label>
        <Textarea
          id="disadvantages"
          value={value.disadvantagesText || ""}
          onChange={(e) => handleChange("disadvantagesText", e.target.value)}
          rows={3}
          className="text-base min-h-[100px]"
        />
      </div>

      <div>
        <Label htmlFor="evidence" className="text-base mb-2 block">What evidence supports your belief?</Label>
        <Textarea
          id="evidence"
          value={value.evidenceText || ""}
          onChange={(e) => handleChange("evidenceText", e.target.value)}
          rows={3}
          className="text-base min-h-[100px]"
        />
      </div>
    </div>
  );
}

// Success Factors Input Component
function SuccessFactorsInput({ value, onChange }: { value: any; onChange: (value: any) => void }) {
  const handleChange = (field: string, val: string) => {
    const numVal = parseFloat(val) || 0;
    onChange({ ...value, [field]: numVal });
  };

  const total = (value.personalInfluencePct || 0) + 
                (value.othersInfluencePct || 0) + 
                (value.economicSocialPct || 0) + 
                (value.uncontrollablePct || 0);

  const isValid = Math.abs(total - 100) < 0.01;

  return (
    <div className="space-y-4">
      <p className="text-sm sm:text-base text-muted-foreground p-3 bg-muted/30 rounded-lg">
        Distribute 100% across the following factors that contribute to success:
      </p>

      <div className="space-y-3">
        <div>
          <Label htmlFor="personal" className="text-base mb-2 block">Personal Influence (%)</Label>
          <Input
            id="personal"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            value={value.personalInfluencePct || ""}
            onChange={(e) => handleChange("personalInfluencePct", e.target.value)}
            className="h-12 text-base text-center text-lg font-semibold"
          />
        </div>

        <div>
          <Label htmlFor="others" className="text-base mb-2 block">Influence of Others (%)</Label>
          <Input
            id="others"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            value={value.othersInfluencePct || ""}
            onChange={(e) => handleChange("othersInfluencePct", e.target.value)}
            className="h-12 text-base text-center text-lg font-semibold"
          />
        </div>

        <div>
          <Label htmlFor="economic" className="text-base mb-2 block">Economic/Social Influences (%)</Label>
          <Input
            id="economic"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            value={value.economicSocialPct || ""}
            onChange={(e) => handleChange("economicSocialPct", e.target.value)}
            className="h-12 text-base text-center text-lg font-semibold"
          />
        </div>

        <div>
          <Label htmlFor="uncontrollable" className="text-base mb-2 block">Uncontrollable Influences (%)</Label>
          <Input
            id="uncontrollable"
            type="number"
            inputMode="decimal"
            min="0"
            max="100"
            value={value.uncontrollablePct || ""}
            onChange={(e) => handleChange("uncontrollablePct", e.target.value)}
            className="h-12 text-base text-center text-lg font-semibold"
          />
        </div>
      </div>

      <div className={`text-base sm:text-lg font-semibold p-3 rounded-lg text-center ${isValid ? "text-green-600 bg-green-50" : "text-destructive bg-destructive/10"}`}>
        Total: {total.toFixed(1)}% {isValid ? "✓" : "(must equal 100%)"}
      </div>
    </div>
  );
}
