/** @type {import('next').NextConfig} */


const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.8cpccalculator.com',
          },
        ],
        destination: 'https://8cpccalculator.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;



export default nextConfig;
