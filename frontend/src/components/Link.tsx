import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Text } from 'rebass';

type Props = {
    to: string;
    label: string;
};

export const Link = ({ label, to }: Props) => {
    return (
        <RouterLink to={to}>
            <Text mr={2} color={'black'}>
                {label}
            </Text>
        </RouterLink>
    );
};
