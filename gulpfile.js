const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglifyjs');
const minify = require("gulp-babel-minify");
const browserSync = require('browser-sync');

// Live reload task
gulp.task('sync', function () {
  browserSync.init({
    server: "./example/"
  });

  // Watch for file changes
  gulp.watch(['./src/*.js'], ['test', 'uglify', 'minify']);
  gulp.watch(["./example/*.html", "./example/js/*.js"], browserSync.reload);
});

// Minify task using babel-minify (for es7)
gulp.task('minify', function () {
  gulp.src(['./src/turtle.js'])
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(rename('turtle.es7.min.js'))
    .pipe(gulp.dest('./dist'))
});

// Minify task using uglifyjs (for es5)
gulp.task('uglify', function () {
  gulp.src('./src/turtle.js')
    .pipe(babel({
			presets: ['env']
		}))
    .pipe(uglify())
    .pipe(rename('turtle.min.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./example/js'))
});

// Tests task
gulp.task('test', function () {
  return gulp.src(['./src/*.js'])
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

// Set the defaukt task as 'sync'
gulp.task('default', ['sync']);
