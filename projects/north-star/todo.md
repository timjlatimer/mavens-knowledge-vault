# Destiny Discovered App - TODO

## Database & Schema
- [x] Create respondents table with user relationship
- [x] Create responses table for all question answers
- [x] Create list_responses table for multi-item answers
- [x] Create multiple_choice_responses table
- [x] Create belief_system_responses table
- [x] Create success_factors table
- [x] Create tags table with 34 predefined tags
- [x] Create response_tags junction table
- [x] Create question_definitions table

## Authentication & User Management
- [x] Extend user schema with role-based access (admin/user)
- [x] Implement protected routes for authenticated users
- [x] Implement admin-only routes and procedures

## Questionnaire Features
- [x] Multi-step form with 30 questions
- [x] Progress tracking indicator
- [x] Text input validation
- [x] List input handling (3-6 items)
- [x] Multiple choice selections
- [x] Structured belief system questions
- [x] Success factor percentage input (must total 100%)
- [x] Save draft functionality
- [x] Edit existing responses

## User Dashboard
- [x] View completed questionnaire responses
- [x] Edit answers capability
- [x] Response summary display
- [x] Personal insights section

## Admin Dashboard
- [x] Analytics overview with key metrics
- [x] Tag frequency visualization
- [x] Success factor averages chart
- [x] Belief distribution chart
- [x] Common values analysis
- [x] Respondent list with search
- [ ] Respondent list with filtering by tags
- [x] Individual respondent profile pages
- [x] Response detail view with applied tags
- [ ] CSV export functionality

## Automated Tagging System
- [x] Define 34 predefined tags across 5 categories
- [x] Implement automated tag application logic
- [x] Tag confidence scoring
- [ ] Manual tag override capability (admin)

## Public Landing Page
- [x] High-impact hero section
- [x] Explanation of Destiny Discovered purpose
- [x] Large, prominent CTA button
- [x] Benefits/features overview
- [ ] Testimonials or sample insights
- [x] Public questionnaire access

## UI/UX Features
- [ ] Text size adjustment controls
- [x] Responsive design for mobile/tablet
- [x] Loading states and skeletons
- [x] Error handling and validation messages
- [x] Success confirmations
- [x] Empty states

## Testing & Quality
- [x] Write vitest tests for core procedures
- [x] Test questionnaire submission flow
- [x] Test admin analytics calculations
- [x] Test tagging automation
- [ ] Cross-browser testing

## Deployment
- [ ] Final checkpoint creation
- [ ] Production deployment
- [ ] User documentation

## Email Notifications Feature
- [x] Set up Gmail MCP integration
- [x] Design email template for North Star insights summary
- [x] Implement email sending logic on questionnaire completion
- [x] Include personalized tag summary in email
- [x] Include key insights by category (Values, Action, Worldview, Success, Purpose)
- [x] Test email delivery
- [x] Add error handling for email failures

## Save and Return Feature
- [x] Add "Save & Return Later" button on every question page
- [x] Show informational message about taking time to reflect
- [x] Create reminder scheduling UI component
- [x] Allow users to schedule email reminder (1 day, 3 days, 1 week, custom)
- [x] Store reminder preferences in database
- [x] Implement email reminder system using Gmail MCP
- [x] Track last saved question number for easy return
- [ ] Add "Continue where you left off" on dashboard
- [x] Send reminder email with direct link to resume questionnaire
- [x] Update questionnaire page with gentle messaging about reflection time

## Dashboard Continue Card
- [x] Add "Continue Where You Left Off" card to dashboard
- [x] Show last saved question number and title
- [x] Display progress percentage
- [x] Show upcoming scheduled reminders
- [x] Add quick-resume button that navigates to last question
- [x] Handle case when questionnaire is complete
- [x] Handle case when user hasn't started yet

## Pre-Publishing Improvements
- [x] Improve mobile responsiveness for list inputs
- [x] Improve mobile responsiveness for structured questions (belief system, success factors)
- [x] Add better touch targets for mobile devices
- [x] Implement auto-save after 2-3 seconds of inactivity
- [x] Add visual feedback when auto-save occurs
- [x] Create onboarding tour component
- [x] Add tour steps for "Take Your Time" message
- [x] Add tour step for "Save & Return Later" button
- [x] Add tour step for reminder scheduling feature
- [ ] Test all improvements on mobile and desktop

## Weekly Email Digest Feature
- [x] Create database table to track last digest sent date per user
- [x] Design weekly digest email template
- [x] Calculate user progress (questions answered, percentage complete)
- [x] Identify users who haven't completed questionnaire
- [x] Filter users who haven't received digest in past 7 days
- [x] Generate personalized progress summary for each user
- [x] Send digest emails via Gmail MCP
- [x] Create background service to run weekly digest job
- [x] Schedule service to run once per week
- [x] Add error handling and logging
- [x] Write vitest tests for digest functionality
- [x] Add admin view to see digest send history

## Routing Fix
- [x] Investigate why users are seeing questionnaire page instead of homepage
- [x] Fix routing to ensure homepage (/) is always the first page
- [x] Remove any automatic redirects to questionnaire
- [x] Test that homepage displays first for all users

## Print Functionality
- [x] Create print component with two options: blank questions and questions with answers
- [x] Design print-friendly layout (clean, readable, no navigation/UI elements)
- [x] Add prominent "Print" button to homepage
- [x] Add "Print" button to questionnaire page
- [x] Add "Print" button to dashboard
- [x] Include messaging about printing for offline soak time
- [x] Implement blank questionnaire print (all 30 questions, empty spaces for answers)
- [x] Implement filled questionnaire print (questions with user's current answers)
- [x] Add print dialog to choose between blank/filled options
- [x] Test print layouts in different browsers
- [x] Ensure proper page breaks for multi-page printing

## Gamified Progress Banner with Butterfly Stars
- [x] Generate vibrant globe image with butterfly-enhanced space background
- [x] Create North Star as brilliant cluster of glowing butterflies
- [x] Add subtle butterfly-star twinkles in background forming constellations
- [x] Create progress banner component with two-panel layout
- [x] Implement 30-segment clock face overlay on globe
- [x] Add visible tick marks dividing 30 segments
- [x] Implement progress coloring (vibrant for complete, desaturated for incomplete)
- [x] Add North Star butterfly cluster brightness scaling based on progress (70-100%)
- [x] Display "You Are Here" heading on right side
- [x] Show "X/30 Questions Complete" text indicator
- [x] Implement completion state (single unified image)
- [x] Add "Invite someone else to discover their North Star" link on completion
- [x] Make banner responsive for mobile/tablet
- [x] Integrate banner on Home page
- [x] Integrate banner on Questionnaire page
- [x] Integrate banner on Dashboard page
- [x] Ensure banner takes ~25% of viewport height

## Progress Banner Fixes (User Feedback)
- [x] Fix mobile visibility issue - banner not showing on phone
- [x] Correct color grading: Destination (left) should be vibrant/bright, "You Are Here" (right) should be desaturated/faded
- [x] Regenerate globe image with actual glowing star at center of butterfly cluster (not a butterfly)
- [x] Test banner visibility on mobile devices
- [x] Verify color grading works correctly at different progress levels

## Progress Banner Visual Refinement
- [x] Regenerate globe image combining classy golden butterfly cluster with bright yellow star at center
- [x] Use the elegant, professional style from first version (golden/cream butterflies)
- [x] Add bright yellow/golden star burst at center of butterfly cluster (from second reference image)
- [x] Maintain clean, professional aesthetic

## Simple Star Center Refinement
- [x] Regenerate using elegant golden/cream butterfly cluster style from reference screenshot
- [x] Add simple bright star at center (not dramatic star burst)
- [x] Keep the refined, classy aesthetic
