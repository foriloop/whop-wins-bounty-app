'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WinsPage() {
	const pathname = usePathname();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedTimeframe, setSelectedTimeframe] = useState('');

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

	const [wins] = useState([
		{
			id: 1,
			title: 'Reached Diamond Rank in Valorant',
			user: '@alex_thompson',
			time: '2 hours ago',
			category: 'Gaming',
			icon: 'blue',
			likes: 24,
			comments: 8,
			image: 'blue'
		},
		{
			id: 2,
			title: 'Completed First Marathon',
			user: '@sarah_chen',
			time: '5 hours ago',
			category: 'Fitness',
			icon: 'green',
			likes: 156,
			comments: 32,
			image: 'green'
		},
		{
			id: 3,
			title: 'Launched First SaaS Product',
			user: '@mike_rodriguez',
			time: '1 day ago',
			category: 'Creative',
			icon: 'purple',
			likes: 89,
			comments: 12,
			image: 'purple'
		},
		{
			id: 4,
			title: 'Hit $10K Monthly Revenue',
			user: '@emma_wilson',
			time: '2 days ago',
			category: 'Business',
			icon: 'orange',
			likes: 234,
			comments: 45,
			image: 'orange'
		},
		{
			id: 5,
			title: 'Completed Full Stack Course',
			user: '@david_lee',
			time: '3 days ago',
			category: 'Learning',
			icon: 'cyan',
			likes: 67,
			comments: 18,
			image: 'cyan'
		},
		{
			id: 6,
			title: 'Organized Community Meetup',
			user: '@lisa_garcia',
			time: '4 days ago',
			category: 'Social',
			icon: 'pink',
			likes: 123,
			comments: 28,
			image: 'pink'
		}
	]);

	const [likedWins, setLikedWins] = useState<Set<number>>(new Set());

	const getIconColor = (color: string) => {
		const colors = {
			blue: 'text-blue-600',
			green: 'text-green-600',
			purple: 'text-purple-600',
			orange: 'text-orange-600',
			cyan: 'text-cyan-600',
			pink: 'text-pink-600'
		};
		return colors[color as keyof typeof colors] || 'text-gray-600';
	};

	const getBgColor = (color: string) => {
		const colors = {
			blue: 'bg-blue-50',
			green: 'bg-green-50',
			purple: 'bg-purple-50',
			orange: 'bg-orange-50',
			cyan: 'bg-cyan-50',
			pink: 'bg-pink-50'
		};
		return colors[color as keyof typeof colors] || 'bg-gray-50';
	};

	const getGradientBg = (color: string) => {
		const gradients = {
			blue: 'from-blue-500 to-indigo-600',
			green: 'from-green-500 to-emerald-600',
			purple: 'from-purple-500 to-pink-600',
			orange: 'from-orange-500 to-red-600',
			cyan: 'from-cyan-500 to-blue-600',
			pink: 'from-pink-500 to-rose-600'
		};
		return gradients[color as keyof typeof gradients] || 'from-gray-500 to-gray-600';
	};

	const handleLike = (winId: number) => {
		setLikedWins(prev => {
			const newSet = new Set(prev);
			if (newSet.has(winId)) {
				newSet.delete(winId);
			} else {
				newSet.add(winId);
			}
			return newSet;
		});
	};

	const filteredWins = wins.filter(win => {
		const matchesSearch = win.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 win.user.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = !selectedCategory || win.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-green-50/30"></div>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Wins Wall
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
							Wins Wall
						</h1>
						<p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
							Celebrate achievements and inspire others with your community's wins
						</p>
					</div>
				</div>
			</div>

			{/* Filter and Search */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search wins..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
							/>
						</div>
						<select 
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
						>
							<option value="">All Categories</option>
							<option value="Gaming">Gaming</option>
							<option value="Fitness">Fitness</option>
							<option value="Learning">Learning</option>
							<option value="Business">Business</option>
							<option value="Creative">Creative</option>
							<option value="Social">Social</option>
						</select>
						<select 
							value={selectedTimeframe}
							onChange={(e) => setSelectedTimeframe(e.target.value)}
							className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
						>
							<option value="">All Time</option>
							<option value="today">Today</option>
							<option value="week">This Week</option>
							<option value="month">This Month</option>
							<option value="year">This Year</option>
						</select>
						<button 
							onClick={() => {
								setSearchTerm('');
								setSelectedCategory('');
								setSelectedTimeframe('');
							}}
							className="bg-[#1754d8] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200"
						>
							Clear Filters
						</button>
					</div>
				</div>
			</div>

			{/* Wins Grid */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				{filteredWins.length === 0 ? (
					<div className="text-center py-16">
						<svg className="w-16 h-16 text-foreground/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<h3 className="text-lg font-medium text-foreground mb-2">No wins found</h3>
						<p className="text-foreground/70">Try adjusting your search or filters</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredWins.map((win) => (
							<div key={win.id} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
								<div className={`h-48 bg-gradient-to-br ${getGradientBg(win.image)} flex items-center justify-center`}>
									<svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<div className="p-6">
									<div className="flex items-center justify-between mb-3">
										<span className={`inline-flex px-2 py-1 text-xs font-medium ${getBgColor(win.icon)} ${getIconColor(win.icon)} rounded-full`}>
											{win.category}
										</span>
										<span className="text-sm text-foreground/70">{win.time}</span>
									</div>
									<h3 className="text-xl font-semibold text-foreground mb-2">{win.title}</h3>
									<p className="text-foreground/70 mb-4">Share your latest achievement and get rewarded for your success</p>
									<div className="flex items-center justify-between">
										<div className="flex items-center text-sm text-foreground/70">
											<svg className="w-4 h-4 mr-1 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
											</svg>
											{win.user}
										</div>
										<div className="flex items-center space-x-2">
											<button 
												onClick={() => handleLike(win.id)}
												className={`flex items-center transition-colors ${
													likedWins.has(win.id) 
														? 'text-red-500 hover:text-red-600' 
														: 'text-foreground/70 hover:text-[#1754d8]'
												}`}
											>
												<svg className="w-4 h-4 mr-1" fill={likedWins.has(win.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
												</svg>
												<span className="text-sm">{win.likes + (likedWins.has(win.id) ? 1 : 0)}</span>
											</button>
											<button className="flex items-center text-foreground/70 hover:text-[#1754d8] transition-colors">
												<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
												</svg>
												<span className="text-sm">{win.comments}</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Load More */}
				{filteredWins.length > 0 && (
					<div className="text-center mt-16">
						<button className="bg-[#1754d8] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200">
							Load More Wins
						</button>
					</div>
				)}
			</div>
		</div>
	);
}



