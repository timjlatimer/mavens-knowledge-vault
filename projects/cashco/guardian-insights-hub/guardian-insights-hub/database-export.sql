-- Maven Cashco Guardian Insights Hub - Database Export
-- Generated: January 29, 2026
-- This file contains the schema and seed data for the application

-- =====================================================
-- SCHEMA DEFINITIONS (from drizzle/schema.ts)
-- =====================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  notifyOnNewEntry BOOLEAN DEFAULT TRUE NOT NULL
);

-- Respondents table
CREATE TABLE IF NOT EXISTS respondents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  organization VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Survey responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  respondentId INT NOT NULL,
  questionNumber INT NOT NULL,
  questionText TEXT NOT NULL,
  answerText TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Themes table
CREATE TABLE IF NOT EXISTS themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  displayOrder INT DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Insights table
CREATE TABLE IF NOT EXISTS insights (
  id INT AUTO_INCREMENT PRIMARY KEY,
  themeId INT NOT NULL,
  respondentId INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  guardianBehavior TEXT,
  scriptIdea TEXT,
  upvotes INT DEFAULT 0 NOT NULL,
  downvotes INT DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  insightId INT NOT NULL,
  visitorId VARCHAR(64) NOT NULL,
  voteType ENUM('up', 'down') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  insightId INT NOT NULL,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Wisdom categories table
CREATE TABLE IF NOT EXISTS wisdom_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  displayOrder INT DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Wisdom entries table
CREATE TABLE IF NOT EXISTS wisdom_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoryId INT NOT NULL,
  slug VARCHAR(200) NOT NULL,
  title VARCHAR(500) NOT NULL,
  subtitle VARCHAR(500),
  content TEXT NOT NULL,
  scriptExample TEXT,
  antiPattern TEXT,
  source VARCHAR(255),
  sourceType ENUM('frontline', 'philosophy', 'external', 'anti-pattern') DEFAULT 'frontline' NOT NULL,
  tags TEXT,
  displayOrder INT DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Story submissions table
CREATE TABLE IF NOT EXISTS story_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submitterName VARCHAR(255) NOT NULL,
  submitterEmail VARCHAR(320),
  submitterTitle VARCHAR(255),
  submitterOrganization VARCHAR(255),
  userId INT,
  q1ToughestConversation TEXT,
  q2BuildingTrust TEXT,
  q3FirstInteraction TEXT,
  q4DenialConversation TEXT,
  q5CommunityResources TEXT,
  q6ClientWins TEXT,
  q7SecretWeapon TEXT,
  q8IdealBotFeatures TEXT,
  q9AdditionalThoughts TEXT,
  q10MemorableStory TEXT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
  reviewedBy INT,
  reviewedAt TIMESTAMP,
  reviewNotes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Answer grades table
CREATE TABLE IF NOT EXISTS answer_grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  surveyResponseId INT NOT NULL,
  userId INT NOT NULL,
  grade INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Judge eligibility table
CREATE TABLE IF NOT EXISTS judge_eligibility (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL UNIQUE,
  submissionId INT NOT NULL,
  eligibleSince TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- =====================================================
-- NOTE: Actual data should be exported from the live database
-- Use the Management UI Database panel to export current data
-- =====================================================
