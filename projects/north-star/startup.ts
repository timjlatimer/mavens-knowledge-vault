/**
 * Startup initialization tasks
 * Run once when server starts
 */

import { initializePredefinedTags } from "./routers";
import { startReminderService } from "./reminderService";
import { startWeeklyDigestService } from "./weeklyDigestService";

export async function runStartupTasks() {
  console.log("[Startup] Running initialization tasks...");
  
  try {
    // Initialize predefined tags
    await initializePredefinedTags();
    console.log("[Startup] ✓ Predefined tags initialized");
  } catch (error) {
    console.error("[Startup] Error initializing tags:", error);
  }
  
  // Start reminder service
  startReminderService();
  console.log("[Startup] ✓ Reminder service started");
  
  // Start weekly digest service
  startWeeklyDigestService();
  console.log("[Startup] ✓ Weekly digest service started");
  
  console.log("[Startup] Initialization complete");
}
