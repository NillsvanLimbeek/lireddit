import React, { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useMeQuery } from '../lib/graphql/generated/graphql';

type Props = {
    path: string;
    exact?: boolean;
    component: ComponentType;
};

export const PrivateRoute = ({ component, path, exact }: Props) => {
    const { data } = useMeQuery();

    return data ? (
        <Route path={path} exact={exact} component={component} />
    ) : (
        <Redirect to="/login" />
    );
};
