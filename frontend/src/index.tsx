import React from 'react';
import { render } from 'react-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
    HttpLink,
} from '@apollo/client';

import { errorLink } from './lib/graphql/link/errorLink';

import { App } from './App';

const client = new ApolloClient({
    uri: 'http://localhost:5000/api',
    cache: new InMemoryCache({}),
    credentials: 'include',
    // link: ApolloLink.from([
    //     errorLink,
    //     new HttpLink({ uri: 'http://localhost:5000/api' }),
    // ]),
});

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
