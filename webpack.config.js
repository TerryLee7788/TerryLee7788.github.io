const path = require('path'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    JS_DEV_PATH = `${__dirname}/__dev/js`;

module.exports = {
    entry: {
        global: path.resolve(JS_DEV_PATH, './vendor/_global.js'),
        index: path.resolve(JS_DEV_PATH, './pages/_index.js'),
        slider: path.resolve(JS_DEV_PATH, './pages/_slider.js'),
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: './js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                use: {
                    loader: 'file-loader?publicPath=../&name=[hash].[ext]'
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
        }),
    ],
    mode: 'development',
    watch: true,
};
