import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import { QUESTIONS } from "@shared/questions";

interface PrintQuestionnaireProps {
  userResponses?: Array<{
    questionNumber: number;
    responseText?: string | null;
    listItems?: Array<{ itemText: string }>;
    multipleChoiceOptions?: string[];
    beliefSystem?: Array<{ belief: string; percentage: number }>;
    successFactors?: Array<{ factor: string; percentage: number }>;
  }>;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function PrintQuestionnaire({ 
  userResponses, 
  variant = "default",
  size = "default",
  className = ""
}: PrintQuestionnaireProps) {
  const handlePrint = (includeAnswers: boolean) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = generatePrintHTML(includeAnswers);
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  const generatePrintHTML = (includeAnswers: boolean) => {
    const responseMap = new Map(
      userResponses?.map(r => [r.questionNumber, r]) || []
    );

    const questionsHTML = QUESTIONS.map((q, index) => {
      const questionNum = index + 1;
      const response = responseMap.get(questionNum);
      
      let answerSection = '';
      
      if (includeAnswers && response) {
        if (response.responseText) {
          answerSection = `
            <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-left: 3px solid #3b82f6;">
              <strong>Your Answer:</strong>
              <p style="margin-top: 8px; white-space: pre-wrap;">${response.responseText}</p>
            </div>
          `;
        } else if (response.listItems && response.listItems.length > 0) {
          const items = response.listItems.map(item => 
            `<li style="margin-bottom: 4px;">${item.itemText}</li>`
          ).join('');
          answerSection = `
            <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-left: 3px solid #3b82f6;">
              <strong>Your Answers:</strong>
              <ul style="margin-top: 8px; margin-left: 20px;">${items}</ul>
            </div>
          `;
        } else if (response.multipleChoiceOptions && response.multipleChoiceOptions.length > 0) {
          answerSection = `
            <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-left: 3px solid #3b82f6;">
              <strong>Your Selection:</strong>
              <p style="margin-top: 8px;">${response.multipleChoiceOptions.join(', ')}</p>
            </div>
          `;
        } else if (response.beliefSystem && response.beliefSystem.length > 0) {
          const beliefs = response.beliefSystem.map(b => 
            `<li style="margin-bottom: 4px;">${b.belief}: ${b.percentage}%</li>`
          ).join('');
          answerSection = `
            <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-left: 3px solid #3b82f6;">
              <strong>Your Belief System:</strong>
              <ul style="margin-top: 8px; margin-left: 20px;">${beliefs}</ul>
            </div>
          `;
        } else if (response.successFactors && response.successFactors.length > 0) {
          const factors = response.successFactors.map(f => 
            `<li style="margin-bottom: 4px;">${f.factor}: ${f.percentage}%</li>`
          ).join('');
          answerSection = `
            <div style="margin-top: 12px; padding: 12px; background: #f5f5f5; border-left: 3px solid #3b82f6;">
              <strong>Your Success Factors:</strong>
              <ul style="margin-top: 8px; margin-left: 20px;">${factors}</ul>
            </div>
          `;
        }
      } else if (!includeAnswers) {
        // Blank space for writing
        answerSection = `
          <div style="margin-top: 16px; border-bottom: 1px solid #ccc; min-height: 80px;">
            <p style="color: #999; font-size: 14px; margin-bottom: 8px;">Your answer:</p>
          </div>
        `;
      }

      return `
        <div style="margin-bottom: 32px; page-break-inside: avoid;">
          <div style="display: flex; align-items: start; gap: 12px;">
            <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">
              ${questionNum}
            </div>
            <div style="flex: 1;">
              <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #1f2937;">
                ${q.text}
              </h3>
              ${answerSection}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Destiny Discovered - ${includeAnswers ? 'My Responses' : 'Blank Questionnaire'}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20mm; }
              .no-print { display: none !important; }
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 8px;
              color: #1f2937;
            }
            .subtitle {
              font-size: 18px;
              color: #6b7280;
              margin-bottom: 32px;
            }
            .intro {
              background: #eff6ff;
              border-left: 4px solid #3b82f6;
              padding: 16px;
              margin-bottom: 32px;
              border-radius: 4px;
            }
            .intro p {
              margin: 8px 0;
              color: #1e40af;
            }
            @page {
              margin: 20mm;
            }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 40px;">
            <h1>Destiny Discovered</h1>
            <p class="subtitle">${includeAnswers ? 'Your North Star Insights' : 'Blank Questionnaire for Reflection'}</p>
            <p style="color: #6b7280; font-size: 14px;">Printed on ${new Date().toLocaleDateString()}</p>
          </div>

          ${!includeAnswers ? `
            <div class="intro">
              <p><strong>💡 Take Your Time with These Questions</strong></p>
              <p>Deep reflection can't be rushed. Print this questionnaire and give yourself space to think, write, and revise your answers over several days. Many people find it helpful to step away from the screen and contemplate these questions with pen and paper.</p>
              <p><strong>Tip:</strong> Come back to your answers after a few days. Your perspective may shift, and that's perfectly okay.</p>
            </div>
          ` : ''}

          <div>
            ${questionsHTML}
          </div>

          <div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
            <p>© 2026 Destiny Discovered • A tool for personal growth and self-discovery</p>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Print Questionnaire</DialogTitle>
          <DialogDescription>
            Choose what you'd like to print for offline reflection and soak time.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              💡 <strong>Why print?</strong> Deep reflection works better away from screens. 
              Print these questions and give yourself time to think, write, and revise over several days.
            </p>
          </div>
          
          <Button
            onClick={() => handlePrint(false)}
            variant="outline"
            className="w-full justify-start h-auto py-4"
          >
            <div className="text-left">
              <div className="font-semibold mb-1">Print Blank Questionnaire</div>
              <div className="text-sm text-muted-foreground">
                All 30 questions with empty spaces for your handwritten answers
              </div>
            </div>
          </Button>

          {userResponses && userResponses.length > 0 && (
            <Button
              onClick={() => handlePrint(true)}
              variant="outline"
              className="w-full justify-start h-auto py-4"
            >
              <div className="text-left">
                <div className="font-semibold mb-1">Print My Current Answers</div>
                <div className="text-sm text-muted-foreground">
                  Questions with your responses to date ({userResponses.length} answered)
                </div>
              </div>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
