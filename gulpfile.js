var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

const doBrowserify = function (folder, file) {
    const path = `./workscheduler/applications/web/models/${folder}/statics/js`;
    const b = browserify({
        entries: [path + '/' + file + '.jsx'],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
    });
    return b.bundle()
        .pipe(source(file + '.js'))
        .pipe(gulp.dest(path));
}

gulp.task('browserify-scheduler', async function () {
    const folder = 'scheduler';

    gulp.task(doBrowserify(folder, 'request-public'));
});

gulp.task('browserify-user', async function () {
    const folder = 'user';

    gulp.task(doBrowserify(folder, 'auth'));
});

// jsx reactify
gulp.task('browserify', async function(){
    gulp.task('browserify-user');
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
