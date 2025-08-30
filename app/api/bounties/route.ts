import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { Bounty } from '../../../lib/types';
import { authManager } from '../../../lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const { title, description, category, rewardUsd, rewardPoints } = await request.json();

		// Get user from session
		const session = authManager.getSession();
		if (!session) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Validate required fields
		if (!title || !description || !rewardPoints) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Create bounty
		const bounty: Omit<Bounty, 'id'> = {
			title,
			description,
			category: category || 'General',
			rewardUsd: rewardUsd || 0,
			rewardPoints,
			status: 'active',
			createdByUserId: session.user.id,
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		// Add to database
		const docRef = await addDoc(collection(db, 'bounties'), bounty);

		return NextResponse.json({
			success: true,
			id: docRef.id,
			...bounty
		});
	} catch (error) {
		console.error('Error creating bounty:', error);
		return NextResponse.json(
			{ error: 'Failed to create bounty' },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get('status') || 'active';
		const limitCount = parseInt(searchParams.get('limit') || '50');

		// Query bounties by status
		const q = query(
			collection(db, 'bounties'),
			where('status', '==', status),
			orderBy('createdAt', 'desc'),
			limit(limitCount)
		);

		const querySnapshot = await getDocs(q);
		const bounties: Bounty[] = [];

		querySnapshot.forEach((doc) => {
			bounties.push({
				id: doc.id,
				...doc.data()
			} as Bounty);
		});

		return NextResponse.json({ bounties });
	} catch (error) {
		console.error('Error fetching bounties:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch bounties' },
			{ status: 500 }
		);
	}
}


