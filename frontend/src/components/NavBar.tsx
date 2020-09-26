import React from 'react';

import { Link } from '../components/Link';
import {
    useLogoutMutation,
    useMeQuery,
} from '../lib/graphql/generated/graphql';

export const NavBar = () => {
    const { data, loading } = useMeQuery();
    const [logout] = useLogoutMutation({ refetchQueries: ['Me'] });

    let body;

    if (loading) {
        body = <p>Loading...</p>;
    } else if (!data?.me) {
        body = (
            <>
                <Link label="Register" to="/register" />
                <Link label="Login" to="/login" />
            </>
        );
    } else {
        body = (
            <>
                <p className="mr-3 capitalize">{data.me.username}</p>
                <button onClick={() => logout()}>Logout</button>
            </>
        );
    }

    return (
        <nav className="flex w-screen p-4 bg-blue-400">
            <div className="flex justify-end w-screen">{body}</div>
        </nav>
    );
};
