'use client';

import { useEffect, useState, useCallback } from 'react';
import { useIframeSdk } from '@whop/react';
import { useAuth } from '../contexts/AuthContext';

export function WhopIntegration() {
	const { user, isAuthenticated, isLoading, enableDevMode, login, logout } = useAuth();
	const iframeSdk = useIframeSdk();
	const [isInitializing, setIsInitializing] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [retryCount, setRetryCount] = useState(0);
	const [debugInfo, setDebugInfo] = useState<string>('');

	const MAX_RETRIES = 3;
	const RETRY_DELAY = 2000; // 2 seconds

	const handleWhopAuthentication = useCallback(async () => {
		try {
			setIsInitializing(true);
			setError(null);
			
			// Get authentication data
			const urlParams = new URLSearchParams(window.location.search);
			const accessToken = urlParams.get('access_token') || urlParams.get('token');
			const isInIframe = window.self !== window.top;
			
			// Get SDK user data with proper type checking
			const sdkUser = (iframeSdk as any)?.user;
			
			// Update debug information
			setDebugInfo(`URL Token: ${accessToken ? 'Present' : 'None'}, In Iframe: ${isInIframe}, SDK User: ${sdkUser ? 'Present' : 'None'}, Retry: ${retryCount}`);
			
			console.log('Whop Integration Debug:', {
				accessToken: !!accessToken,
				isInIframe,
				iframeSdkUser: !!sdkUser,
				user: !!user,
				retryCount
			});

			// Priority 1: Use Whop iframe SDK authentication (most reliable)
			if (iframeSdk && sdkUser && sdkUser.accessToken) {
				console.log('Using Whop iframe SDK authentication');
				if (!user) {
					await login(sdkUser.accessToken);
				}
				return;
			}
			
			// Priority 2: Use URL parameter authentication (fallback)
			if (accessToken && !user) {
				console.log('Using URL parameter authentication');
				await login(accessToken);
				return;
			}
			
			// Priority 3: Handle development/testing scenarios
			if (isInIframe && !user) {
				console.log('In Whop iframe but no token - development mode available');
				setError('Whop SDK not initialized. You can enable development mode to test the app.');
				return;
			}
			
			// Priority 4: Clear session if not in Whop environment
			if (!isInIframe && !accessToken && user) {
				console.log('Not in Whop environment, clearing session');
				await logout();
				return;
			}
			
			// If we reach here, authentication is successful or not needed
			console.log('Authentication flow completed successfully');
			
		} catch (error) {
			console.error('Error handling Whop authentication:', error);
			
			// Handle specific error types
			let errorMessage = 'Authentication failed';
			if (error instanceof Error) {
				if (error.message.includes('Invalid or expired access token')) {
					errorMessage = 'Your session has expired. Please refresh the page.';
				} else if (error.message.includes('Access denied')) {
					errorMessage = 'Access denied. Please check your Whop membership.';
				} else if (error.message.includes('User not found')) {
					errorMessage = 'User account not found. Please contact support.';
				} else if (error.message.includes('service temporarily unavailable')) {
					errorMessage = 'Whop service is temporarily unavailable. Please try again.';
				} else {
					errorMessage = `Authentication failed: ${error.message}`;
				}
			}
			
			setError(errorMessage);
		} finally {
			setIsInitializing(false);
		}
	}, [iframeSdk, user, login, logout, retryCount]);

	const handleRetry = useCallback(async () => {
		if (retryCount < MAX_RETRIES) {
			setRetryCount(prev => prev + 1);
			await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
			await handleWhopAuthentication();
		} else {
			setError('Maximum retry attempts reached. Please refresh the page or contact support.');
		}
	}, [retryCount, handleWhopAuthentication]);

	useEffect(() => {
		handleWhopAuthentication();
	}, [handleWhopAuthentication]);

	// Show loading state while initializing
	if (isInitializing) {
		return (
			<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
				<div className="bg-card p-6 rounded-lg shadow-lg border border-border">
					<div className="flex items-center space-x-3">
						<div className="w-6 h-6 border-2 border-[#1754d8] border-t-transparent rounded-full animate-spin"></div>
						<span className="text-foreground">
							{retryCount > 0 ? `Connecting to Whop... (Attempt ${retryCount + 1})` : 'Connecting to Whop...'}
						</span>
					</div>
					{debugInfo && (
						<div className="mt-2 text-xs text-foreground/60">
							Debug: {debugInfo}
						</div>
					)}
				</div>
			</div>
		);
	}

	// Show error state if authentication failed
	if (error) {
		return (
			<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
				<div className="bg-card p-6 rounded-lg shadow-lg border border-border max-w-md">
					<div className="text-center">
						<div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-2">Whop Integration Issue</h3>
						<p className="text-foreground/70 mb-4">{error}</p>
						<div className="space-y-2">
							{retryCount < MAX_RETRIES && (
								<button
									onClick={handleRetry}
									className="bg-[#1754d8] text-white px-4 py-2 rounded-lg hover:bg-[#1754d8]/90 transition-colors w-full"
								>
									Retry Connection ({MAX_RETRIES - retryCount} attempts left)
								</button>
							)}
							<button
								onClick={enableDevMode}
								className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full"
							>
								Enable Development Mode
							</button>
							<button
								onClick={() => window.location.reload()}
								className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors w-full"
							>
								Refresh Page
							</button>
						</div>
						{debugInfo && (
							<div className="mt-4 text-xs text-foreground/60 bg-gray-100 p-2 rounded">
								Debug: {debugInfo}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}

	// This component doesn't render anything visible, it just handles the integration
	return null;
}
