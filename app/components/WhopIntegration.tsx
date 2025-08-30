'use client';

import { useEffect, useState } from 'react';
import { useIframeSdk } from '@whop/react';
import { useAuth } from '../contexts/AuthContext';

export function WhopIntegration() {
	const { user, isAuthenticated, isLoading, enableDevMode, login, logout } = useAuth();
	const iframeSdk = useIframeSdk();
	const [isInitializing, setIsInitializing] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [debugInfo, setDebugInfo] = useState<string>('');

	useEffect(() => {
		handleWhopAuthentication();
	}, []);

	const handleWhopAuthentication = async () => {
		try {
			setIsInitializing(true);
			setError(null);
			
			// Debug information
			const urlParams = new URLSearchParams(window.location.search);
			const accessToken = urlParams.get('access_token') || urlParams.get('token');
			const isInIframe = window.self !== window.top;
			
			// Check if iframeSdk has user data (using any to bypass type issues for now)
			const sdkUser = (iframeSdk as any)?.user;
			
			setDebugInfo(`URL Token: ${accessToken ? 'Present' : 'None'}, In Iframe: ${isInIframe}, SDK User: ${sdkUser ? 'Present' : 'None'}`);
			
			console.log('Whop Integration Debug:', {
				accessToken: !!accessToken,
				isInIframe,
				iframeSdkUser: !!sdkUser,
				user: !!user
			});

			// Check if we're in a Whop iframe with SDK
			if (iframeSdk && sdkUser && sdkUser.accessToken) {
				console.log('Using Whop iframe SDK authentication');
				if (!user) {
					await login(sdkUser.accessToken);
				}
			} 
			// Check for URL parameters (fallback)
			else if (accessToken && !user) {
				console.log('Using URL parameter authentication');
				await login(accessToken);
			} 
			// Check if we're in Whop environment but no token (development/testing)
			else if (isInIframe && !user) {
				console.log('In Whop iframe but no token - allowing development mode');
				// Instead of showing an error, allow development mode
				setError('Whop SDK not initialized. You can enable development mode to test the app.');
			}
			// Clear session if not in Whop and user exists
			else if (!isInIframe && !accessToken && user) {
				console.log('Not in Whop environment, clearing session');
				await logout();
			}
		} catch (error) {
			console.error('Error handling Whop authentication:', error);
			setError(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsInitializing(false);
		}
	};

	// Show loading state while initializing
	if (isInitializing) {
		return (
			<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
				<div className="bg-card p-6 rounded-lg shadow-lg border border-border">
					<div className="flex items-center space-x-3">
						<div className="w-6 h-6 border-2 border-[#1754d8] border-t-transparent rounded-full animate-spin"></div>
						<span className="text-foreground">Connecting to Whop...</span>
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
							<button
								onClick={enableDevMode}
								className="bg-[#1754d8] text-white px-4 py-2 rounded-lg hover:bg-[#1754d8]/90 transition-colors w-full"
							>
								Enable Development Mode
							</button>
							<button
								onClick={() => handleWhopAuthentication()}
								className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full"
							>
								Retry Connection
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
