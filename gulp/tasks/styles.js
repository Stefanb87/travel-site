var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix();

gulp.task("styles", function() {
    return gulp.src('./app/assets/styles/style.less')
        .pipe(less({
            plugins: [autoprefix]
          }))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
});