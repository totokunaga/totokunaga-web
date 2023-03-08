const { securityHeaders } = require("./src/utils/constants/next-config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    disableStaticImages: true, // disable the default type declaration for svg import
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
