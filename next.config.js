/** @type {import('next').NextConfig} */

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'Server',
		value: 'Apache', // phony server value
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'Referrer-Policy',
		value: 'same-origin',
	},
	{
		key: 'Permissions-Policy',
		value: 'geolocation=*', // allow specified policies here
	},
];

const nextConfig = {
	eslint: {
		dirs: ['src'],
	},
	images: {
		domains: ['imgur.com', 'i.imgur.com', 'picsum.photos'],
	},
	reactStrictMode: true,
	swcMinify: true,
	env: {
		BASE_URL: process.env.BASE_URL,
		X_REQUEST_LOCK: process.env.X_REQUEST_LOCK,
	},
	// SVGR
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						typescript: true,
						icon: true,
					},
				},
			],
		});

		return config;
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.BASE_URL}/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
