// server/email.ts
// Email notification helper for intake submissions
// Uses the Manus notifyOwner system for reliable delivery

import { notifyOwner } from "./_core/notification";

export interface IntakeEmailData {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  contactPreference: string | null;
  story: string | null;
  source: string;
}

export async function sendIntakeEmail(data: IntakeEmailData): Promise<boolean> {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ") || "Unknown";

  const content = `
📋 NEW MAVEN INTAKE

👤 Name: ${name}
📱 Phone: ${data.phone || "Not provided"}
📧 Email: ${data.email || "Not provided"}
💬 Preferred Contact: ${data.contactPreference || "Any"}
🔗 Source: ${data.source === "voice" ? "Voice Chat" : "Text Chat"}

📝 Their Story:
${data.story || "Not shared yet"}

---
This intake was collected by Grace, Maven's AI Assistant.
Please follow up within 24 hours.
  `.trim();

  try {
    const success = await notifyOwner({
      title: `🆕 New Maven Intake: ${name}`,
      content,
    });
    return success;
  } catch (error) {
    console.error("Failed to send intake notification:", error);
    return false;
  }
}
