const webpack = require('webpack');
const path = require('path'); // nodejs dependency when dealing with paths
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // require webpack plugin
const fs = require('fs-extra');

const extractCSS = new ExtractTextWebpackPlugin({ filename: 'css/[name].[chunkhash].css' })
copyPublicFolder();

let config = {
    entry: {
        app: './src/index.js',
        apptabs: './src/components/AppTabs/AppTabs.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'), // ouput path
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath: '/'
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
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } }
                    ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join('./public', 'index.html'),
            inject: 'body',
            favicon: './public/favicon.ico',
        }),

        extractCSS
    ]
}

function copyPublicFolder() {
    fs.copySync('./public', './dist', {
      dereference: true,
      filter: file => file !== 'index.html',
    });
  }

module.exports = config;