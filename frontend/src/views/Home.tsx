import React, { useEffect } from 'react';
import { useMeQuery } from '../lib/graphql/generated/graphql';

export const Home = () => {
    const { data } = useMeQuery();

    useEffect(() => {
        console.log(data);
    }, [data]);

    return <div>Home</div>;
};
