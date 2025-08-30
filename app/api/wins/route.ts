import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { WinSubmission } from '../../../lib/types';
import { authManager } from '../../../lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const { title, description, category, proof, difficulty, timeframe, tags } = await request.json();

		// Get user from session
		const session = authManager.getSession();
		if (!session) {
			return NextResponse.json(
				{ error: 'Authentication required' },
				{ status: 401 }
			);
		}

		// Validate required fields
		if (!title || !description || !category || !proof) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Create win submission
		const winSubmission: Omit<WinSubmission, 'id'> = {
			userId: session.user.id,
			username: session.user.username,
			title,
			description,
			category,
			status: 'pending',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		// Add to database
		const docRef = await addDoc(collection(db, 'wins'), winSubmission);

		return NextResponse.json({
			success: true,
			id: docRef.id,
			...winSubmission
		});
	} catch (error) {
		console.error('Error submitting win:', error);
		return NextResponse.json(
			{ error: 'Failed to submit win' },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get('status');
		const limitCount = parseInt(searchParams.get('limit') || '50');

		let q = query(collection(db, 'wins'), orderBy('createdAt', 'desc'), limit(limitCount));
		
		if (status) {
			q = query(q, where('status', '==', status));
		}

		const querySnapshot = await getDocs(q);
		const wins: WinSubmission[] = [];

		querySnapshot.forEach((doc) => {
			wins.push({
				id: doc.id,
				...doc.data()
			} as WinSubmission);
		});

		return NextResponse.json({ wins });
	} catch (error) {
		console.error('Error fetching wins:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch wins' },
			{ status: 500 }
		);
	}
}



