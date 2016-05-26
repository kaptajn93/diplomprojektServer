var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
};

const common = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    PATHS.app
  ],
  output: {
      path: PATHS.build,
      filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "src/assets"),
      ],
      exclude: [
        path.resolve(__dirname, "node_modules"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    }]
  },
  debug: true
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {});
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
