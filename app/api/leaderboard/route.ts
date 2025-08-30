import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { LeaderboardEntry } from '../../../lib/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const { searchParams } = new URL(request.url);
		const limitCount = parseInt(searchParams.get('limit') || '100');

		// Query users ordered by points (descending)
		const q = query(
			collection(db, 'users'),
			orderBy('points', 'desc'),
			limit(limitCount)
		);

		const querySnapshot = await getDocs(q);
		const leaderboard: LeaderboardEntry[] = [];

		querySnapshot.forEach((doc) => {
			const userData = doc.data();
			leaderboard.push({
				userId: doc.id,
				username: userData.username,
				approvedWins: userData.approvedWins || 0,
				points: userData.points || 0,
				badge: userData.badge || 'Initiate'
			});
		});

		return NextResponse.json({ leaderboard });
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch leaderboard' },
			{ status: 500 }
		);
	}
}
