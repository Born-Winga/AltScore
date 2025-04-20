/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable React 19 features
	devIndicators: false,
	experimental: {
		// Enable React 19 features when available
		serverActions: {
			// Allow forms to be enhanced with client-side behavior
			allowedOrigins: ["localhost:3000"],
		},
	},

	// Configure headers for better security
	headers: async () => {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
				],
			},
		];
	},
};

export default nextConfig;
