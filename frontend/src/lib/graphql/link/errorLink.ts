import { onError } from '@apollo/client/link/error';

import { customHistory } from '../../utils';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
        );

    customHistory.push('/login');
});
