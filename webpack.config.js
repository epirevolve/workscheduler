const path = require('path');

const _utilPath = './workscheduler/source/applications/web/util/statics/js';
const _path = (folder) => `./workscheduler/source/applications/web/models/${folder}/statics/js`;
const _userPath = _path('user');
const _operatorPath = _path('operator');
const _schedulerPath = _path('scheduler');
const _schedulePath = _path('schedule');

module.exports = {
    mode: 'production',

    entry: {
        'workscheduler/source/applications/web/util/statics/js/layout': path.join(_utilPath, '/src/layout/index.jsx'),
        'workscheduler/source/applications/web/util/statics/js/main-menu': path.join(_utilPath, '/src/menu/index.jsx'),
        'workscheduler/source/applications/web/models/user/statics/js/auth': path.join(_userPath, '/src/auth/index.jsx'),
        'workscheduler/source/applications/web/models/user/statics/js/main-teams': path.join(_userPath, '/src/main-teams/index.jsx'),
        'workscheduler/source/applications/web/models/user/statics/js/user': path.join(_userPath, '/src/user/index.jsx'),
        'workscheduler/source/applications/web/models/user/statics/js/users': path.join(_userPath, '/src/users/index.jsx'),
        'workscheduler/source/applications/web/models/operator/statics/js/operator': path.join(_operatorPath, '/src/operator/index.jsx'),
        'workscheduler/source/applications/web/models/operator/statics/js/operators': path.join(_operatorPath, '/src/operators/index.jsx'),
        'workscheduler/source/applications/web/models/operator/statics/js/skills': path.join(_operatorPath, '/src/skills/index.jsx'),
        'workscheduler/source/applications/web/models/scheduler/statics/js/request-non-public': path.join(_schedulerPath, '/src/request-non-public/index.jsx'),
        'workscheduler/source/applications/web/models/scheduler/statics/js/request-public': path.join(_schedulerPath, '/src/request-public/index.jsx'),
        'workscheduler/source/applications/web/models/scheduler/statics/js/scheduler-menu': path.join(_schedulerPath, '/src/scheduler-menu/index.jsx'),
        'workscheduler/source/applications/web/models/scheduler/statics/js/scheduler-monthly-setting': path.join(_schedulerPath, '/src/scheduler-monthly-setting/index.jsx'),
        'workscheduler/source/applications/web/models/scheduler/statics/js/scheduler-basic-setting': path.join(_schedulerPath, '/src/scheduler-basic-setting/index.jsx'),
        'workscheduler/source/applications/web/models/scheduler/statics/js/scheduler-yearly-setting': path.join(_schedulerPath, '/src/scheduler-yearly-setting/index.jsx'),
        'workscheduler/source/applications/web/models/schedule/statics/js/schedule-operator': path.join(_schedulePath, '/src/schedule-operator/index.jsx'),
        'workscheduler/source/applications/web/models/schedule/statics/js/schedule-admin': path.join(_schedulePath, '/src/schedule-admin/index.jsx'),
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
                        outputPath: 'workscheduler/source/applications/web/util/statics/css/webfonts/'
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
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/js'),
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/js/src/commons/functions'),
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/js/src/commons/components'),
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/js/src/commons/containers'),
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/js/src/commons/actions'),
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/js/src/commons/reducers'),
            path.join(path.resolve('.'), 'workscheduler/source/applications/web/util/statics/css')
        ],
        extensions: ['.js', '.jsx', '.css']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /node_modules/,
                    name: 'workscheduler/source/applications/web/util/statics/js/vendor/common',
                    chunks: 'initial',
                    enforce: true
                },
                utilCommon: {
                    test: 'workscheduler/source/applications/web/util/statics/js/src/commons/functions',
                    name: 'workscheduler/source/applications/web/util/statics/js/util-common',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
}