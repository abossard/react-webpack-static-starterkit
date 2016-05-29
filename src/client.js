import { render } from 'react-dom'
import {routes} from './server.js'
render((
    <Router routes={routes}/>
), document.body)