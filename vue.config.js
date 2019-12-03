'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        rules: [
          {
            test: /\.[pug|vue]$/,
            loader: 'vue-pug-alias',
            options: {
              alias: { // A list of your aliases
                ['@img']: 'src/assets/images',
              }
            }
          }
        ],
      }),
    ],
  },

};
