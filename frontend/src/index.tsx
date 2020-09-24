import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';

import { App } from './App';

const client = new ApolloClient({
    uri: 'http://localhost:5000/api',
    cache: new InMemoryCache({}),
    credentials: 'include',
});

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
