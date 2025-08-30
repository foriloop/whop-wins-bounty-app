import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';
import { WhopIframeSdkProvider } from '@whop/react';
import { WhopWebsocketProvider } from '@whop/react';
import { WhopIntegration } from './components/WhopIntegration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Whop App Template',
	description: 'A modern app template built with Next.js and Whop FrostedUI',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<WhopIframeSdkProvider>
					<WhopWebsocketProvider>
						<AuthProvider>
							<WhopIntegration />
							<div className="min-h-screen bg-background text-foreground">
								{children}
							</div>
						</AuthProvider>
					</WhopWebsocketProvider>
				</WhopIframeSdkProvider>
			</body>
		</html>
	);
}
