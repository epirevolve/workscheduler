var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

// jsx reactify
gulp.task('browserify', function(){
    var b = browserify({
        entries: ['./workscheduler/applications/web/models/user/statics/js/auth.jsx'],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
    });
    return b.bundle()
        .pipe(source('auth.min.js'))
        .pipe(gulp.dest('./workscheduler/applications/web/models/user/statics/js'));
});

// js minify
gulp.task('js-minify', function() {
    gulp.src(['./**/js/*.js', '!./**/js/*.min.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./html/js/'));
});

// change detection
gulp.task('watch', function() {
    gulp.watch(['./**/js/*.js', '!./js/*.min.js'], gulp.series('js-minify'));
    gulp.watch('./**/js/*.jsx', gulp.series('browserify'));
});

gulp.task("default", gulp.series("watch"));
