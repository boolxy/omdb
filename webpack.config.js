const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DIR_MAIN = __dirname;
const DIR_SOURCE = 'src';

module.exports = {
    entry: path.resolve(DIR_SOURCE, 'index.js'),
    output: {
        path: path.resolve(DIR_MAIN, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(DIR_SOURCE, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new Dotenv({
            path: path.resolve(DIR_MAIN, '.env')
        })
    ]
};