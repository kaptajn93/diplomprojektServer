var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.jsx',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/public',
      filename: 'public/lib/bundle.js'
  },
  devServer: {
    contentBase: "./public"
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "src"),
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
    }
  ]
  },
  debug: true
};
