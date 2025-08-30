'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBountyPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		category: '',
		requirements: '',
		proof: '',
		reward: '',
		deadline: '',
		difficulty: '',
		maxParticipants: '',
		tags: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Show success message
			alert('Bounty created successfully!');
			
			// Redirect to bounties page
			router.push('/bounties');
		} catch (error) {
			alert('Error creating bounty. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid = formData.title && formData.description && formData.category && formData.requirements && formData.reward;

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-accent/30">
				<div className="absolute inset-0 bg-gradient-to-br from-[#1754d8]/5 to-indigo-50/30"></div>
				<div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="inline-flex items-center px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground mb-6 shadow-sm">
							<svg className="w-4 h-4 mr-2 text-[#1754d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
							Create New Bounty
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
							Create a New Bounty
						</h1>
						<p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
							Set up challenges and rewards to engage your community
						</p>
					</div>
				</div>
			</div>

			{/* Main Form */}
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
				<form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-sm">
					<div className="space-y-8">
						{/* Basic Information */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Basic Information</h2>
							<div className="space-y-6">
								<div>
									<label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
										Bounty Title *
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										placeholder="e.g., Create a Viral TikTok Video"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									/>
								</div>
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
										placeholder="Describe what participants need to accomplish..."
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									></textarea>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
								</div>
							</div>
						</div>

						{/* Requirements & Proof */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Requirements & Proof</h2>
							<div className="space-y-6">
								<div>
									<label htmlFor="requirements" className="block text-sm font-medium text-foreground mb-2">
										Requirements *
									</label>
									<textarea
										id="requirements"
										name="requirements"
										value={formData.requirements}
										onChange={handleInputChange}
										rows={4}
										placeholder="What specific criteria must participants meet?"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									></textarea>
								</div>
								<div>
									<label htmlFor="proof" className="block text-sm font-medium text-foreground mb-2">
										Proof Requirements *
									</label>
									<textarea
										id="proof"
										name="proof"
										value={formData.proof}
										onChange={handleInputChange}
										rows={3}
										placeholder="What evidence should participants provide?"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									></textarea>
								</div>
							</div>
						</div>

						{/* Rewards & Timeline */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Rewards & Timeline</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="reward" className="block text-sm font-medium text-foreground mb-2">
										Reward *
									</label>
									<input
										type="text"
										id="reward"
										name="reward"
										value={formData.reward}
										onChange={handleInputChange}
										placeholder="e.g., $500, 1000 points, Featured spot"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
										required
									/>
								</div>
								<div>
									<label htmlFor="deadline" className="block text-sm font-medium text-foreground mb-2">
										Deadline
									</label>
									<input
										type="date"
										id="deadline"
										name="deadline"
										value={formData.deadline}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
									/>
								</div>
							</div>
						</div>

						{/* Advanced Settings */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Advanced Settings</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="maxParticipants" className="block text-sm font-medium text-foreground mb-2">
										Max Participants
									</label>
									<input
										type="number"
										id="maxParticipants"
										name="maxParticipants"
										value={formData.maxParticipants}
										onChange={handleInputChange}
										placeholder="Leave empty for unlimited"
										className="w-full px-4 py-3 border border-border/50 rounded-xl focus:ring-2 focus:ring-[#1754d8] focus:border-[#1754d8] transition-all duration-200 bg-background"
									/>
								</div>
								<div>
									<label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
										Tags
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
							</div>
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
										Creating Bounty...
									</div>
								) : (
									<>
										<svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
										</svg>
										Create Bounty
									</>
								)}
							</button>
						</div>
					</div>
				</form>

				{/* Help Section */}
				<div className="mt-12 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
					<h3 className="text-lg font-semibold text-foreground mb-4">Tips for Creating Great Bounties</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-medium text-foreground mb-2">Clear Requirements</h4>
							<p className="text-sm text-foreground/70">Be specific about what you want participants to accomplish. Vague requirements lead to confusion and poor submissions.</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">Appropriate Rewards</h4>
							<p className="text-sm text-foreground/70">Set rewards that match the difficulty and effort required. Too low rewards may not attract quality participants.</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">Realistic Deadlines</h4>
							<p className="text-sm text-foreground/70">Give participants enough time to complete the task well. Rushed deadlines often result in poor quality work.</p>
						</div>
						<div>
							<h4 className="font-medium text-foreground mb-2">Proof Guidelines</h4>
							<p className="text-sm text-foreground/70">Clearly specify what evidence participants need to provide to verify their completion of the bounty.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


