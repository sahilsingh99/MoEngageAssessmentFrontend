import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import AnimePage from './components/AnimePage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
   // Link
  } from "react-router-dom";
import App from './App.js';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path = '/login' component = {Login}/>
                <Route exact path = '/register' component = {Register} />
                <Route exact path = '/' component = {App} />
                <Route path = '/anime/:id' component = {AnimePage} />
            </Switch>
        </Router>
    )
}

export default Routes;