/** @type {import('next').NextConfig} */
// strictMode true,
// Editor mounted error
// 아직까지 해결안됨 git community에서도
// nextjs에서 draftjs 사용 시 mounted 에러 발생 사용자 다수

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'choigirang-why-community.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false,
};
