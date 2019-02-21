const gulp = require('gulp');
const source = require("vinyl-source-stream");
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const babelify = require('babelify');
const webpack = require('webpack');
const webpackStream = require("webpack-stream");
const path = require('path');
const filter = require('gulp-filter');

const _babelify = (folder, file) => {
    const _path = `./workscheduler/applications/web/models/${folder}/statics/js`;
    const f = filter(['*.min.js'], {restore: true});
    return webpackStream(
    {
        mode: 'development',
        entry: _path + '/' + file + '.jsx',

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
                use: ['style-loader', 'css-loader'] }
            ]
        },

        devtool: "#source-map",

        resolve: {
            modules: [
                'node_modules',
                path.resolve('.'),
                path.join(path.resolve('.'), 'workscheduler/applications/web/util/statics/js'),
                path.join(path.resolve('.'), 'workscheduler/applications/web/util/statics/css')
            ],
            extensions: ['.js', '.jsx', '.css']
        },

        plugins: []
    }, webpack)
    .pipe(f)
    .pipe(gulp.dest(_path))
    .pipe(f.restore)
    .pipe(gulp.dest(_path));
}

const _babelify2 = (folder, file) => {
    const _path = `./workscheduler/applications/web/models/${folder}/statics/js`;
    const f = filter(['*.min.js'], {restore: true});
    return webpackStream(
    {
        mode: 'development',
        entry: _path + `/src/${file}/index.jsx`,

        output: {
            filename: file + '.min.js'
        },

        module: {
            rules: [
            {
                test: [/\.jsx$/, /\.js$/],
                exclude: /node_modules/,
                use: 'babel-loader'},
            { test: /\.css$/,
                use: ['style-loader', 'css-loader'] }
            ]
        },

        devtool: "#source-map",

        resolve: {
            modules: [
                'node_modules',
                path.resolve('.'),
                path.join(path.resolve('.'), 'workscheduler/applications/web/util/statics/js'),
                path.join(path.resolve('.'), 'workscheduler/applications/web/util/statics/css')
            ],
            extensions: ['.js', '.jsx', '.css']
        },

        plugins: []
    }, webpack)
    .pipe(f)
    .pipe(gulp.dest(_path))
    .pipe(f.restore)
    .pipe(gulp.dest(_path));
}

gulp.task('babel-scheduler', async function () {
    const folder = 'scheduler';

    gulp.task(_babelify(folder, 'request'));
    gulp.task(_babelify2(folder, 'request-public'));
});

gulp.task('babel-user', async function () {
    const folder = 'user';

    gulp.task(_babelify(folder, 'auth'));
});

// jsx reactify
gulp.task('babel', async function(){
    gulp.task('babel-user');
    gulp.task('babel-scheduler');
});

const _minify = (folder) => {
    const _path = `./workscheduler/applications/web/models/${folder}/statics/js`;
    return gulp.src([_path + '/*.js', '!' + _path + '/*.min.js'])
        .pipe(plumber())
        .pipe(terser())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(_path));
}

// js minify
gulp.task('jsmin', async function() {
    gulp.task(_minify('user'));
    gulp.task(_minify('scheduler'));
});

// change detection
gulp.task('watch', function() {
    gulp.watch(['./**/js/*.js', '!./js/*.min.js'], gulp.series('jsmin'));
    gulp.watch('./**/js/*.jsx', gulp.series('brow'));
});

gulp.task("default", gulp.series("watch"));
