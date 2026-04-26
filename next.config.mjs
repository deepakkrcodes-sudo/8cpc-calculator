/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // ✅ 1. OLD URL → NEW URL (MOST IMPORTANT)

      {
        source: '/8th-cpc-arrear',
        destination: '/8th-cpc-arrear-calculator',
        permanent: true,
      },

      {
        source: '/arrear-calculator',
        destination: '/8th-cpc-arrear-calculator',
        permanent: true,
      },

      // ✅ 2. WWW → NON-WWW
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