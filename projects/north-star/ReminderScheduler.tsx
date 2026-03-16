import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

interface ReminderSchedulerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentQuestion: number;
  onSchedule: (scheduledFor: Date, note?: string) => Promise<void>;
}

export function ReminderScheduler({
  open,
  onOpenChange,
  currentQuestion,
  onSchedule,
}: ReminderSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reminderNote, setReminderNote] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);

  const handleQuickSchedule = async (days: number) => {
    const scheduledFor = new Date();
    scheduledFor.setDate(scheduledFor.getDate() + days);
    scheduledFor.setHours(10, 0, 0, 0); // Default to 10 AM
    
    setIsScheduling(true);
    try {
      await onSchedule(scheduledFor, reminderNote || undefined);
      toast.success(`Reminder scheduled for ${scheduledFor.toLocaleDateString()}`);
      onOpenChange(false);
      setReminderNote("");
      setSelectedDate(undefined);
    } catch (error) {
      toast.error("Failed to schedule reminder");
    } finally {
      setIsScheduling(false);
    }
  };

  const handleCustomSchedule = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    const scheduledFor = new Date(selectedDate);
    scheduledFor.setHours(10, 0, 0, 0); // Default to 10 AM

    setIsScheduling(true);
    try {
      await onSchedule(scheduledFor, reminderNote || undefined);
      toast.success(`Reminder scheduled for ${scheduledFor.toLocaleDateString()}`);
      onOpenChange(false);
      setReminderNote("");
      setSelectedDate(undefined);
    } catch (error) {
      toast.error("Failed to schedule reminder");
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Take Your Time
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Deep reflection can't be rushed. You're on question {currentQuestion} of 30.
            When would you like us to remind you to continue your journey?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Quick Schedule Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Schedule</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => handleQuickSchedule(1)}
                disabled={isScheduling}
                className="h-auto py-3 flex flex-col items-center gap-1"
              >
                <span className="text-lg font-semibold">1</span>
                <span className="text-xs">Day</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickSchedule(3)}
                disabled={isScheduling}
                className="h-auto py-3 flex flex-col items-center gap-1"
              >
                <span className="text-lg font-semibold">3</span>
                <span className="text-xs">Days</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickSchedule(7)}
                disabled={isScheduling}
                className="h-auto py-3 flex flex-col items-center gap-1"
              >
                <span className="text-lg font-semibold">7</span>
                <span className="text-xs">Days</span>
              </Button>
            </div>
          </div>

          {/* Custom Date Picker */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Or Choose a Custom Date
            </Label>
            <div className="flex justify-center border rounded-md p-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Optional Note */}
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">
              Reflection Note (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="What do you want to reflect on? (e.g., 'Think about my core values and what truly matters')"
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              This note will be included in your reminder email
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isScheduling}
          >
            Cancel
          </Button>
          {selectedDate && (
            <Button
              onClick={handleCustomSchedule}
              disabled={isScheduling}
              className="w-full sm:w-auto"
            >
              {isScheduling ? "Scheduling..." : `Schedule for ${selectedDate.toLocaleDateString()}`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
