import React from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

import {
    FieldError,
    useChangePasswordMutation,
} from '../lib/graphql/generated/graphql';
import { SetErrors } from '../lib/types';
import { toErrorMap } from '../lib/utils';

import { InputField } from '../components/InputField';

type NewPassword = {
    newPassword: string;
};

export const ChangePassword = () => {
    const history = useHistory();
    const [changePassword] = useChangePasswordMutation();

    const handleSubmit = async (
        values: NewPassword,
        setErrors: SetErrors<NewPassword>
    ) => {
        const res = await changePassword({
            variables: { input: values.newPassword },
        });
        if (res.data?.changePassword?.errors) {
            const errors = res.data.changePassword.errors as FieldError[];
            setErrors(toErrorMap(errors));
        } else if (res.data?.changePassword?.user) {
            history.push('/');
        }
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
