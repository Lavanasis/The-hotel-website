/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "avatars.githubusercontent.com"], // 允许加载 localhost 的图片
  },
  // output:"export"
};

export default nextConfig;
