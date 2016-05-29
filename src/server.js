import fs from 'fs'
import Webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
import path from 'path'
import debug from 'debug'
import express from 'express'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import DocumentTitle from 'react-document-title'
import R from 'ramda'

const log = debug('SERVER')

import React from 'react'
import {match, RouterContext, Route, IndexRoute, Router, Link} from 'react-router'

export const App = function (props) {
    return <div>
        {props.title}
        <ul>
            {props.directories.map(directory => <li><Link to={directory.name}>{directory.name}</Link></li>) }
        </ul>
        {props.children}
    </div>
}

export const Page = function (props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

const ingestDefaultProps = R.curry(function (defaultProps, InnerComponent, props) {
    return <InnerComponent {...Object.assign({}, defaultProps, props) }/>
})

const wrapTitle = R.curry(function (title, InnerComponent, props) {
    log('WRAPTITLE: ', props.title)
    return <DocumentTitle title={title}>
        <InnerComponent {...Object.assign({}, { title }, props) }/>
    </DocumentTitle>
})

const Index = function (props) {
    const scripts = props.scripts || []
    const styles = props.styles || []
    return <html>
        <head>
            {styles.map(url => <link type="text/css" href={url} rel="stylesheet" />) }
            <title>{props.title}</title>
        </head>
        <body>
            <div className='content' dangerouslySetInnerHTML={{ __html: props.html }}/>
            {scripts.map(url => <script src={url} type="application/javascript"/>) }
        </body>
    </html>
}
const renderPage = function (renderProps, isRenderStatic = false) {
    const html = (isRenderStatic ? renderToStaticMarkup : renderToString)(<RouterContext {...renderProps}/>)
    return renderToStaticMarkup(<Index title={DocumentTitle.rewind() } html={ html }/>)
}
export const directories = [
    { name: 'home' },
    { name: 'about' },
    { name: 'support' },
]
export const routes = {
    path: '/',
    component: ingestDefaultProps({ directories }, wrapTitle('Static FOR THE WIN', App)),
    childRoutes: directories.map(directory => ({
        path: directory.name,
        component: wrapTitle(directory.name, Page)
    }))
}

const app = express()

app.get('*', function (req, res) {
    log('URL: ', req.url)
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
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