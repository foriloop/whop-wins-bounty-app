'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the main app instead of showing the experience management page
		router.replace('/');
	}, [router]);

	// Show a loading state while redirecting
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1754d8] mx-auto"></div>
				<p className="mt-4 text-foreground">Loading your app...</p>
			</div>
		</div>
	);
}
