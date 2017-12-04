var gulp = require('gulp');
var imgmin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('delDistFolder', ['icons'], function() {
    return del("./docs");
});

gulp.task('copyGeneralFiles', ['delDistFolder'], function() {
    var pathsToCopy = [
        "./app/**/*",
        "!./app/index.html",
        "!./app/assets/images/**",
        "!./app/assets/styles/**",
        "!./app/assets/scripts/**",
        "!./app/temp",
        "!./app/temp/**"

    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['delDistFolder'], function() {
    return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"])
        .pipe(imgmin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images/"));
});

gulp.task('useminTrigger', ['delDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['delDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger'], function() {
});