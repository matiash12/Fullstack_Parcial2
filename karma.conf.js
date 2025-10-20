// karma.conf.js
const path = require('path');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/tests.js' 
    ],
    preprocessors: {
      'src/tests.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      }
      // La sección 'externals' para Enzyme ha sido eliminada
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};