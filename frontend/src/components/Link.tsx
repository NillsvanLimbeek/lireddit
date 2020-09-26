import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
    to: string;
    label: string;
};

export const Link = ({ label, to }: Props) => {
    return (
        <RouterLink to={to}>
            <p className="mr-2 text-black hover:text-gray-700">{label}</p>
        </RouterLink>
    );
};
