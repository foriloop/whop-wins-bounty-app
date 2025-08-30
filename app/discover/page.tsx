'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DiscoverPage() {
	const pathname = usePathname();

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

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30"></div>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							Discover
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
							Discover
						</h1>
						<p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
							Explore new experiences, challenges, and opportunities in your community
						</p>
					</div>
				</div>
			</div>

			{/* Search and Filters */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search experiences, bounties, or users..."
								className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
							/>
						</div>
						<select className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background">
							<option value="">All Categories</option>
							<option value="gaming">Gaming</option>
							<option value="fitness">Fitness</option>
							<option value="learning">Learning</option>
							<option value="business">Business</option>
							<option value="creative">Creative</option>
							<option value="social">Social</option>
						</select>
						<select className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background">
							<option value="">All Types</option>
							<option value="experiences">Experiences</option>
							<option value="bounties">Bounties</option>
							<option value="users">Users</option>
						</select>
						<button className="bg-[#1754d8] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Search
						</button>
					</div>
				</div>
			</div>

			{/* Featured Experiences */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<h2 className="text-3xl font-bold text-foreground mb-8">Featured Experiences</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Experience Card 1 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
							<svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
						</div>
						<div className="p-6">
							<div className="flex items-center justify-between mb-3">
								<span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
									Gaming
								</span>
								<span className="text-sm text-foreground/70">Free</span>
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">Valorant Pro Training</h3>
							<p className="text-foreground/80 mb-4">Master advanced techniques and strategies with professional players</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center text-sm text-foreground/70">
									<svg className="w-4 h-4 mr-1 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									1.2k members
								</div>
								<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
									Join
								</button>
							</div>
						</div>
					</div>

					{/* Experience Card 2 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="h-48 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
							<svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
						</div>
						<div className="p-6">
							<div className="flex items-center justify-between mb-3">
								<span className="inline-flex px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
									Fitness
								</span>
								<span className="text-sm text-foreground/70">$29/month</span>
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">30-Day Fitness Challenge</h3>
							<p className="text-foreground/80 mb-4">Transform your body with daily workouts and nutrition guidance</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center text-sm text-foreground/70">
									<svg className="w-4 h-4 mr-1 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									856 members
								</div>
								<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
									Join
								</button>
							</div>
						</div>
					</div>

					{/* Experience Card 3 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
							<svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
							</svg>
						</div>
						<div className="p-6">
							<div className="flex items-center justify-between mb-3">
								<span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
									Creative
								</span>
								<span className="text-sm text-foreground/70">$19/month</span>
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-2">Digital Art Masterclass</h3>
							<p className="text-foreground/80 mb-4">Learn digital painting and illustration from industry professionals</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center text-sm text-foreground/70">
									<svg className="w-4 h-4 mr-1 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									623 members
								</div>
								<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
									Join
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Active Bounties */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<h2 className="text-3xl font-bold text-foreground mb-8">Active Bounties</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Bounty Card 1 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="flex items-center justify-between mb-4">
							<span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-50 text-orange-700 rounded-full">
								Business
							</span>
							<span className="text-lg font-bold text-[#1754d8]">$500</span>
						</div>
						<h3 className="text-xl font-semibold text-foreground mb-3">Create Viral TikTok Content</h3>
						<p className="text-foreground/80 mb-4">Create engaging TikTok content that gets 100k+ views and 10k+ likes</p>
						<div className="space-y-3 mb-6">
							<div className="flex items-center text-sm text-foreground/70">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Deadline: Dec 31, 2024
							</div>
							<div className="flex items-center text-sm text-foreground/70">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								24 participants
							</div>
						</div>
						<button className="w-full bg-[#1754d8] text-white py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Apply Now
						</button>
					</div>

					{/* Bounty Card 2 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="flex items-center justify-between mb-4">
							<span className="inline-flex px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
								Fitness
							</span>
							<span className="text-lg font-bold text-[#1754d8]">$200</span>
						</div>
						<h3 className="text-xl font-semibold text-foreground mb-3">30-Day Running Challenge</h3>
						<p className="text-foreground/80 mb-4">Run 5km every day for 30 consecutive days and document your progress</p>
						<div className="space-y-3 mb-6">
							<div className="flex items-center text-sm text-foreground/70">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Deadline: Jan 15, 2025
							</div>
							<div className="flex items-center text-sm text-foreground/70">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								156 participants
							</div>
						</div>
						<button className="w-full bg-[#1754d8] text-white py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Apply Now
						</button>
					</div>

					{/* Bounty Card 3 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="flex items-center justify-between mb-4">
							<span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
								Gaming
							</span>
							<span className="text-lg font-bold text-[#1754d8]">$300</span>
						</div>
						<h3 className="text-xl font-semibold text-foreground mb-3">Speedrun Challenge</h3>
						<p className="text-foreground/80 mb-4">Complete any game in under 2 hours and submit video proof</p>
						<div className="space-y-3 mb-6">
							<div className="flex items-center text-sm text-foreground/70">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Deadline: Jan 30, 2025
							</div>
							<div className="flex items-center text-sm text-foreground/70">
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								89 participants
							</div>
						</div>
						<button className="w-full bg-[#1754d8] text-white py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Apply Now
						</button>
					</div>
				</div>
			</div>

			{/* Trending Users */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<h2 className="text-3xl font-bold text-foreground mb-8">Trending Users</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* User Card 1 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="w-20 h-20 bg-gradient-to-br from-[#1754d8] to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-2">@alex_thompson</h3>
						<p className="text-sm text-foreground/70 mb-3">Gaming Pro • 156 wins</p>
						<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Follow
						</button>
					</div>

					{/* User Card 2 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-2">@sarah_chen</h3>
						<p className="text-sm text-foreground/70 mb-3">Fitness Coach • 89 wins</p>
						<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Follow
						</button>
					</div>

					{/* User Card 3 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-2">@mike_rodriguez</h3>
						<p className="text-sm text-foreground/70 mb-3">Creative Designer • 234 wins</p>
						<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Follow
						</button>
					</div>

					{/* User Card 4 */}
					<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
						<div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-foreground mb-2">@emma_wilson</h3>
						<p className="text-sm text-foreground/70 mb-3">Business Expert • 178 wins</p>
						<button className="bg-[#1754d8] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Follow
						</button>
					</div>
				</div>
			</div>

			{/* Load More */}
			<div className="text-center py-16">
				<button className="bg-[#1754d8] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
					Load More Results
				</button>
			</div>
		</div>
	);
}
