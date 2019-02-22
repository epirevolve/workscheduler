const gulp = require('gulp');
const filter = require('gulp-filter');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const source = require("vinyl-source-stream");
const webpack = require('webpack');
const webpackStream = require("webpack-stream");
const path = require('path');

const config = require('./webpack.config.js');

const _babelify = () => {
    const f = filter(['!*.map'], {restore: true});
    return webpackStream(config, webpack)
        .pipe(gulp.dest('.'));
}

// jsx babel
gulp.task('babel', async function(){
    gulp.task(_babelify());
});

const _minify = () => {
    return gulp.src(['./**/*.bundle.js', '!./**/*.min.js'])
        .pipe(plumber())
        .pipe(terser())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('.'));
}

// js minify
gulp.task('jsmin', async function() {
    gulp.task(_minify());
});

// change detection
gulp.task('watch', function() {
    gulp.watch(['./**/js/*.js', '!./js/*.min.js'], gulp.series('jsmin'));
    gulp.watch('./**/js/*.jsx', gulp.series('babel'));
});

gulp.task("default", gulp.series("watch"));
