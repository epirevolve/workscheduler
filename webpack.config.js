const path = require('path');

const _path = (folder) => `./workscheduler/applications/web/models/${folder}/statics/js`;
const _userPath = _path('user');
const _operatorPath = _path('operator');
const _schedulerPath = _path('scheduler');

module.exports = {
    mode: 'production',
    entry: {
        'workscheduler/applications/web/models/user/statics/js/auth': path.join(_userPath, '/src/auth/index.jsx'),
        'workscheduler/applications/web/models/user/statics/js/affiliations': path.join(_userPath, '/src/affiliations/index.jsx'),
        'workscheduler/applications/web/models/user/statics/js/user': path.join(_userPath, '/src/user/index.jsx'),
        'workscheduler/applications/web/models/user/statics/js/users': path.join(_userPath, '/src/users/index.jsx'),
        'workscheduler/applications/web/models/operator/statics/js/operator': path.join(_operatorPath, '/src/operator/index.jsx'),
        'workscheduler/applications/web/models/operator/statics/js/operators': path.join(_operatorPath, '/src/operators/index.jsx'),
        'workscheduler/applications/web/models/operator/statics/js/skills': path.join(_operatorPath, '/src/skills/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/request-non-public': path.join(_schedulerPath, '/src/request-non-public/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/request-public': path.join(_schedulerPath, '/src/request-public/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/scheduler-monthly-setting': path.join(_schedulerPath, '/src/scheduler-monthly-setting/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/scheduler-basic-setting': path.join(_schedulerPath, '/src/scheduler-basic-setting/index.jsx'),
        'workscheduler/applications/web/models/scheduler/statics/js/scheduler-yearly-setting': path.join(_schedulerPath, '/src/scheduler-yearly-setting/index.jsx'),
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
            { test: [/\.css$/],
                use: ['style-loader', 'css-loader'] },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'workscheduler/applications/web/util/statics/css/webfonts/'
                    }
                }]
            }
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