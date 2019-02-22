const path = require('path');

const _path = (folder) => `./workscheduler/applications/web/models/${folder}/statics/js`;
const _userPath = _path('user');
const _schedulerPath = _path('scheduler');

module.exports = {
    mode: 'production',
    entry: {
        'workscheduler/applications/web/models/user/statics/js/auth': path.join(_userPath, '/src/auth/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/request-non-public': path.join(_schedulerPath, '/src/request-non-public/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/request-public': path.join(_schedulerPath, '/src/request-public/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/scheduler-calendar': path.join(_schedulerPath, '/src/scheduler-calendar/index.jsx'),
    },

    output: {
        filename: '[name].bundle.min.js'
    },

    module: {
        rules: [
        {
            test: [/\.jsx$/, /\.js$/],
            exclude: /node_modules/,
            use: 'babel-loader' },
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

    optimization: {
        splitChunks: {
            name: 'workscheduler/applications/web/util/statics/js/vendor/common',
            chunks: 'initial',
        }
    },

    plugins: []
}