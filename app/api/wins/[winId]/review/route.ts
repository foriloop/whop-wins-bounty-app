import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/firebase";
import { doc, updateDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ winId: string }> }
) {
	try {
		const { winId } = await params;
		const { action } = await request.json();

		if (!action || !['approve', 'reject'].includes(action)) {
			return NextResponse.json(
				{ error: "Invalid action. Must be 'approve' or 'reject'" },
				{ status: 400 }
			);
		}

		// Get the win document
		const winRef = doc(db, "wins", winId);
		const winSnap = await getDoc(winRef);

		if (!winSnap.exists()) {
			return NextResponse.json(
				{ error: "Win not found" },
				{ status: 404 }
			);
		}

		const winData = winSnap.data();

		// Update win status
		await updateDoc(winRef, {
			status: action,
			reviewedAt: serverTimestamp(),
			reviewedBy: "creator_demo", // TODO: Replace with actual Whop creator ID
		});

		if (action === 'approve') {
			// Process payout and update user stats
			await processApproval(winData);
		} else {
			// Send rejection notification
			await sendRejectionNotification(winData);
		}

		return NextResponse.json({ success: true, action });

	} catch (error) {
		console.error("Error reviewing win:", error);
		return NextResponse.json(
			{ error: "Failed to review win" },
			{ status: 500 }
		);
	}
}

async function processApproval(winData: any) {
	try {
		// TODO: Integrate with Whop payout API or Stripe/PayPal
		// For now, we'll just log the payout
		console.log(`Processing payout for win: ${winData.title}`);

		// Create payout record
		await addDoc(collection(db, "payouts"), {
			winId: winData.id,
			userId: winData.userId,
			username: winData.username,
			amount: winData.rewardUsd || 0,
			points: winData.rewardPoints || 10,
			status: 'pending',
			createdAt: serverTimestamp(),
		});

		// Update user stats (points, badge tier, etc.)
		await updateUserStats(winData.userId, winData.rewardPoints || 10);

	} catch (error) {
		console.error("Error processing approval:", error);
	}
}

async function sendRejectionNotification(winData: any) {
	try {
		// TODO: Integrate with notification system
		// For now, we'll just log the rejection
		console.log(`Sending rejection notification for win: ${winData.title}`);

		// Create notification record
		await addDoc(collection(db, "notifications"), {
			userId: winData.userId,
			username: winData.username,
			type: 'win_rejected',
			title: 'Win Submission Rejected',
			message: `Your submission "${winData.title}" was not approved.`,
			read: false,
			createdAt: serverTimestamp(),
		});

	} catch (error) {
		console.error("Error sending rejection notification:", error);
	}
}

async function updateUserStats(userId: string, points: number) {
	try {
		// Get or create user document
		const userRef = doc(db, "users", userId);
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			const userData = userSnap.data();
			const newTotalPoints = (userData.totalPoints || 0) + points;
			const newBadgeTier = calculateBadgeTier(newTotalPoints);

			await updateDoc(userRef, {
				totalPoints: newTotalPoints,
				badgeTier: newBadgeTier,
				lastUpdated: serverTimestamp(),
			});
		} else {
			// Create new user document
			await addDoc(collection(db, "users"), {
				id: userId,
				totalPoints: points,
				badgeTier: calculateBadgeTier(points),
				createdAt: serverTimestamp(),
				lastUpdated: serverTimestamp(),
			});
		}
	} catch (error) {
		console.error("Error updating user stats:", error);
	}
}

function calculateBadgeTier(totalPoints: number): string {
	if (totalPoints >= 1000) return 'Icon';
	if (totalPoints >= 500) return 'Architect';
	if (totalPoints >= 250) return 'Operator';
	if (totalPoints >= 100) return 'Builder';
	return 'Initiate';
}
