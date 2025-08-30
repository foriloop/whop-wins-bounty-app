'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppUser } from '../../lib/types';
import { authManager, AuthSession } from '../../lib/auth';

interface AuthContextType {
	user: AppUser | null;
	session: AuthSession | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (accessToken: string, refreshToken?: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
	enableDevMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AppUser | null>(null);
	const [session, setSession] = useState<AuthSession | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check for existing session on mount
		const existingSession = authManager.getSession();
		if (existingSession && authManager.isAuthenticated()) {
			setSession(existingSession);
			refreshUser();
		} else {
			setIsLoading(false);
		}
	}, []);

	const refreshUser = async () => {
		if (!session) return;

		try {
			const userData = await authManager.getUserById(session.user.id);
			if (userData) {
				setUser(userData);
			}
		} catch (error) {
			console.error('Error refreshing user:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (accessToken: string, refreshToken?: string) => {
		try {
			setIsLoading(true);

			// Authenticate with our backend
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ accessToken, refreshToken }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Authentication failed');
			}

			const data = await response.json();
			
			// Get the session from auth manager
			const currentSession = authManager.getSession();
			if (currentSession) {
				setSession(currentSession);
				setUser(data.user);
			}
		} catch (error) {
			console.error('Login error:', error);
			// Clear any invalid session
			authManager.clearSession();
			setUser(null);
			setSession(null);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			// Call logout endpoint
			await fetch('/api/auth', { method: 'DELETE' });
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			// Clear local state
			setUser(null);
			setSession(null);
			authManager.clearSession();
		}
	};

	const enableDevMode = () => {
		// Create a mock user for development
		const mockUser: AppUser = {
			userId: 'dev-user-123',
			username: 'DevUser',
			role: 'member',
			points: 150,
			badge: 'Builder',
			createdAt: Date.now(),
			updatedAt: Date.now()
		};

		const mockSession: AuthSession = {
			user: {
				id: mockUser.userId,
				username: mockUser.username,
				created_at: new Date(mockUser.createdAt).toISOString(),
				updated_at: new Date(mockUser.updatedAt).toISOString()
			},
			accessToken: 'dev-token',
			refreshToken: 'dev-refresh-token',
			expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
		};

		setUser(mockUser);
		setSession(mockSession);
		authManager.setSession(mockSession);
		setIsLoading(false);
	};

	const value: AuthContextType = {
		user,
		session,
		isAuthenticated: !!user && !!session,
		isLoading,
		login,
		logout,
		refreshUser,
		enableDevMode,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
