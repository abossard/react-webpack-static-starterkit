import fs from 'fs'
import Webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import path from 'path'
import debug from 'debug'
import express from 'express'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

const log = debug('SERVER')

import React from 'react'
import {match, RouterContext, Route, IndexRoute, Router, Link} from 'react-router'

const App = function (props) {
    return <div>APP</div>
}

const Home = function (props) {
    return <div>HOME</div>
}
const Index = function (props) {
    return <html>
        <head>
            <title>{props.title}</title>
        </head>
        <body>
            <div className='content' dangerouslySetInnerHTML={{ __html: props.html }}/>
        </body>
    </html>
}
const renderPage = function (renderProps, isRenderStatic = false) {
    const routerContext = <RouterContext {...renderProps}/>
    return renderToStaticMarkup(<Index title={getTitleForPath(renderProps.location.pathname) } html={ (isRenderStatic ? renderToStaticMarkup : renderToString)(routerContext) }/>)
}

const getTitleForPath = function (path) {
    return `Path: ${path}`
}
const routes2 = <Route component={App}>
    <IndexRoute component={Home}/>
</Route>

const routes = {
    path: '/',
    component: App
}

const app = express()

app.get('/', function (req, res) {
    log('URL: ', req.url)
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        log('ERROR: ', error)
        log('RENDER PROPS: ', renderProps)
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            res.status(200).send(renderPage(renderProps, true))
        } else {
            res.status(404).send('Not found hihi')
        }
    })
});

app.listen(process.env.PORT || 3000, 'localhost', function (err, result) {
    if (err) {
        console.error(err);
        log(err)
    }
    log('Listening at localhost:3000');
});

