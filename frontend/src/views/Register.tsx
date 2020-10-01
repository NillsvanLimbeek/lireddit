import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';

import {
    FieldError,
    useRegisterMutation,
} from '../lib/graphql/generated/graphql';
import { toErrorMap } from '../lib/utils';
import { SetErrors } from '../lib/types';

import { InputField } from '../components/InputField';

interface Register {
    username: string;
    email: string;
    password: string;
}

export const Register = () => {
    const [register] = useRegisterMutation({ refetchQueries: ['Me'] });
    const history = useHistory();

    const handleSubmit = async (
        values: Register,
        setErrors: SetErrors<Register>
    ) => {
        const res = await register({
            variables: { input: values },
        });

        if (res.data?.register?.errors) {
            const errors = res.data.register.errors as FieldError[];
            setErrors(toErrorMap(errors));
        } else if (res.data?.register?.user) {
            history.push('/');
        }
    };

    return (
        <Formik
            initialValues={{ username: '', password: '', email: '' }}
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
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="Email"
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                    />

                    <button type="submit" className="py-2 bg-blue-400 w-full">
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};
