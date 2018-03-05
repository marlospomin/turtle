module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'phantomjs-shim'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'node_modules/intersection-observer/intersection-observer.js',
      'dist/turtle.min.js',
      'test/index.js'
    ],
    exclude: [],
    preprocessors: {
      './test/*.js': ['webpack', 'sourcemap', 'coverage']
    },
    webpack: {
      module: {
        rules: [{
          test: /\.js$/,
          use: 'babel-loader'
        }]
      },
      devtool: '#inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    coverageReporter: {
      dir: './coverage',
      reporters: [{
          type: 'lcov',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    }
  })
}
