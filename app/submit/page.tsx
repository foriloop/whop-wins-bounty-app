'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function SubmitPage() {
	const router = useRouter();
	const pathname = usePathname();
	const { user, isAuthenticated, isLoading } = useAuth();
	const [formData, setFormData] = useState({
		title: '',
		category: '',
		description: '',
		proof: '',
		difficulty: '',
		timeframe: '',
		tags: ''
	});
	const [files, setFiles] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');

	// Redirect if not authenticated
	if (!isLoading && !isAuthenticated) {
		router.push('/');
		return null;
	}

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			setFiles(prev => [...prev, ...newFiles]);
		}
	};

	const removeFile = (index: number) => {
		setFiles(prev => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			const response = await fetch('/api/wins', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to submit win');
			}

			const result = await response.json();
			
			// Show success message
			alert('Win submitted successfully!');
			
			// Redirect to wins page
			router.push('/wins');
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Error submitting win. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid = formData.title && formData.category && formData.description && formData.proof;

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

	if (!isAuthenticated) {
		return null; // Will redirect
	}

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

						{/* User Info */}
						<div className="flex items-center">
							<div className="text-sm text-foreground mr-4">
								Welcome, {user?.username || 'User'}!
							</div>
							<div className="bg-[#1754d8] text-white px-3 py-1 rounded-lg text-sm">
								{user?.badge || 'Initiate'}
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-[#1754d8]/5 to-[#1754d8]/10"></div>
				<div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Submit Your Win
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
							Submit a Win
						</h1>
						<p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
							Share your achievement and get rewarded for your success
						</p>
					</div>
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<div className="flex">
							<svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p className="text-red-800">{error}</p>
						</div>
					</div>
				</div>
			)}

			{/* Main Form */}
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
				<form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-sm">
					<div className="space-y-8">
						{/* Basic Information */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Basic Information</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
										Win Title *
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										placeholder="e.g., Reached Diamond Rank in Valorant"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									/>
								</div>
								<div>
									<label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
										Category *
									</label>
									<select
										id="category"
										name="category"
										value={formData.category}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									>
										<option value="">Select Category</option>
										<option value="gaming">Gaming</option>
										<option value="fitness">Fitness</option>
										<option value="learning">Learning</option>
										<option value="business">Business</option>
										<option value="creative">Creative</option>
										<option value="social">Social</option>
									</select>
								</div>
							</div>
						</div>

						{/* Description */}
						<div>
							<label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
								Description *
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows={4}
								placeholder="Describe your achievement in detail..."
								className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
								required
							></textarea>
						</div>

						{/* Proof Requirements */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Proof & Evidence</h2>
							<div className="space-y-4">
								<div>
									<label htmlFor="proof" className="block text-sm font-medium text-foreground mb-2">
										Proof Description *
									</label>
									<textarea
										id="proof"
										name="proof"
										value={formData.proof}
										onChange={handleInputChange}
										rows={3}
										placeholder="What evidence do you have to support your win?"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									></textarea>
								</div>
								<div>
									<label htmlFor="files" className="block text-sm font-medium text-foreground mb-2">
										Upload Files
									</label>
									<div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-[#1754d8] transition-all duration-200 bg-muted/20">
										<svg className="w-12 h-12 text-foreground/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
										</svg>
										<p className="text-foreground mb-2">Drop files here or click to upload</p>
										<p className="text-sm text-foreground/60">Screenshots, photos, videos, or documents</p>
										<input 
											type="file" 
											id="files" 
											multiple 
											onChange={handleFileUpload}
											className="hidden" 
										/>
										<label htmlFor="files" className="cursor-pointer">
											<div className="mt-4 bg-[#1754d8] text-white px-4 py-2 rounded-xl inline-block hover:bg-[#1754d8]/90 transition-all duration-200">
												Choose Files
											</div>
										</label>
									</div>
									
									{/* File List */}
									{files.length > 0 && (
										<div className="mt-4 space-y-2">
											{files.map((file, index) => (
												<div key={index} className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
													<div className="flex items-center">
														<svg className="w-5 h-5 text-foreground/60 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
														</svg>
														<span className="text-sm text-foreground">{file.name}</span>
													</div>
													<button
														type="button"
														onClick={() => removeFile(index)}
														className="text-red-500 hover:text-red-600 transition-colors"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
														</svg>
													</button>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Additional Details */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Additional Details</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="difficulty" className="block text-sm font-medium text-foreground mb-2">
										Difficulty Level
									</label>
									<select
										id="difficulty"
										name="difficulty"
										value={formData.difficulty}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
									>
										<option value="">Select Difficulty</option>
										<option value="easy">Easy</option>
										<option value="medium">Medium</option>
										<option value="hard">Hard</option>
										<option value="expert">Expert</option>
									</select>
								</div>
								<div>
									<label htmlFor="timeframe" className="block text-sm font-medium text-foreground mb-2">
										Time Investment
									</label>
									<input
										type="text"
										id="timeframe"
										name="timeframe"
										value={formData.timeframe}
										onChange={handleInputChange}
										placeholder="e.g., 3 months, 2 weeks"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
									/>
								</div>
							</div>
						</div>

						{/* Tags */}
						<div>
							<label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
								Tags (optional)
							</label>
							<input
								type="text"
								id="tags"
								name="tags"
								value={formData.tags}
								onChange={handleInputChange}
								placeholder="Add relevant tags separated by commas"
								className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
							/>
						</div>

						{/* Submit Button */}
						<div className="pt-6">
							<button
								type="submit"
								disabled={!isFormValid || isSubmitting}
								className={`w-full px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 ${
									isFormValid && !isSubmitting
										? 'bg-[#1754d8] text-white hover:bg-[#1754d8]/90'
										: 'bg-muted/50 text-foreground/50 cursor-not-allowed'
								}`}
							>
								{isSubmitting ? (
									<div className="flex items-center justify-center">
										<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Submitting...
									</div>
								) : (
									<>
										<svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										Submit Win
									</>
								)}
							</button>
						</div>
					</div>
				</form>

				{/* Tips Section */}
				<div className="mt-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
					<h3 className="text-lg font-semibold text-foreground mb-4">Tips for a Great Submission</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-foreground mb-2">Clear Description</h4>
							<p className="text-sm text-foreground/70">Explain what you accomplished and why it's significant. Be specific about the challenges you overcame.</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">Solid Proof</h4>
							<p className="text-sm text-foreground/70">Provide clear evidence like screenshots, photos, or documents that verify your achievement.</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">Relevant Category</h4>
							<p className="text-sm text-foreground/70">Choose the most appropriate category to help others discover and relate to your win.</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">Honest Assessment</h4>
							<p className="text-sm text-foreground/70">Be realistic about the difficulty level and time investment required for your achievement.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}



