const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'main': ['regenerator-runtime/runtime', './src/frontend/js/game/main.js'],
    'register': ['regenerator-runtime/runtime', './src/frontend/js/register/register.js']
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: '[name].bundle.js',
    hashFunction: 'sha256'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/env', { modules: 'commonjs' }]]
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devtool: 'source-map'
};
