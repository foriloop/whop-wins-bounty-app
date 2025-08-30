import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { AppUser } from './types';

export interface WhopUser {
	id: string;
	username?: string;
	email?: string;
	profile_pic_url?: string;
	created_at: string;
	updated_at: string;
}

export interface AuthSession {
	user: WhopUser;
	accessToken: string;
	refreshToken: string;
	expiresAt: number;
}

export class AuthManager {
	private static instance: AuthManager;
	private currentSession: AuthSession | null = null;

	private constructor() {}

	static getInstance(): AuthManager {
		if (!AuthManager.instance) {
			AuthManager.instance = new AuthManager();
		}
		return AuthManager.instance;
	}

	async getUserById(userId: string): Promise<AppUser | null> {
		try {
			const userRef = doc(db, 'users', userId);
			const userSnap = await getDoc(userRef);
			
			if (userSnap.exists()) {
				return userSnap.data() as AppUser;
			}
			return null;
		} catch (error) {
			console.error('Error fetching user:', error);
			return null;
		}
	}

	async updateUserPoints(userId: string, points: number): Promise<void> {
		try {
			const userRef = doc(db, 'users', userId);
			await updateDoc(userRef, {
				points: points,
				updatedAt: Date.now()
			});
		} catch (error) {
			console.error('Error updating user points:', error);
			throw error;
		}
	}

	async updateUserBadge(userId: string, badge: string): Promise<void> {
		try {
			const userRef = doc(db, 'users', userId);
			await updateDoc(userRef, {
				badge: badge,
				updatedAt: Date.now()
			});
		} catch (error) {
			console.error('Error updating user badge:', error);
			throw error;
		}
	}

	setSession(session: AuthSession): void {
		this.currentSession = session;
		// Store in localStorage for client-side access
		if (typeof window !== 'undefined') {
			localStorage.setItem('whop_session', JSON.stringify(session));
		}
	}

	getSession(): AuthSession | null {
		if (this.currentSession) {
			return this.currentSession;
		}
		
		// Try to get from localStorage
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('whop_session');
			if (stored) {
				try {
					this.currentSession = JSON.parse(stored);
					return this.currentSession;
				} catch (error) {
					console.error('Error parsing stored session:', error);
				}
			}
		}
		
		return null;
	}

	clearSession(): void {
		this.currentSession = null;
		if (typeof window !== 'undefined') {
			localStorage.removeItem('whop_session');
		}
	}

	isAuthenticated(): boolean {
		const session = this.getSession();
		if (!session) return false;
		
		// Check if token is expired
		return Date.now() < session.expiresAt;
	}
}

export const authManager = AuthManager.getInstance();
