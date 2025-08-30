'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ReviewPage() {
	const pathname = usePathname();
	const [selectedStatus, setSelectedStatus] = useState('pending');
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

	const [submissions] = useState([
		{
			id: 1,
			title: 'Reached Diamond Rank in Valorant',
			user: '@alex_thompson',
			category: 'Gaming',
			status: 'pending',
			submittedAt: '2 hours ago',
			description: 'Finally hit Diamond rank after months of practice and dedication. The grind was real but worth it!',
			proof: 'Screenshot of rank achievement and match history showing consistent performance.',
			difficulty: 'Hard',
			timeframe: '6 months'
		},
		{
			id: 2,
			title: 'Completed First Marathon',
			user: '@sarah_chen',
			category: 'Fitness',
			status: 'pending',
			submittedAt: '5 hours ago',
			description: 'Ran my first marathon in 3:45! Never thought I could do it, but here we are. Next goal: sub 3:30!',
			proof: 'Race results, finish line photo, and training log showing consistent preparation.',
			difficulty: 'Expert',
			timeframe: '8 months'
		},
		{
			id: 3,
			title: 'Launched First SaaS Product',
			user: '@mike_rodriguez',
			category: 'Business',
			status: 'approved',
			submittedAt: '1 day ago',
			description: 'After 6 months of development, my SaaS product is finally live! Already got 50 beta users signed up.',
			proof: 'Live website, user analytics dashboard, and beta user testimonials.',
			difficulty: 'Expert',
			timeframe: '6 months'
		},
		{
			id: 4,
			title: 'Hit $10K Monthly Revenue',
			user: '@emma_wilson',
			category: 'Business',
			status: 'rejected',
			submittedAt: '2 days ago',
			description: 'My side hustle finally hit the $10K monthly revenue milestone! Consistency and patience paid off.',
			proof: 'Revenue dashboard screenshot and bank statements.',
			difficulty: 'Hard',
			timeframe: '2 years'
		}
	]);

	const getStatusColor = (status: string) => {
		const colors = {
			pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
			approved: 'bg-green-50 text-green-700 border border-green-200',
			rejected: 'bg-red-50 text-red-700 border border-red-200'
		};
		return colors[status as keyof typeof colors] || 'bg-muted/50 text-foreground/70';
	};

	const getCategoryColor = (category: string) => {
		const colors = {
			Gaming: 'bg-blue-50 text-blue-700',
			Fitness: 'bg-green-50 text-green-700',
			Business: 'bg-purple-50 text-purple-700',
			Learning: 'bg-cyan-50 text-cyan-700',
			Creative: 'bg-pink-50 text-pink-700',
			Social: 'bg-orange-50 text-orange-700'
		};
		return colors[category as keyof typeof colors] || 'bg-muted/50 text-foreground/70';
	};

	const filteredSubmissions = submissions.filter(submission => {
		const matchesStatus = selectedStatus === 'all' || submission.status === selectedStatus;
		const matchesCategory = selectedCategory === 'all' || submission.category === selectedCategory;
		return matchesStatus && matchesCategory;
	});

	const handleReview = (submissionId: number, action: 'approve' | 'reject') => {
		// In a real app, this would make an API call
		alert(`Submission ${submissionId} ${action}d successfully!`);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Navigation Header */}
			<nav className="bg-card/80 backdrop-blur-md border-b border-border/50 shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						{/* Logo */}
						<div className="flex items-center">
							<Link href="/" className="flex items-center">
								<div className="w-8 h-8 bg-[#1754d8] rounded-lg flex items-center justify-center mr-3">
									<span className="text-white text-lg font-bold">W</span>
								</div>
								<span className="text-xl font-bold text-foreground">Whop App</span>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-1">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
										isActive(item.href)
											? 'bg-[#1754d8] text-white shadow-md'
											: 'text-foreground hover:bg-muted/50 hover:text-foreground'
									}`}
								>
									<span className="mr-2">{item.icon}</span>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-red-50/30"></div>
				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
							Review Submissions
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
							Review Submissions
						</h1>
						<p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
							Review and approve community submissions to maintain quality standards
						</p>
					</div>
				</div>
			</div>

			{/* Filters */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
					<div className="flex flex-col md:flex-row gap-4">
						<select 
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
						>
							<option value="all">All Statuses</option>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="rejected">Rejected</option>
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
								setSelectedStatus('all');
								setSelectedCategory('all');
							}}
							className="bg-[#1754d8] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1754d8]/90 transition-all duration-200"
						>
							Reset Filters
						</button>
					</div>
				</div>
			</div>

			{/* Submissions List */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				{filteredSubmissions.length === 0 ? (
					<div className="text-center py-16">
						<svg className="w-16 h-16 text-foreground/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						<h3 className="text-lg font-medium text-foreground mb-2">No submissions found</h3>
						<p className="text-foreground/70">Try adjusting your filters</p>
					</div>
				) : (
					<div className="space-y-6">
						{filteredSubmissions.map((submission) => (
							<div key={submission.id} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
								<div className="flex flex-col lg:flex-row gap-6">
									{/* Main Content */}
									<div className="flex-1">
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<h3 className="text-xl font-semibold text-foreground mb-2">{submission.title}</h3>
												<div className="flex items-center gap-3 mb-3">
													<span className="text-sm text-foreground/70">{submission.user}</span>
													<span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(submission.category)}`}>
														{submission.category}
													</span>
													<span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
														{submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
													</span>
												</div>
												<p className="text-sm text-foreground/60 mb-2">Submitted {submission.submittedAt}</p>
											</div>
										</div>
										
										<div className="space-y-4">
											<div>
												<h4 className="font-medium text-foreground mb-2">Description</h4>
												<p className="text-foreground/80">{submission.description}</p>
											</div>
											
											<div>
												<h4 className="font-medium text-foreground mb-2">Proof</h4>
												<p className="text-foreground/80">{submission.proof}</p>
											</div>
											
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<h4 className="font-medium text-foreground mb-2">Difficulty</h4>
													<p className="text-foreground/80">{submission.difficulty}</p>
												</div>
												<div>
													<h4 className="font-medium text-foreground mb-2">Time Investment</h4>
													<p className="text-foreground/80">{submission.timeframe}</p>
												</div>
											</div>
										</div>
									</div>
									
									{/* Actions */}
									{submission.status === 'pending' && (
										<div className="lg:w-48 flex flex-col gap-3">
											<button
												onClick={() => handleReview(submission.id, 'approve')}
												className="w-full bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition-all duration-200"
											>
												<svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
												</svg>
												Approve
											</button>
											<button
												onClick={() => handleReview(submission.id, 'reject')}
												className="w-full bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition-all duration-200"
											>
												<svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
												Reject
											</button>
											<button className="w-full bg-muted/50 text-foreground/70 px-4 py-2 rounded-xl font-medium hover:bg-muted/70 transition-all duration-200">
												<svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												Request Info
											</button>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
