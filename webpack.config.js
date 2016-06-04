const webpack = require('webpack');
const path = require('path');
const targetPath = path.join(__dirname, 'build');

//test
module.exports = {
    devtool: 'source-map',
    name: 'browser',
    // Entry point for static analyzer:
    entry: [
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/dev-server',
        './src/client.js'
    ],

    output: {
        path: targetPath,
        filename: 'bundle.js',
        publicPath: '/static/',
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
            { test: /\.jsx?$/, loaders: ['babel-loader'],  exclude: /node_modules/ },
            { test: /\.html$/, loader: 'raw' }
        ]
    }
};