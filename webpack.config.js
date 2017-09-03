const path = require('path');

const DEV = path.resolve(__dirname, 'dev');
const PUBLIC = path.resolve(__dirname, 'public');

const config = {
  entry: `${DEV}/index.jsx`,
  output: {
    path: PUBLIC,
    filename: 'myCode.js',
  },
  module: {
    loaders: [
      { include: DEV, loader: 'babel-loader' },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
    ],
  },
};

module.exports = config;
