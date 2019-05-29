import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router , Route} from 'react-router-dom';

import HomePage from './pages/home'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import PersonalPage from './pages/personal'

ReactDOM.render(
    <Router>
        <div>
            {/* <IndexRoute component={HomePage}/> */}
            <Route exact path="/" component={HomePage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/personal" component={PersonalPage}/>
        </div>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
