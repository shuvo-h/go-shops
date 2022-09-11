/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['images.unsplash.com','assets.myntassets.com',"www.saralifestyle.com.bd"],
    /*
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.myntassets.com',
        // port: '',
        // pathname: '',
      },
    ],
    */
  },
  swcMinify: true,
}

module.exports = nextConfig
