
var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('server', function () {
    return connect.server({
        port: 2222,
        livereload: true
    })
})

gulp.task('watch', function() {
    gulp.watch(['*.css', '*.js', 'index.html'], ['reload'])
})

gulp.task('reload', function () {
    return gulp.src(['index.html'])
        .pipe(connect.reload())
})

gulp.task('default', ['server', 'watch'])
