import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { FieldError, useLoginMutation } from '../lib/graphql/generated/graphql';
import { toErrorMap } from '../lib/utils';

import { InputField } from '../components/InputField';

interface Login {
    password: string;
    username: string;
}

export const Login = () => {
    const [login] = useLoginMutation({ refetchQueries: ['Me'] });
    const history = useHistory();

    const handleSubmit = async (values: Login, setErrors: any) => {
        const res = await login({
            variables: { input: values },
        });

        if (res.data?.login?.errors) {
            const errors = res.data.login.errors as FieldError[];
            setErrors(toErrorMap(errors));
        } else if (res.data?.login?.user) {
            history.push('/');
        }
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, { setErrors }) => {
                handleSubmit(values, setErrors);
            }}
        >
            {() => (
                <Form className="w-1/3 mx-auto mt-8">
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

                    <button type="submit" className="py-2 bg-blue-400 w-full">
                        Login
                    </button>
                </Form>
            )}
        </Formik>
    );
};
