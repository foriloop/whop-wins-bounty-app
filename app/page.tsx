'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { WinSubmission, LeaderboardEntry } from '../lib/types';

export default function HomePage() {
	const pathname = usePathname();
	const { user, isAuthenticated, isLoading, enableDevMode } = useAuth();
	const [stats, setStats] = useState({
		totalWins: 0,
		activeStreak: 0,
		experiences: 0,
		earnings: 0
	});
	const [recentWins, setRecentWins] = useState<WinSubmission[]>([]);
	const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
	const [isLoadingData, setIsLoadingData] = useState(true);
	const [showDevMode, setShowDevMode] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			fetchDashboardData();
		}
	}, [isAuthenticated]);

	// Check if we're in development mode (not in Whop iframe)
	useEffect(() => {
		const isInIframe = window.self !== window.top;
		if (!isInIframe && !isAuthenticated) {
			setShowDevMode(true);
		}
	}, [isAuthenticated]);

	const fetchDashboardData = async () => {
		try {
			setIsLoadingData(true);
			
			// Fetch recent wins
			const winsResponse = await fetch('/api/wins?limit=3');
			if (winsResponse.ok) {
				const winsData = await winsResponse.json();
				setRecentWins(winsData.wins || []);
			}

			// Fetch leaderboard for stats
			const leaderboardResponse = await fetch('/api/leaderboard?limit=100');
			if (leaderboardResponse.ok) {
				const leaderboardData = await leaderboardResponse.json();
				setLeaderboard(leaderboardData.leaderboard || []);
				
				// Calculate stats
				const totalWins = leaderboardData.leaderboard.reduce((sum: number, entry: LeaderboardEntry) => sum + entry.approvedWins, 0);
				const userRank = leaderboardData.leaderboard.findIndex((entry: LeaderboardEntry) => entry.userId === user?.userId) + 1;
				
				setStats({
					totalWins,
					activeStreak: user?.points || 0,
					experiences: userRank > 0 ? userRank : 0,
					earnings: Math.floor((user?.points || 0) * 0.1) // Convert points to estimated earnings
				});
			}
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
		} finally {
			setIsLoadingData(false);
		}
	};

	const navigation = [
		{ name: 'Dashboard', href: '/', icon: '🏠' },
		{ name: 'Submit Win', href: '/submit', icon: '🏆' },
		{ name: 'Wins Wall', href: '/wins', icon: '🎯' },
		{ name: 'Leaderboard', href: '/leaderboard', icon: '🏅' },
		{ name: 'Review', href: '/review', icon: '📝' },
		{ name: 'New Bounty', href: '/bounties/new', icon: '💰' },
	];

	const isActive = (href: string) => {
		if (href === '/') {
			return pathname === '/';
		}
		return pathname.startsWith(href);
	};

	const getIconColor = (category: string) => {
		const colors: { [key: string]: string } = {
			gaming: 'text-blue-600',
			fitness: 'text-green-600',
			business: 'text-purple-600',
			learning: 'text-yellow-600',
			creative: 'text-pink-600',
			social: 'text-indigo-600'
		};
		return colors[category] || 'text-gray-600';
	};

	const getBgColor = (category: string) => {
		const colors: { [key: string]: string } = {
			gaming: 'bg-blue-50',
			fitness: 'bg-green-50',
			business: 'bg-purple-50',
			learning: 'bg-yellow-50',
			creative: 'bg-pink-50',
			social: 'bg-indigo-50'
		};
		return colors[category] || 'bg-gray-50';
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1754d8] mx-auto"></div>
					<p className="mt-4 text-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-[#1754d8]/5 to-[#1754d8]/10"></div>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							Welcome to Whop
						</div>
						<h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
							Your Dashboard
						</h1>
						<p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
							{isAuthenticated 
								? `Welcome back, ${user?.username || 'User'}! Manage your experiences, track wins, and discover new opportunities.`
								: 'Manage your experiences, track wins, and discover new opportunities all in one place'
							}
						</p>
						
						{!isAuthenticated && (
							<div className="mt-8">
								<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
									<div className="text-center">
										<div className="w-16 h-16 bg-[#1754d8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<svg className="w-8 h-8 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-7 0v4h8z" />
											</svg>
										</div>
										<h3 className="text-lg font-semibold text-foreground mb-2">Authentication Required</h3>
										<p className="text-foreground/70 mb-4">
											This app is designed to work within Whop. Please access it through your Whop membership to continue.
										</p>
										
										{showDevMode && (
											<div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
												<h4 className="font-semibold text-yellow-800 mb-2">Development Mode</h4>
												<p className="text-yellow-700 text-sm mb-3">
													You're viewing this app outside of Whop. To test the full functionality:
												</p>
												<div className="space-y-2 text-sm text-yellow-700">
													<p>• Configure your Whop app with App Path: <code className="bg-yellow-100 px-1 rounded">/</code></p>
													<p>• Deploy to Vercel and update your Whop app settings</p>
													<p>• Access through your Whop company dashboard</p>
												</div>
												<button
													onClick={enableDevMode}
													className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
												>
													Enable Development Mode
												</button>
											</div>
										)}
										
										<div className="bg-[#1754d8] text-white px-6 py-3 rounded-xl text-lg font-medium inline-block mt-4">
											Please log in through Whop
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{isAuthenticated && (
				<>
					{/* Stats Overview */}
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
							<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
								<div className="flex items-center">
									<div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
										<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
										</svg>
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-foreground/70">Total Wins</p>
										<p className="text-2xl font-bold text-foreground">
											{isLoadingData ? '...' : stats.totalWins}
										</p>
									</div>
								</div>
							</div>

							<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
								<div className="flex items-center">
									<div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
										<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-foreground/70">Your Points</p>
										<p className="text-2xl font-bold text-foreground">
											{isLoadingData ? '...' : stats.activeStreak}
										</p>
									</div>
								</div>
							</div>

							<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
								<div className="flex items-center">
									<div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
										<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-foreground/70">Your Rank</p>
										<p className="text-2xl font-bold text-foreground">
											{isLoadingData ? '...' : stats.experiences > 0 ? `#${stats.experiences}` : 'Unranked'}
										</p>
									</div>
								</div>
							</div>

							<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
								<div className="flex items-center">
									<div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
										<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
										</svg>
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium text-foreground/70">Est. Earnings</p>
										<p className="text-2xl font-bold text-foreground">
											{isLoadingData ? '...' : `$${stats.earnings.toLocaleString()}`}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="mb-16">
							<h2 className="text-3xl font-bold text-foreground mb-8">Quick Actions</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<Link href="/submit" className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
									<div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
										<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">Submit a Win</h3>
									<p className="text-foreground/70 mb-4">Share your latest achievement and get rewarded for your success</p>
									<div className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium inline-block group-hover:bg-[#1754d8]/90 transition-colors">
										Submit Now
									</div>
								</Link>

								<Link href="/discover" className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
									<div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
										<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">Discover</h3>
									<p className="text-foreground/70 mb-4">Explore new experiences and challenges in your community</p>
									<div className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium inline-block group-hover:bg-[#1754d8]/90 transition-colors">
										Explore
									</div>
								</Link>

								<Link href="/leaderboard" className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
									<div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
										<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">Leaderboard</h3>
									<p className="text-foreground/70 mb-4">See where you rank among top performers</p>
									<div className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium inline-block group-hover:bg-[#1754d8]/90 transition-colors">
										View Rankings
									</div>
								</Link>
							</div>
						</div>

						{/* Recent Activity */}
						<div>
							<h2 className="text-3xl font-bold text-foreground mb-8">Recent Activity</h2>
							<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm">
								<div className="px-6 py-4 border-b border-border/50">
									<h3 className="text-lg font-semibold text-foreground">Latest Wins</h3>
								</div>
								<div className="divide-y divide-border/50">
									{isLoadingData ? (
										<div className="px-6 py-8 text-center">
											<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1754d8] mx-auto"></div>
											<p className="mt-2 text-foreground/70">Loading recent wins...</p>
										</div>
									) : recentWins.length > 0 ? (
										recentWins.map((win) => (
											<div key={win.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
												<div className="flex items-center">
													<div className={`w-10 h-10 ${getBgColor(win.category)} rounded-full flex items-center justify-center`}>
														<svg className={`w-5 h-5 ${getIconColor(win.category)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
														</svg>
													</div>
													<div className="ml-4">
														<h4 className="text-sm font-medium text-foreground">{win.title}</h4>
														<p className="text-sm text-foreground/70">@{win.username || 'anonymous'} • {new Date(win.createdAt).toLocaleDateString()}</p>
													</div>
													<span className={`ml-auto inline-flex px-2 py-1 text-xs font-medium ${getBgColor(win.category)} ${getIconColor(win.category)} rounded-full`}>
														{win.category}
													</span>
												</div>
											</div>
										))
									) : (
										<div className="px-6 py-8 text-center">
											<p className="text-foreground/70">No wins submitted yet. Be the first!</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
