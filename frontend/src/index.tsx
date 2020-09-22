import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { App } from './App';

const client = new ApolloClient({
    uri: 'http://localhost:5000/api',
    cache: new InMemoryCache(),
    credentials: 'include',
});

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
