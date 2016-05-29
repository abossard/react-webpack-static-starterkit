const webpack = require('webpack');
const path = require('path');
const targetPath = path.join(__dirname, 'dist');

//test
module.exports = {
    name: 'browser',
    // Entry point for static analyzer:
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './src/page.jsx'
    ],

    output: {
        path: targetPath,
        filename: 'bundle.js',
        publicPath: '/build/',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.jsx?$/, loaders: ['babel-loader'] },
            { test: /\.html$/, loader: 'raw' }
        ]
    }
};