const webpack = require('webpack');
const path = require('path');
const targetPath = path.join(__dirname, 'dist');


module.exports = {
    name: 'browser',
    // Entry point for static analyzer:
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './src/page.jsx'
    ],

    output: {
        path: outputPath,
        filename: 'bundle.js',
        publicPath: '',
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
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx'] },
            { test: /\.html$/, loader: 'raw' }
        ]
    }
};