/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: [
      'images.unsplash.com','assets.myntassets.com',"www.saralifestyle.com.bd","i.ibb.co","cdn.dribbble.com",
      "i.pinimg.com","media.istockphoto.com","www.pngitem.com","us.123rf.com","www.creativefabrica.com","www.kindpng.com"
    ],
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
