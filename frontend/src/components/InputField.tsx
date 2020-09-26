import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

// classes
const inputClass = `border border-gray-500 py-1 px-2 rounded-sm`;
const errorClass = `border border-red-500 py-1 px-2 rounded-sm`;

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
};

export const InputField = (props: Props) => {
    const [field, { error }] = useField(props);

    return (
        <div className="flex flex-col mb-3">
            <label htmlFor={field.name} className="mb-1 font-light">
                {props.label}
            </label>

            <input
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
                className={error ? errorClass : inputClass}
            />
            {error && <p className="text-red-600 text-xs opacity-0">{error}</p>}
        </div>
    );
};
