var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cp = require('child_process');
var del = require('del');
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var size = require('gulp-size');

gulp.task('clean', function(cb) { del(['_site/**/*'], cb); });

gulp.task('styles', function() {
  gulp.src('src/sass/*.sass').
    pipe(plumber()).
    pipe(sass({ style: 'expanded', 'sourcemap=none': true })).
    pipe(autoprefixer({ browsers: ['last 2 versions', 'last 10 Chrome versions', 'iOS > 7.1'] })).
    pipe(gulp.dest('stylesheets')).
    pipe(rename({suffix: '.min'})).
    pipe(size()).
    pipe(minifycss()).
    pipe(size()).
    pipe(gulp.dest('stylesheets')).
    pipe(gulp.dest('_site/stylesheets')).
    pipe(browserSync.reload({stream:true}));
});

gulp.task('jekyll-build', function (done) {
  browserSync.notify('Building Jekyll');
  cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).
    on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-build'], function() {
  browserSync.init(null, {
    server: {
      baseDir: '_site'
    },
    host: "localhost"
  });
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.sass', ['styles']);
  gulp.watch([
    '*.html',
    '*.md',
    '*.xml',
    '_config.yml',
    '_includes/**',
    '_layouts/**',
    '_posts/**',
    'pages/**',
    'talks/**'
  ], ['jekyll-rebuild']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'browser-sync', 'watch');
});
