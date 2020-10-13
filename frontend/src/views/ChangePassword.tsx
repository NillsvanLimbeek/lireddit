import React from 'react';
import { Formik, Form } from 'formik';
import { useParams, useHistory } from 'react-router-dom';

import { FieldError } from '../lib/graphql/generated/graphql';
import { SetErrors } from '../lib/types';
import { toErrorMap } from '../lib/utils';

import { InputField } from '../components/InputField';

type NewPassword = {
    newPassword: string;
};

type Token = {
    token: string;
};

export const ChangePassword = () => {
    const history = useHistory();
    const { token } = useParams<Token>();

    const handleSubmit = async (
        values: NewPassword,
        setErrors: SetErrors<NewPassword>
    ) => {
        // const res = await login({
        //     variables: { input: values },
        // });
        // if (res.data?.login?.errors) {
        //     const errors = res.data.login.errors as FieldError[];
        //     setErrors(toErrorMap(errors));
        // } else if (res.data?.login?.user) {
        //     history.push('/');
        // }
    };

    return (
        <Formik
            initialValues={{ newPassword: '' }}
            onSubmit={(values, { setErrors }) => {
                handleSubmit(values, setErrors);
            }}
        >
            {() => (
                <Form className="w-1/3 mx-auto mt-8">
                    <InputField
                        name="newPassword"
                        label="New password"
                        placeholder="New password"
                        type="password"
                    />

                    <button type="submit" className="py-2 bg-blue-400 w-full">
                        Update password
                    </button>
                </Form>
            )}
        </Formik>
    );
};
