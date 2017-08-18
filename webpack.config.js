var path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    library: 'dndGrid',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'dndGrid.js'
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
      'Draggable': 'src/Draggable.js',
      'RenderedGrid': 'src/RenderedGrid.js',
      'Grid': 'src/Grid.js',
      'ItemTypes': 'src/ItemTypes.js',
      'snapToGrid': 'src/snapToGrid.js',
    },
    extensions: ['', '.js', '.jsx' ]
  }
};
