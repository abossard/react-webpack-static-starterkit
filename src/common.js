import React from 'react'
import {match, RouterContext, Route, IndexRoute, Router, Link} from 'react-router'
import R from 'ramda'
import debug from 'debug'
import DocumentTitle from 'react-document-title'
const log = debug('COMMON')

export const App = function (props) {
    return <div>
        {props.title}
        <ul>
            {props.directories.map(directory => <li key={directory.name}><Link to={directory.name}>{directory.name}</Link></li>) }
        </ul>
        {props.children}
    </div>
}

export const Page = function (props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

const wrapTitle = R.curry(function (title, InnerComponent, props) {
    log('WRAPTITLE: ', props.title)
    return <DocumentTitle title={title}>
        <InnerComponent {...Object.assign({}, { title }, props) }/>
    </DocumentTitle>
})

const ingestDefaultProps = R.curry(function (defaultProps, InnerComponent, props) {
    return <InnerComponent {...Object.assign({}, defaultProps, props) }/>
})

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