import { NextRequest, NextResponse } from 'next/server';
import { authManager } from '../../../lib/auth';
import { authenticateUser } from '../../../lib/server-auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const { accessToken, refreshToken } = await request.json();

		if (!accessToken) {
			return NextResponse.json(
				{ error: 'Access token is required' },
				{ status: 400 }
			);
		}

		// Authenticate user with Whop using server-side function
		const user = await authenticateUser(accessToken);

		// Create session
		const session = {
			user: {
				id: user.userId,
				username: user.username,
				created_at: new Date(user.createdAt).toISOString(),
				updated_at: new Date(user.updatedAt).toISOString()
			},
			accessToken,
			refreshToken: refreshToken || '',
			expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
		};

		authManager.setSession(session);

		return NextResponse.json({
			success: true,
			user: {
				id: user.userId,
				username: user.username,
				role: user.role,
				points: user.points,
				badge: user.badge
			}
		});
	} catch (error) {
		console.error('Authentication error:', error);
		return NextResponse.json(
			{ error: 'Authentication failed' },
			{ status: 401 }
		);
	}
}

export async function DELETE(): Promise<NextResponse> {
	try {
		authManager.clearSession();
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json(
			{ error: 'Logout failed' },
			{ status: 500 }
		);
	}
}
