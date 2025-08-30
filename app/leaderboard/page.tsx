'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeaderboardPage() {
	const pathname = usePathname();
	const [selectedPeriod, setSelectedPeriod] = useState('all-time');
	const [selectedCategory, setSelectedCategory] = useState('all');

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

	const [leaderboardData] = useState([
		{
			id: 1,
			rank: 1,
			username: '@alex_thompson',
			displayName: 'Alex Thompson',
			avatar: 'AT',
			score: 2847,
			wins: 156,
			streak: 23,
			category: 'Gaming',
			badge: 'diamond'
		},
		{
			id: 2,
			rank: 2,
			username: '@sarah_chen',
			displayName: 'Sarah Chen',
			avatar: 'SC',
			score: 2156,
			wins: 134,
			streak: 18,
			category: 'Fitness',
			badge: 'platinum'
		},
		{
			id: 3,
			rank: 3,
			username: '@mike_rodriguez',
			displayName: 'Mike Rodriguez',
			avatar: 'MR',
			score: 1987,
			wins: 98,
			streak: 15,
			category: 'Business',
			badge: 'gold'
		},
		{
			id: 4,
			rank: 4,
			username: '@emma_wilson',
			displayName: 'Emma Wilson',
			avatar: 'EW',
			score: 1876,
			wins: 87,
			streak: 12,
			category: 'Business',
			badge: 'silver'
		},
		{
			id: 5,
			rank: 5,
			username: '@david_lee',
			displayName: 'David Lee',
			avatar: 'DL',
			score: 1654,
			wins: 76,
			streak: 9,
			category: 'Learning',
			badge: 'bronze'
		},
		{
			id: 6,
			rank: 6,
			username: '@lisa_garcia',
			displayName: 'Lisa Garcia',
			avatar: 'LG',
			score: 1432,
			wins: 65,
			streak: 7,
			category: 'Social',
			badge: 'bronze'
		},
		{
			id: 7,
			rank: 7,
			username: '@james_brown',
			displayName: 'James Brown',
			avatar: 'JB',
			score: 1298,
			wins: 54,
			streak: 6,
			category: 'Creative',
			badge: 'bronze'
		},
		{
			id: 8,
			rank: 8,
			username: '@anna_kim',
			displayName: 'Anna Kim',
			avatar: 'AK',
			score: 1187,
			wins: 43,
			streak: 5,
			category: 'Learning',
			badge: 'bronze'
		},
		{
			id: 9,
			rank: 9,
			username: '@tom_white',
			displayName: 'Tom White',
			avatar: 'TW',
			score: 1098,
			wins: 38,
			streak: 4,
			category: 'Gaming',
			badge: 'bronze'
		},
		{
			id: 10,
			rank: 10,
			username: '@sophie_martin',
			displayName: 'Sophie Martin',
			avatar: 'SM',
			score: 987,
			wins: 32,
			streak: 3,
			category: 'Fitness',
			badge: 'bronze'
		}
	]);

	const badgeTierColors = {
		diamond: { bg: 'bg-gradient-to-r from-cyan-400 to-blue-500', text: 'text-white', border: 'border-cyan-300' },
		platinum: { bg: 'bg-gradient-to-r from-gray-300 to-gray-400', text: 'text-white', border: 'border-gray-200' },
		gold: { bg: 'bg-gradient-to-r from-yellow-400 to-orange-500', text: 'text-white', border: 'border-yellow-300' },
		silver: { bg: 'bg-gradient-to-r from-gray-400 to-gray-500', text: 'text-white', border: 'border-gray-300' },
		bronze: { bg: 'bg-gradient-to-r from-orange-600 to-red-700', text: 'text-white', border: 'border-orange-500' }
	};

	const getBadgeStyle = (badge: string) => {
		return badgeTierColors[badge as keyof typeof badgeTierColors] || badgeTierColors.bronze;
	};

	const filteredData = leaderboardData.filter(user => {
		if (selectedCategory !== 'all' && user.category !== selectedCategory) {
			return false;
		}
		return true;
	});

	const getRankIcon = (rank: number) => {
		if (rank === 1) return '🥇';
		if (rank === 2) return '🥈';
		if (rank === 3) return '🥉';
		return `#${rank}`;
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30"></div>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
							</svg>
							Leaderboard
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
							Leaderboard
						</h1>
						<p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
							See where you rank among the top performers in your community
						</p>
					</div>
				</div>
			</div>

			{/* Filters */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
					<div className="flex flex-col md:flex-row gap-4">
						<select 
							value={selectedPeriod}
							onChange={(e) => setSelectedPeriod(e.target.value)}
							className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
						>
							<option value="all-time">All Time</option>
							<option value="this-month">This Month</option>
							<option value="this-week">This Week</option>
							<option value="today">Today</option>
						</select>
						<select 
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
						>
							<option value="all">All Categories</option>
							<option value="Gaming">Gaming</option>
							<option value="Fitness">Fitness</option>
							<option value="Learning">Learning</option>
							<option value="Business">Business</option>
							<option value="Creative">Creative</option>
							<option value="Social">Social</option>
						</select>
						<button 
							onClick={() => {
								setSelectedPeriod('all-time');
								setSelectedCategory('all');
							}}
							className="bg-[#1754d8] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200"
						>
							Reset Filters
						</button>
					</div>
				</div>
			</div>

			{/* Leaderboard */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm">
					<div className="px-6 py-4 border-b border-border/50">
						<h2 className="text-2xl font-bold text-foreground">Top Performers</h2>
						<p className="text-foreground/70">Ranked by total score and achievements</p>
					</div>
					
					<div className="divide-y divide-border/50">
						{filteredData.map((user) => (
							<div key={user.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
								<div className="flex items-center">
									{/* Rank */}
									<div className="w-12 h-12 flex items-center justify-center text-2xl font-bold text-foreground">
										{getRankIcon(user.rank)}
									</div>
									
									{/* Avatar */}
									<div className="w-12 h-12 bg-gradient-to-br from-[#1754d8] to-purple-600 rounded-full flex items-center justify-center text-white font-semibold ml-4">
										{user.avatar}
									</div>
									
									{/* User Info */}
									<div className="ml-4 flex-1">
										<div className="flex items-center gap-3">
											<h3 className="text-lg font-semibold text-foreground">{user.displayName}</h3>
											<span className="text-sm text-foreground/70">{user.username}</span>
											<span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getBadgeStyle(user.badge).bg} ${getBadgeStyle(user.badge).text} ${getBadgeStyle(user.badge).border}`}>
												{user.badge.charAt(0).toUpperCase() + user.badge.slice(1)}
											</span>
										</div>
										<div className="flex items-center gap-4 mt-1">
											<span className="text-sm text-foreground/70">Category: {user.category}</span>
											<span className="text-sm text-foreground/70">Wins: {user.wins}</span>
											<span className="text-sm text-foreground/70">Streak: {user.streak} days</span>
										</div>
									</div>
									
									{/* Score */}
									<div className="text-right">
										<div className="text-2xl font-bold text-foreground">{user.score.toLocaleString()}</div>
										<div className="text-sm text-foreground/70">points</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Stats Summary */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
						<div className="flex items-center">
							<div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
								<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-foreground/70">Total Participants</p>
								<p className="text-2xl font-bold text-foreground">{filteredData.length}</p>
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
								<p className="text-sm font-medium text-foreground/70">Top Score</p>
								<p className="text-2xl font-bold text-foreground">{Math.max(...filteredData.map(u => u.score)).toLocaleString()}</p>
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
								<p className="text-sm font-medium text-foreground/70">Avg Score</p>
								<p className="text-2xl font-bold text-foreground">{Math.round(filteredData.reduce((sum, u) => sum + u.score, 0) / filteredData.length).toLocaleString()}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
