/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.futbolmania.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.futbolmania.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
