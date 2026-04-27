/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      // =============================
      // OLD URL → NEW URL (SEO SAFE)
      // =============================

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

      // =============================
      // WWW → NON-WWW (IMPORTANT)
      // =============================
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

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;