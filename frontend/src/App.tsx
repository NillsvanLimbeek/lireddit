import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from 'rebass';

import { Home } from './views/Home';
import { Register } from './views/Register';

export const App = () => {
    return (
        <div className="App">
            <Box sx={{ fontFamily: 'body' }}>
                <Router>
                    <Switch>
                        <Route path="/register" component={Register} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </Box>
        </div>
    );
};
