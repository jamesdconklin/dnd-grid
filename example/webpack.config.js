var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./demoEntry.js",
  output: {
    path: path.join(__dirname, 'assets'),
    filename: "demo.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    root: __dirname,
    alias: {
      "dndGrid": "../dist/dndGrid.js",
    },
    extensions: ["", ".js", ".jsx" ],
    modules:[
      path.join(__dirname, '..', 'node_modules'),
    ],
  }
};
