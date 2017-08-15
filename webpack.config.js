var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    library: "dndGrid",
    libraryTarget: "umd",
    path: path.join(__dirname, 'dist'),
    filename: "dndGrid.js"
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
      "draggableWrapper": 'src/draggableWrapper.js',
      "dropGrid": 'src/dropGrid.js',
      "renderedGrid": 'src/renderedGrid.jsx',
    },
    extensions: ["", ".js", ".jsx" ]
  }
};
