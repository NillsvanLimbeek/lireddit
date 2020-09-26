import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';

import {
    FieldError,
    useRegisterMutation,
} from '../lib/graphql/generated/graphql';
import { toErrorMap } from '../lib/utils';

import { InputField } from '../components/InputField';

interface Register {
    username: string;
    password: string;
}

export const Register = () => {
    const [register] = useRegisterMutation();
    const history = useHistory();

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
                const res = await register({
                    variables: { input: values },
                });

                if (res.data?.register?.errors) {
                    const errors = res.data.register.errors as FieldError[];
                    setErrors(toErrorMap(errors));
                } else if (res.data?.register?.user) {
                    history.push('/');
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
