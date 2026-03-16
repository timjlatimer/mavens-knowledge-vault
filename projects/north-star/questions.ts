 * Destiny Discovered - 30 Question Definitions
 * Organized by category with response type specifications
 */

export type QuestionCategory = 
  | "Core Values"
  | "Self-Awareness"
  | "Worldview"
  | "Purpose & Legacy"
  | "Success Philosophy"
  | "Action & Impact"
  | "Absolutes & Beliefs"
  | "Relationships"
  | "Resource Perspective";

export type ResponseType = "text" | "list" | "multiple_choice" | "structured";

export interface QuestionDef {
  number: number;
  text: string;
  category: QuestionCategory;
  responseType: ResponseType;
  expectedItemCount?: number;
  options?: string[];
  helpText?: string;
}

export const QUESTIONS: QuestionDef[] = [
  // Core Values (1, 2, 8)