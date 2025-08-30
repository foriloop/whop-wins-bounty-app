import { withWhopAppConfig } from "@whop/react/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [{ hostname: "**" }],
	},
	// Ensure proper routing for Whop app
	async redirects() {
		return [
			{
				source: '/experiences/:experienceId',
				destination: '/',
				permanent: false,
			},
		];
	},
};

export default withWhopAppConfig(nextConfig);
