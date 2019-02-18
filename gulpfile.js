const gulp = require('gulp');
const source = require("vinyl-source-stream");
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const babelify = require('babelify');
const webpack = require('webpack');
const webpackStream = require("webpack-stream");

const doBrowserify = (folder, file) => {
    const path = `./workscheduler/applications/web/models/${folder}/statics/js`;
    return webpackStream(
    {
        mode: 'development',
        entry: path + '/' + file + '.jsx',

        output: {
            filename: file + '.min.js'
        },

        module: {
            rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'},
            { test: /\.css$/,
                use: 'css-loader' }
            ]
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },

        plugins: []
    }, webpack)
    .pipe(terser())
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
    gulp.task(doMinify('scheduler'));
});

// change detection
gulp.task('watch', function() {
    gulp.watch(['./**/js/*.js', '!./js/*.min.js'], gulp.series('jsmin'));
    gulp.watch('./**/js/*.jsx', gulp.series('brow'));
});

gulp.task("default", gulp.series("watch"));
