const path = require('path'),
    glob = require('glob'),
    _    = require('lodash');

// to-do: make import keeping its directory configuration without clearly assign a path
// e.g. src/applications/web/util/statics/js/layout
const jsBasePath = path.resolve(__dirname, 'src/applications/web');
console.log(jsBasePath);

String.prototype.parentdirname = function () {
    const value = String.raw`${this}`;
    const match = value.match(String.raw`^.*[\\/](.+)[\\/](.+)$`);
    return match ? match[1] : '';
};

String.prototype.filename = function () {
    const value = String.raw`${this}`;
    const match = value.match(String.raw`^(.+)[\\/](.+)$`);
    return match ? match[2] : '';
};

const findSrcDir = function (value) {
    value = String.raw`${value}`;
    const match = value.match(String.raw`^(.+)[\\/]src.+$`);
    return match ? match[1] : '';
};

const targets = _.filter(glob.sync(`${jsBasePath}/**/index.jsx`), (item) => !item.filename().match(/^_/));

const entries = {};
targets.forEach((value) => {
    value = path.resolve(value);
	const replaced = value.replace(__dirname, '').substr(1);
	const key = path.resolve(findSrcDir(replaced), value.parentdirname());
	entries[key] = value;
});

module.exports = {
    mode: 'development',

    entry: entries,

    output: {
        filename: '[name].bundle.min.js'
    },

    module: {
        rules: [
            {
                test: [/\.jsx$/, /\.js$/],
                exclude: /node_modules/,
                use: 'babel-loader' },
			{
				test: [/\.tsx$/, /\.ts$/],
				loader: 'babel-loader!ts-loader',
				include: __dirname,
				exclude: /node_modules/,
			},
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
                        outputPath: 'src/applications/web/util/statics/css/webfonts/'
                    }
                }]
            }
        ]
    },

    devtool: "#source-map",

    resolve: {
        modules: [
            'node_modules',
            'src/applications/web/util/statics/js/src/commons',
            'src/applications/web/util/statics/js/src/commons/functions',
            'src/applications/web/util/statics/js/src/commons/components',
            'src/applications/web/util/statics/js/src/commons/containers',
            'src/applications/web/util/statics/js/src/commons/actions',
            'src/applications/web/util/statics/js/src/commons/reducers',
            'src/applications/web/util/statics/js/src/commons/styles',
            'src/applications/web/util/statics/css'
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /node_modules/,
                    name: 'src/applications/web/util/statics/js/vendor/common',
                    chunks: 'initial',
                    enforce: true
                },
                utilCommon: {
                    test: 'src/applications/web/util/statics/js/src/commons/functions',
                    name: 'src/applications/web/util/statics/js/util-common',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
};