import { waitUntil } from "@vercel/functions";
import { makeWebhookValidator } from "@whop/api";
import type { NextRequest } from "next/server";
import { authManager } from "../../../lib/auth";
import { db } from "../../../lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

const validateWebhook = makeWebhookValidator({
	webhookSecret: process.env.WHOP_WEBHOOK_SECRET ?? "",
});

export async function POST(request: NextRequest): Promise<Response> {
	try {
		// Validate the webhook
		const webhookData = await validateWebhook(request);
		
		if (!webhookData) {
			return new Response("Invalid webhook", { status: 400 });
		}

		const { event, data } = webhookData;

		// Handle different webhook events
		switch (event) {
			case "user.created":
				await handleUserCreated(data);
				break;
			case "user.updated":
				await handleUserUpdated(data);
				break;
			case "user.deleted":
				await handleUserDeleted(data);
				break;
			case "payment.succeeded":
				await handlePaymentSucceeded(data);
				break;
			default:
				console.log(`Unhandled webhook event: ${event}`);
		}

		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Webhook error:", error);
		return new Response("Webhook processing failed", { status: 500 });
	}
}

async function handleUserCreated(data: any) {
	const { user } = data;
	
	// Create user in our database
	const userRef = doc(db, 'users', user.id);
	await updateDoc(userRef, {
		userId: user.id,
		username: user.username,
		role: 'member',
		points: 0,
		badge: 'Initiate',
		createdAt: Date.now(),
		updatedAt: Date.now()
	});
}

async function handleUserUpdated(data: any) {
	const { user } = data;
	
	// Update user in our database
	const userRef = doc(db, 'users', user.id);
	await updateDoc(userRef, {
		username: user.username,
		updatedAt: Date.now()
	});
}

async function handleUserDeleted(data: any) {
	const { user } = data;
	
	// Mark user as deleted in our database
	const userRef = doc(db, 'users', user.id);
	await updateDoc(userRef, {
		status: 'deleted',
		updatedAt: Date.now()
	});
}

async function handlePaymentSucceeded(data: any) {
	const { user_id, final_amount, currency } = data;
	
	// Award points based on payment amount
	const pointsToAward = Math.floor(final_amount * 10); // 10 points per dollar
	
	// Update user points
	const userRef = doc(db, 'users', user_id);
	await updateDoc(userRef, {
		points: increment(pointsToAward),
		updatedAt: Date.now()
	});
}
