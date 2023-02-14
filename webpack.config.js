const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, 'src', 'pages', 'index.js')
    },
    devtool: 'inline-source-map',
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
        {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            use: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { importLoaders: 1 }
                },
                'postcss-loader'
            ],
        },
        {
            // регулярное выражение, которое ищет все файлы с такими расширениями
            test: /\.(png|svg|jpeg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource'
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        watchFiles: ['*/**/*.html']
    }
}