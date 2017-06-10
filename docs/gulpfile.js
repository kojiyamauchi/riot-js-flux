var gulp = require('gulp'), // call gulp.
  webpack = require('webpack'), // webpack.
  webpackStream = require('webpack-stream'), // webpack PlugIn.
  webpackConfig = require('./webpack/webpack.config'), // webpack config file.
  plumber = require('gulp-plumber'), // case, error task. don't stop watch plugin.
  sass = require('gulp-sass'), // sass file compile plugin.
  sourcemaps = require('gulp-sourcemaps'), // write sourcemaps.
  gutil = require('gulp-util'), // gulp-util plugin.
  imageMin = require('gulp-imagemin'), // images compression plugin.
  pngImageMin = require('imagemin-pngquant'), // png images compression plugin.
  changed = require('gulp-changed'), // only change file watch plugin.
  noCompressionImagesFold = (['noCompressionImages/*.jpg', 'noCompressionImages/*.jpeg', 'noCompressionImages/*.png', 'noCompressionImages/*.gif', 'noCompressionImages/*.svg']), // no compression images fold.
  compressionImageFold = 'images/', // finish compression images fold.
  autoprefixer = require('gulp-autoprefixer'), // add vendor prefix in CSS automatically.
  cssmin = require('gulp-cssmin'), // CSS File Compression.
  jsmin = require('gulp-uglify'), // JS File Compression.
  rename = require('gulp-rename'), // File Rename PlugIn.
  del = require('del'), // File Delete, Not Gulp PlugIn.
  ftp = require('vinyl-ftp'), // ftp plugin.
  sftp = require('gulp-sftp'), // sftp plugin.
  using_PHP_LocalServerConnect = require('gulp-connect-php'), // using php local server connect plugin.
  browserSync = require('browser-sync'), // local browser sync plugin.
  upLoadFileWrite = (['index.php', '*.html', 'css/*.css', 'css/**/*', 'css/*.css.map', 'sass/*.scss', 'js/*.js', 'images/*', 'font/*', 'maps']), // upload file write.
  notUpLoadFileWrite = (['!css/ie.css', '!css/print.css', '!css/screen.css', '!css/ie.css.map', '!css/print.css.map', '!css/screen.css.map', '!sass/ie.scss', '!sass/print.scss', '!sass/screen.scss', '!**/.DS_Store', '!node_modules/**/*']), // don't upload file write.
  upLoadFile = upLoadFileWrite.concat(notUpLoadFileWrite); //ftp upload file. variable upLoadFileWrite concatenate variable notUpLoadFileWrite.

// webpack.
gulp.task('webpack', function () {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('js/'));
});

// JS File Compression.
gulp.task('jsmin', function () {
  gulp.src('js/core.js')
    .pipe(jsmin({
      preserveComments: 'some'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js/'));
});

// sass compile.
gulp.task('sass', function () {
  gulp.src('sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('css/'));
});

// add vendor prefix automatically.
gulp.task('autoprefixer', function () {
  gulp.src('css/default.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'));
});

// CSS File Compression.
gulp.task('cssmin', function () {
  gulp.src('css/default.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css/'));
});

// compression images.
gulp.task('compressionImages', function () {
  gulp.src(noCompressionImagesFold)
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
gulp.task('rename', function () {
  gulp.src('index.html')
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest('.'));
});

// HTML File & .DS_Store Delete. Setting at The Work Start.
gulp.task('delete', function (cb) {
  del(['**/.DS_Store'], cb);
});

// local browser connect & sync.
gulp.task('browserSync', function () {
  using_PHP_LocalServerConnect.server({
    port: 8080,
    bin: '/Applications/MAMP/bin/php/php5.6.10/bin/php', // PHP pass.
    ini: '/Applications/MAMP/bin/php/php5.6.10/conf/php.ini' // PHP.ini pass.
  }, function () {
    browserSync({
      proxy: 'localhost:8080',
      notify: false,
      browser: 'google chrome'
    });
  });
});

// file save's local browser reload.
gulp.task('localBrowserReload', function () {
  browserSync.reload();
});

// ftp upload.
gulp.task('ftpUpLoad', function () {
  var ftpConnect = ftp.create({
    host: '***',
    user: '***',
    password: '***',
    parallel: 7,
    log: gutil.log
  });
  gulp.src(upLoadFile, {
      base: '.',
      buffer: false
    })
    .pipe(ftpConnect.newer('/'))
    .pipe(ftpConnect.dest('/'));
});

// gulp default task, terminal command 'gulp'.
gulp.task('default', ['browserSync'], function () { // first task, local server connect & local browser sync.
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
