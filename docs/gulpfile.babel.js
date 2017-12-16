'use strict'
import gulp from 'gulp' // call gulp.
import  webpack from 'webpack' // webpack.
import  webpackStream from 'webpack-stream' // webpack PlugIn.
import  webpackConfig from './webpack/webpack.config' // webpack config file.
import  plumber from 'gulp-plumber' // case, error task. don't stop watch plugin.
import  sass from 'gulp-sass' // sass file compile plugin.
import  sourcemaps from 'gulp-sourcemaps' // write sourcemaps.
import  gutil from 'gulp-util' // gulp-util plugin.
import  imageMin from 'gulp-imagemin' // images compression plugin.
import  pngImageMin from 'imagemin-pngquant' // png images compression plugin.
import  changed from 'gulp-changed' // only change file watch plugin.
import  autoprefixer from 'gulp-autoprefixer' // add vendor prefix in CSS automatically.
import  cssmin from 'gulp-cssmin' // CSS File Compression.
import  jsmin from 'gulp-uglify' // JS File Compression.
import  rename from 'gulp-rename' // File Rename PlugIn.
import  del from 'del' // File Delete, Not Gulp PlugIn.
import  ftp from 'vinyl-ftp' // ftp plugin.
import  sftp from 'gulp-sftp' // sftp plugin.
import  browserSync from 'browser-sync' // local browser sync plugin.

const  noCompressionImagesFold = (['noCompressionImages/*.jpg', 'noCompressionImages/*.jpeg', 'noCompressionImages/*.png', 'noCompressionImages/*.gif', 'noCompressionImages/*.svg']) // no compression images fold.
const  compressionImageFold = ('images/') // finish compression images fold.
const  upLoadFileWrite = (['*.html', 'css/*.css', 'css/**/*', 'css/*.css.map', 'sass/*.scss', 'js/*.js', 'images/*', 'font/*', 'maps']) // upload file write.
const  notUpLoadFileWrite = (['!**/.DS_Store', '!node_modules/**/*']) // don't upload file write.
const  upLoadFile = upLoadFileWrite.concat(notUpLoadFileWrite) //ftp upload file. variable upLoadFileWrite concatenate variable notUpLoadFileWrite.

// webpack.
gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('js/'));
});

// JS File Compression.
gulp.task('jsmin', () => {
  return gulp.src('js/core.js')
    .pipe(jsmin({
      output: {
        comments: /^!/
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js/'));
});

// sass compile.
gulp.task('sass', () => {
  return gulp.src('sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('css/'));
});

// add vendor prefix automatically.
gulp.task('autoprefixer', () => {
  return gulp.src('css/default.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'));
});

// CSS File Compression.
gulp.task('cssmin', () => {
  return gulp.src('css/default.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css/'));
});

// compression images.
gulp.task('compressionImages', () => {
  return gulp.src(noCompressionImagesFold)
    .pipe(plumber())
    .pipe(changed(compressionImageFold))
    .pipe(imageMin({
      use: [pngImageMin({
        quality: '60-80',
        speed: 4
      })]
    }))
    .pipe(gulp.dest(compressionImageFold));
});

// HTML File Rename PHP File. Setting at The Work Start.
gulp.task('rename', () => {
  return gulp.src('index.html')
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest('.'));
});

// HTML File & .DS_Store Delete. Setting at The Work Start.
gulp.task('delete', cb =>  {
  return del(['**/.DS_Store'], cb);
});

// local browser connect & sync.
gulp.task('browserSync',  () => {
  return browserSync({
    browser: 'google chrome',
    notify: false,
    server: {
      baseDir: '.',
      index: 'index.html'
    }
  });
});

// file save's local browser reload.
gulp.task('localBrowserReload', () => {
  return browserSync.reload();
});

// ftp upload.
gulp.task('ftpUpLoad', () => {
  const ftpConnect = ftp.create({
    host: '***',
    user: '***',
    password: '***',
    parallel: 7,
    log: gutil.log
  })
  gulp.src(upLoadFile, {
      base: '.',
      buffer: false
    })
    .pipe(ftpConnect.newer('/'))
    .pipe(ftpConnect.dest('/'));
});

// gulp default task, terminal command 'gulp'.
gulp.task('default', ['browserSync'], () => { // first task, local server connect & local browser sync.
  gulp.watch(['base/*', 'tags/*', 'js/flux/*.js'], ['webpack']); // JS File webpack.
  gulp.watch('js/core.js', ['jsmin']); // watching change's JS flie, File Compression.
  gulp.watch('sass/*.scss', ['sass']); // watching sass file save's auto compile.
  gulp.watch('css/*.css', ['autoprefixer']); // watching change's CSS flie. add vendor prefix automatically.
  gulp.watch('css/*.css', ['cssmin']); // watching change's CSS flie, File Compression.
  gulp.watch(noCompressionImagesFold, ['compressionImages']); // watching noCompressionImages fold changed images, compression images.
  //gulp.watch('**/*', ['rename']); // watching change's HTML flie. Rename PHP file.
  //gulp.watch('**/*', ['delete']); // watching rename PHP file. delet HTML file.
  //gulp.watch(upLoadFile, ['ftpUpLoad']); // watching file save's auto ftp upload.
  gulp.watch(upLoadFile, ['localBrowserReload']); // watching file save's local browser reload.
});
