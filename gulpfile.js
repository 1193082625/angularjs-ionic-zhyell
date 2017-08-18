var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
  // sass: ['./scss/**/*.scss'],
  sass: ['./scss/**/*.scss'],
  css: ['./www/css/*.css'],
  js: ['./www/js/**/*.js'],
  html: ['./www/templates/**/*.html'],
  img: ['./www/img/*']
};

gulp.task('default', ['compile-sass']);

// gulp.task('sass', function(done) {
//   gulp.src(paths.sass)
//     .pipe(plugins.sass())
//     .on('error', plugins.sass.logError)
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(plugins.cleanCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(plugins.rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });
//
// gulp.task('watch', ['sass'], function() {
//   gulp.watch(paths.sass, ['sass']);
// });

// 在原文件基础上的新添加

gulp.task('test',function () {
  console.log('i am test');
})

gulp.task('compile-sass',function () {
  gulp.src(paths.sass)
    .pipe(plugins.sass())
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./www/css/'))
})

// gulp.task('minify-css',function () {
//   gulp.src(paths.css)
//     .pipe(plugins.minifyCss())
//     .pipe(plugins.rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('dist/css'))
// })

gulp.task('minify-js',function () {
  gulp.src(paths.js)
    .pipe(plugins.uglify())
    // .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('minify-html',function () {
  gulp.src(paths.html)
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest('dist/templates'))
})

// 图片压缩
gulp.task('minify-img',function () {
  return gulp.src(paths.img)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('dist/img'))
})

// js代码检查
gulp.task('jsHint',function () {
  gulp.src(paths.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter()); // 输出检查结果
})

// 文件合并
gulp.task('concat',function () {
  gulp.src('./www/lib/ionic/js/*.js')
    .pipe(plugins.concat('all.min.js'))
    .pipe(gulp.dest('dist/js'))
})


