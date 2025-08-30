'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMobileMenuOpen && (
				<div className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-md">
					<div className="px-4 py-2 space-y-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive(item.href)
										? 'bg-[#1754d8] text-white'
										: 'text-foreground hover:bg-muted/50'
								}`}
							>
								<span className="mr-2">{item.icon}</span>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
