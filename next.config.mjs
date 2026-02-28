/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.futbolmania.com",
      },
      {
        protocol: "https",
        hostname: "www.futbolmania.com",
      },
    ],
  },
};

export default nextConfig;
