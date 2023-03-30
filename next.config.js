const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* other options */
      images: {
        mozjpeg: {
          quality: 80,
        },
      },
    },
  ],
  // other plugins and configuration options
]);
