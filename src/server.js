const fs = require('fs'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('../webpack.config');


// create the index.html to be used by webpack
// var renderHtml = require('./render_html');
// fs.writeFileSync('dev/index.html', renderHtml('/'));

var server = new WebpackDevServer(webpack(config), {
    contentBase: config.output.publicPath,
    publicPath: config.output.publicPath,
    hot: true
});
// allow server to render any route
server.use('/', function (req, res) {
    res.send('hi');
});

server.listen(3000, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});