var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

gulp.task('css', function () {
    gulp.src('src/stylus/main.styl')
        .pipe(stylus({compress: true, paths: ['src/stylus']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'))
				.pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function() {
  gulp.src('src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bower-skrollr/skrollr.min.js',
    'scripts/jquery.viewportchecker.js'
  ])
    // concat pulls all our files together before minifying them
    .pipe( concat('output.min.js') )
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
});


gulp.task('scripts', function(){ 
    var target = gulp.src('src/jade/index.jade');
    var sources = gulp.src(['src/scripts/*.js'], {read: false});
    var exportString = 'public/js';
    return target.pipe(inject(sources, {
                ignorePath: 'src/scripts',
                addPrefix: exportString,
                addRootSlash: false
            }))
    .pipe(gulp.dest('src/jade/'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './images';
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin({
			progressive: true,
			optimizationLevel: 7
		}))
    .pipe(gulp.dest(imgDst));
});

gulp.task('copy', function(){
  gulp.src('src/scripts/*.js')
    .pipe(gulp.dest('./public/js'));
  
  gulp.src('src/scripts/md/*.js')
    .pipe(gulp.dest('./public/js/md'));
});

gulp.task('jshint', function() {
  gulp.src('src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
   gulp.watch('src/stylus/**/*.styl', ['css']);
   gulp.watch('src/jade/*.jade', ['html']);
   gulp.watch('src/scripts/*.js', ['html', 'scripts']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['imagemin', 'css', 'scripts', 'copy', 'html', 'js']);
gulp.task('start', ['browser-sync', 'watch']);