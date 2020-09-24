import React from 'react';
import { Flex, Box, Text } from 'rebass';

import { Link } from '../components/Link';
import { useMeQuery } from '../lib/graphql/generated/graphql';

export const NavBar = () => {
    const { data, loading } = useMeQuery();
    let body;

    if (loading) {
        body = <Text>Loading...</Text>;
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
                <Text>{data.me.username}</Text>
            </>
        );
    }

    return (
        <Flex>
            <Box
                sx={{
                    width: '100%',
                    bg: 'tomato',
                    p: 3,
                    mb: 3,
                    display: 'flex',
                }}
            >
                {body}
            </Box>
        </Flex>
    );
};
