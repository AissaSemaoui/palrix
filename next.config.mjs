/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.material-tailwind.com",
        pathname: "/logos/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
