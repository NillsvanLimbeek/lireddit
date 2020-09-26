import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home';
import { Register } from './views/Register';
import { Login } from './views/Login';
import { NavBar } from './components/NavBar';

import './tailwind.output.css';

export const App = () => {
    return (
        <div className="App">
            <Router>
                <NavBar />

                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    );
};
