export type UserRole = "creator" | "member";

export type BadgeTier = "Initiate" | "Builder" | "Operator" | "Architect" | "Icon";

export interface AppUser {
	userId: string;
	username?: string;
	role: UserRole;
	points: number;
	badge: BadgeTier;
	createdAt: number;
	updatedAt: number;
}

export interface WinSubmission {
	id: string;
	userId: string;
	username?: string;
	title: string;
	description: string;
	category: string;
	// We are not storing files; external embeds only
	externalUrl?: string;
	mediaType?: "image" | "video" | "link";
	status: "pending" | "approved" | "rejected";
	createdAt: number;
	updatedAt: number;
}

export interface LeaderboardEntry {
	userId: string;
	username?: string;
	approvedWins: number;
	points: number;
	badge: BadgeTier;
}

export interface Bounty {
	id: string;
	title: string;
	description: string;
	category?: string;
	rewardUsd?: number;
	rewardPoints: number;
	status: "active" | "archived";
	createdByUserId: string;
	createdAt: number;
	updatedAt: number;
}



