CREATE TABLE `answer_grades` (
	`id` int AUTO_INCREMENT NOT NULL,
	`surveyResponseId` int NOT NULL,
	`userId` int NOT NULL,
	`grade` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `answer_grades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `judge_eligibility` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`submissionId` int NOT NULL,
	`eligibleSince` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `judge_eligibility_id` PRIMARY KEY(`id`),
	CONSTRAINT `judge_eligibility_userId_unique` UNIQUE(`userId`)
);
