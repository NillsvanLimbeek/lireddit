import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { Box, Text } from 'rebass';
import { Label, Input } from '@rebass/forms';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
};

export const InputField = (props: Props) => {
    const [field, { error }] = useField(props);

    return (
        <Box mb={3}>
            <Label htmlFor={field.name} mb={2}>
                {props.label}
            </Label>
            <Input
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error && (
                <Text color={'red'} fontSize={1}>
                    {error}
                </Text>
            )}
        </Box>
    );
};
