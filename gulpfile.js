const gulp = require('gulp');
const browserify = require('browserify');
const source = require("vinyl-source-stream");
const reactify = require('reactify');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

const doBrowserify = (folder, file) => {
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
        .pipe(source(file + '.min.js'))
        .pipe(gulp.dest(path));
}

gulp.task('brow-scheduler', async function () {
    const folder = 'scheduler';

    gulp.task(doBrowserify(folder, 'request'));
    gulp.task(doBrowserify(folder, 'request-public'));
});

gulp.task('brow-user', async function () {
    const folder = 'user';

    gulp.task(doBrowserify(folder, 'auth'));
});

// jsx reactify
gulp.task('brow', async function(){
    gulp.task('brow-user');
    gulp.task('brow-scheduler');
});

const doMinify = (folder) => {
    const path = `./workscheduler/applications/web/models/${folder}/statics/js`;
    return gulp.src([path + '/*.js', '!' + path + '/*.min.js'])
        .pipe(plumber())
        .pipe(terser())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(path));
}

// js minify
gulp.task('jsmin', async function() {
    gulp.task(doMinify('user'));
});

// change detection
gulp.task('watch', function() {
    gulp.watch(['./**/js/*.js', '!./js/*.min.js'], gulp.series('jsmin'));
    gulp.watch('./**/js/*.jsx', gulp.series('brow'));
});

gulp.task("default", gulp.series("watch"));
