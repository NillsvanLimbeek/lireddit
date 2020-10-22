import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import { customHistory } from './lib/utils';

import { Home } from './views/Home';
import { Register } from './views/Register';
import { Login } from './views/Login';
import { NavBar } from './components/NavBar';
import { ChangePassword } from './views/ChangePassword';
import { CreatePost } from './views/CreatePost';
import { PrivateRoute } from './components/PrivateRoute';

import './tailwind.output.css';

export const App = () => {
    return (
        <div className="App">
            <Router history={customHistory}>
                <NavBar />

                <Switch>
                    <Route
                        path="/forgot-password/:token"
                        component={ChangePassword}
                    />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/create-post" component={CreatePost} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    );
};
