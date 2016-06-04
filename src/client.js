import React from 'react'
import { render } from 'react-dom'
import { routes } from './common.js'
import { browserHistory, Router } from 'react-router'
render((
    <Router
        routes={routes}
        history={ browserHistory}
        />
), document.getElementById('content'))