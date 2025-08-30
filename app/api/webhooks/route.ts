import { waitUntil } from "@vercel/functions";
import { makeWebhookValidator } from "@whop/api";
import type { NextRequest } from "next/server";
import { authManager } from "../../../lib/auth";
import { db } from "../../../lib/firebase";
import { doc, updateDoc, increment, setDoc } from "firebase/firestore";

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

		// Handle the webhook data based on its structure
		await handleWebhookData(webhookData);

		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Webhook error:", error);
		return new Response("Webhook processing failed", { status: 500 });
	}
}

async function handleWebhookData(webhookData: any) {
	// Log the webhook data for debugging
	console.log("Webhook data received:", JSON.stringify(webhookData, null, 2));

	// Handle different types of webhook data
	if (webhookData.event) {
		// Handle event-based webhooks
		const { event, data } = webhookData;
		
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
	} else if (webhookData.type) {
		// Handle type-based webhooks
		const { type, data } = webhookData;
		
		switch (type) {
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
				console.log(`Unhandled webhook type: ${type}`);
		}
	} else {
		// Handle direct data webhooks
		console.log("Processing direct webhook data:", webhookData);
		
		if (webhookData.user) {
			await handleUserUpdated(webhookData);
		} else if (webhookData.user_id) {
			await handlePaymentSucceeded(webhookData);
		}
	}
}

async function handleUserCreated(data: any) {
	try {
		const { user } = data;
		
		if (!user || !user.id) {
			console.error("Invalid user data in webhook:", data);
			return;
		}
		
		// Create user in our database
		const userRef = doc(db, 'users', user.id);
		await setDoc(userRef, {
			userId: user.id,
			username: user.username || `User${user.id.slice(-4)}`,
			role: 'member',
			points: 0,
			badge: 'Initiate',
			createdAt: Date.now(),
			updatedAt: Date.now()
		});
		
		console.log(`User created: ${user.id}`);
	} catch (error) {
		console.error("Error handling user created:", error);
	}
}

async function handleUserUpdated(data: any) {
	try {
		const { user } = data;
		
		if (!user || !user.id) {
			console.error("Invalid user data in webhook:", data);
			return;
		}
		
		// Update user in our database
		const userRef = doc(db, 'users', user.id);
		await updateDoc(userRef, {
			username: user.username || `User${user.id.slice(-4)}`,
			updatedAt: Date.now()
		});
		
		console.log(`User updated: ${user.id}`);
	} catch (error) {
		console.error("Error handling user updated:", error);
	}
}

async function handleUserDeleted(data: any) {
	try {
		const { user } = data;
		
		if (!user || !user.id) {
			console.error("Invalid user data in webhook:", data);
			return;
		}
		
		// Mark user as deleted in our database
		const userRef = doc(db, 'users', user.id);
		await updateDoc(userRef, {
			status: 'deleted',
			updatedAt: Date.now()
		});
		
		console.log(`User deleted: ${user.id}`);
	} catch (error) {
		console.error("Error handling user deleted:", error);
	}
}

async function handlePaymentSucceeded(data: any) {
	try {
		const { user_id, final_amount, currency } = data;
		
		if (!user_id || !final_amount) {
			console.error("Invalid payment data in webhook:", data);
			return;
		}
		
		// Award points based on payment amount
		const pointsToAward = Math.floor(final_amount * 10); // 10 points per dollar
		
		// Update user points
		const userRef = doc(db, 'users', user_id);
		await updateDoc(userRef, {
			points: increment(pointsToAward),
			updatedAt: Date.now()
		});
		
		console.log(`Payment processed: ${user_id} received ${pointsToAward} points`);
	} catch (error) {
		console.error("Error handling payment succeeded:", error);
	}
}
