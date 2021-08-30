const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      '1000marcas.net',
      'logodownload.org',
      'worldvectorlogo.com',
      'car-logos.net'
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}
