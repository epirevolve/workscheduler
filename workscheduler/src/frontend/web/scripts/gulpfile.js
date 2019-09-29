const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require("webpack-stream");

const config = require('./webpack.config.js');

const _babelify = () => webpackStream(config, webpack).pipe(gulp.dest('.'));

// jsx babel
gulp.task('babel', async () => {
    await _babelify();
});

// change detection
gulp.task('watch', () => gulp.watch([ './**/*.js', './**/*.jsx', '!./*.min.js' ], {interval: 1000, usePolling: true}, gulp.series('babel')));

gulp.task("default", gulp.series("watch"));
