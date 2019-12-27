let gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  copy = require('gulp-contrib-copy'),
  autoprefixer = require('gulp-autoprefixer'),
  helpers = require('./gulp.helpers'),
  minify = require('gulp-babel-minify'),
  imagemin = require('gulp-imagemin'),
  livereload = require('gulp-livereload'),
  hash_src = require('gulp-hash-src'),
  htmlmin = require('gulp-htmlmin');
  i18n = require('gulp-html-i18n');
  del = require('del');
  browserSync = require('browser-sync').create();

var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');

let filesToLocalise = [
  '',
  '2019/',
  'pyday/',
  'pyday-second/'
];

require('any-promise/register')('bluebird');

livereload({start : true});

let origSrc = gulp.src;
let PUBLIC_DIR = 'public';
let path = {
  scripts : ['resources/js/**/*.js'],
  less : ['resources/styles/style.less'],
  fonts : ['resources/fonts/**/*.*'],
  docs : ['resources/docs/**/*.*'],
  img : ['resources/img/**/*.*']
};

gulp.src = function () {
  return helpers.fixPipe(origSrc.apply(this, arguments));
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  browserSync.watch(`./**/*.*`).on('change', browserSync.reload);
});

gulp.task('clean', function () {


    return function() {
      return del(PUBLIC_DIR);
    };
});

gulp.task('fonts', function () {
  return gulp.src(path.fonts)
    .pipe(copy())
    .pipe(gulp.dest(PUBLIC_DIR + '/fonts'));
});

gulp.task('docs', function () {
  return gulp.src(path.docs)
    .pipe(copy())
    .pipe(gulp.dest(PUBLIC_DIR + '/docs'));
});

gulp.task('html', function () {
  return gulp.src('resources/html/**/*.*')
    .pipe(copy())
    .pipe(gulp.dest(PUBLIC_DIR + '/html'))
    .pipe(copy())
    .pipe(gulp.dest(''));
});

gulp.task('img', function () {
  return gulp.src(path.img)
    // .pipe(imagemin())
    .pipe(gulp.dest(PUBLIC_DIR + '/img'));
});

gulp.task('script', function () {
  return helpers.es6toes5('resources/js/index.js', 'index.js')
    .pipe(livereload());
});
//
// gulp.task('script-concat', ['script'], function() {
//   return gulp.src([PUBLIC_DIR+'/js/index.js'])
//     .pipe(concat( 'index.js'))
//     .pipe(gulp.dest(PUBLIC_DIR+'/js'))
// });

gulp.task('script-min', ['script'], () => {
  return gulp.src([PUBLIC_DIR + '/js/index.js'])
    .pipe(minify({
      mangle : false,
      drop_debugger : true,
      drop_console : true,
      evaluate : true,
      unsafe : false
    }))
    .pipe(gulp.dest(PUBLIC_DIR + '/js'));
});

gulp.task('less', function () {
  return gulp.src(path.less)
    .pipe(less())
    .pipe(autoprefixer([
      'Firefox > 20',
      'Safari > 8',
      'iOS > 7',
      'ie > 8'
    ]))
    .pipe(cssmin())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(PUBLIC_DIR + '/css'))
    .pipe(livereload());
});

gulp.task('hash', function () {
  return gulp.src('./resources/html/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace : true,
      removeComments : true
    }))
    .pipe(hash_src({
      build_dir : './',
      src_path : './resources/html',
      hash_len : 5,
      exts : ['.js', '.css', '.jpg', '.png', '.svg'],
      query_name : 'v',
      verbose: true
    }))
    .pipe(gulp.dest('./public/html'))
    .pipe(livereload());
});

gulp.task('localize', /*['hash'],*/ function () {
  // var index = './public/html/index.html';
  var dest = './public/html/localized';

  filesToLocalise.map(path => {
    return gulp.src(['./resources/html/' + path + '*.html'])
      .pipe(i18n({
        langDir: './resources/lang/html',
        createLangDirs: true,
        defaultLang: '' + path
      }))
      .pipe(gulp.dest(dest + path));
  })
});

gulp.task('localize-ru', ['localize'], function () {
  filesToLocalise.map(path => {
    gulp.src(['./public/html/localized' + path + '/ru/*.html'])
      .pipe(replace('public/', '../public/'))
      .pipe(replace("LANG: 'ua'", "LANG: 'ru'"))
      .pipe(replace(":lang", "/ru"))
      .pipe(gulp.dest('ru/' + path));
  });
});

gulp.task('localize-en', ['localize-ru'], function () {
  filesToLocalise.map(path => {
    gulp.src(['./public/html/localized' + path + '/en/*.html'])
      .pipe(replace('public/', '../public/'))
      .pipe(replace("LANG: 'ru'", "LANG: 'en'"))
      .pipe(replace(":lang", "/en"))
      .pipe(gulp.dest('en/' + path));
  });
});

gulp.task('localize-default', ['localize-en'], function () {
  filesToLocalise.map(path => {
    gulp.src(['./public/html/localized' + path + '/ua/*.html'])
      .pipe(copy())
      .pipe(replace(':lang', ''))
      .pipe(gulp.dest(path));

    /*gulp.src(['./en/' + path + '/!*.html'])
      .pipe(copy())
      .pipe(gulp.dest('en/' + path));*/
  })

});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('resources/**/*.js', ['script']);
  gulp.watch('resources/styles/**/*.less', ['less']);
  gulp.watch('resources/html/**/*.html', function() {
    return runSequence('html', 'localize-default')
  });
  gulp.watch('resources/lang/**/*.json', function() {
    return runSequence('html', 'localize-default');
  });
});

gulp.task('default', function (callback) {
  runSequence('clean', 'script', 'less', 'html','fonts', 'docs', 'img', /*'hash',*/ 'localize-default', 'browser-sync', 'watch', callback)});

gulp.task('prod', function (callback) {
  runSequence('clean', 'script', 'less', 'html','fonts', 'docs', 'img', /*'hash',*/ 'localize-default',  callback)});
