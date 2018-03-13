const webpack = require('webpack');
const path = require('path'); // nodejs dependency when dealing with paths
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'), // ouput path
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // files ending with .js
                exclude: /node_modules/, // exclude the node_modules directory
                loader: "babel-loader" // use this (babel-core) loader
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join('./public', 'index.html'),
            inject: 'body'
        })
    ]
}

module.exports = config;