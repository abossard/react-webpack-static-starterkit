const fs = require('fs')
const Webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
const path = require('path')
const debug = require('debug')
const express = require('express')
const renderToString = require('react-dom/server').renderToString

const log = debug('SERVER')

const React = require('react')
const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const Router = ReactRouter.Router

const App = function (props, context) {
    return <div>HI</div>
}
log(99)
const routes = <Route path="/" component={App}/>

const app = express()
export default function () {
    app.use('/', function (req, res) {
        log('Sending ', req)
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                res.status(200).send(renderToString(<RouterContext {...renderProps} />))
            } else {
                res.status(404).send('Not found')
            }
        })
    });
    log(99)
    app.listen(process.env.PORT || 3000, 'localhost', function (err, result) {
        if (err) {
            console.error(err);
            log(err)
        }
        log('Listening at localhost:3000');
    });

}
