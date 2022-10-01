/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: [
      'images.unsplash.com','assets.myntassets.com',"www.saralifestyle.com.bd","i.ibb.co","cdn.dribbble.com","ledlightsbd.com",
      "i.pinimg.com","media.istockphoto.com","cdn.w600.comps.canstockphoto.com","www.pngitem.com","us.123rf.com","www.creativefabrica.com","www.kindpng.com","aristomart.com"
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
