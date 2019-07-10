const path = require('path'),
      glob = require('glob'),
      _    = require('lodash');

// to-do: make import keeping its directory configuration without clearly assign a path
// e.g. src/applications/web/util/statics/js/layout
const jsBasePath = path.resolve(__dirname, 'src');
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

const targets = _.filter(glob.sync(`${jsBasePath}/**/index.jsx`), (item) => !item.filename().match(/^_/));

const entries = {};
targets.forEach((value) => {
    value = path.resolve(value);
    const key = value.parentdirname();
    entries[`../statics/js/${key}`] = value;
});

entries['../statics/js/common/extension'] = [
    path.resolve('./src/common/functions/dateExtension.js'),
    path.resolve('./src/common/functions/stringExtension.js')
];

module.exports = {
    mode: 'development',

    entry: entries,

    output: {
        filename: '[name].bundle.min.js',
    },

    module: {
        rules: [
            {
                test: [ /\.jsx$/, /\.js$/ ],
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: [ /\.tsx$/, /\.ts$/ ],
                loader: 'babel-loader!ts-loader',
                exclude: /node_modules/,
            },
            {
                test: [/\.css$/],
                loaders : [ 'style-loader', 'css-loader' ] },
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
                        outputPath: '../statics/css/webfonts/'
                    }
                }]
            }
        ]
    },

    devtool: "#source-map",

    resolve: {
        modules: [
            'node_modules',
            'src/common',
            'src/common/functions',
            'src/common/components',
            'src/common/containers',
            'src/common/actions',
            'src/common/reducers',
            'src/common/styles',
        ],
        extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css' ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /node_modules/,
                    name: '../statics/js/vendor/common',
                    chunks: 'initial',
                    enforce: true
                },
                utilCommon: {
                    test: 'src/commons/functions',
                    name: '../statics/js/common/util',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
};