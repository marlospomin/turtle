const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const eslint = require('gulp-eslint');
const karma = require('karma').Server;
const uglify = require('gulp-uglifyjs');
const minify = require("gulp-babel-minify");
const browserSync = require('browser-sync');

// Browser sync task
gulp.task('sync', function () {
  browserSync.init({
    server: "./example/"
  });

  // Watch for file changes
  gulp.watch(['./src/*.js'], ['reload', 'build']);
  gulp.watch(['./example/*.html', './example/js/*.js', './example/css/*.css'], browserSync.reload);
});

// Reload task
gulp.task('reload', function () {
  gulp.src(['./src/turtle.js'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['add-module-exports', 'transform-es2015-modules-umd']
    }))
    .pipe(uglify())
    .pipe(rename('turtle.min.js'))
    .pipe(gulp.dest('./example/js'))
});

// Test task
gulp.task('test', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function (exitCode) {
    done();
    process.exit(exitCode);
  }).start();
});

// Lint task
gulp.task('lint', function () {
  return gulp.src(['./src/turtle.js'])
    .pipe(eslint({
      "parser": "babel-eslint",
      rules: {
    		"camelcase": 2,
    		"curly": 1,
    		"eqeqeq": 0,
    		"no-empty": 2,
        "no-const-assign": 2,
        "no-var": 2,
        "prefer-const": 1
      },
      env: {
        "es6": true
      },
      "parserOptions": {
        "ecmaVersion": 7
      }
    }))
    .pipe(eslint.format())
});

// Build task
gulp.task('build', function () {
  gulp.src(['./src/turtle.js'])
    .pipe(rename('turtle.es7.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(rename('turtle.es7.min.js'))
    .pipe(gulp.dest('./dist'))

  gulp.src(['./src/turtle.js'])
    .pipe(babel({
      presets: ['env'],
      plugins: ['add-module-exports', 'transform-es2015-modules-umd']
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('turtle.min.js'))
    .pipe(gulp.dest('./dist'))
});

// Set the defaukt task as 'sync'
gulp.task('default', ['sync']);
