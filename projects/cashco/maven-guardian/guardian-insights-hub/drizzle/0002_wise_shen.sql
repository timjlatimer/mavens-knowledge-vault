CREATE TABLE `wisdom_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wisdom_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `wisdom_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `wisdom_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`slug` varchar(200) NOT NULL,
	`title` varchar(500) NOT NULL,
	`subtitle` varchar(500),
	`content` text NOT NULL,
	`scriptExample` text,
	`antiPattern` text,
	`source` varchar(255),
	`sourceType` enum('frontline','philosophy','external','anti-pattern') NOT NULL DEFAULT 'frontline',
	`tags` text,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wisdom_entries_id` PRIMARY KEY(`id`)
);
