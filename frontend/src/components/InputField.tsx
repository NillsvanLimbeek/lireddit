import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
};

export const InputField = (props: Props) => {
    const [field, { error }] = useField(props);

    return (
        <div>
            <label htmlFor={field.name}>{props.label}</label>
            <input
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error && <p>{error}</p>}
        </div>
    );
};
