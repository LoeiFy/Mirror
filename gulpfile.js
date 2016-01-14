
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect');

// mode=dev gulp
var env = process.env.mode;

gulp.task('server', function () {
    if (env === 'deploy') return;

    return connect.server({
        port: 2222,
        livereload: true
    })
})

gulp.task('watch', ['css', 'js', 'concat'], function() {
    if (env === 'deploy') return;

    gulp.watch(['assets/mirror.css', 'assets/mirror.js', 'index.html'], ['reload'])
})

gulp.task('reload', ['css', 'js', 'concat'], function () {
    return gulp.src(['index.html'])
        .pipe(connect.reload())
})

gulp.task('concat', function() {
    return gulp.src(['assets/zepto.js', 'assets/highlight.js', 'assets/marked.js'])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('css', function() {
    return gulp.src(['assets/mirror.css'])
        .pipe(gulpif(env === 'deploy', cssmin()))
        .pipe(gulp.dest('dist/'))
})

gulp.task('js', function() {
    return gulp.src(['assets/mirror.js'])
        .pipe(gulpif(env === 'deploy', uglify()))
        .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['server', 'watch'])
