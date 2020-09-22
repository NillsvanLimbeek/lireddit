import React from 'react';
import { Form, Formik } from 'formik';

import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../lib/graphql/generated/graphql';
import { toErrorMap } from '../lib/utils';

interface Register {
    username: string;
    password: string;
}

interface FieldError {
    field: string;
    message: string;
    __typeName?: string;
}

export const Register = () => {
    const [register] = useRegisterMutation();

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
                const res = await register({ variables: values });

                if (res.data?.register?.errors) {
                    const data = res.data.register.errors as FieldError[];
                    setErrors(toErrorMap(data));
                } else if (res.data?.register?.user) {
                    // route to main
                    console.log('Success!');
                }
            }}
        >
            {() => (
                <Form>
                    <InputField
                        type="text"
                        name="username"
                        label="Username"
                        placeholder="Username"
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                    />

                    <button type="submit">Register</button>
                </Form>
            )}
        </Formik>
    );
};
