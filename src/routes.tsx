import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/Home';
import Clients from './pages/Clients';
import Sales from './pages/Sales';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/Clients' component = {Clients} />
            <Route exact path = '/Sales' component = {Sales} />
        </Switch>
    </BrowserRouter>
)

export default Routes;