import React from 'react';
import { Form, Formik } from 'formik';

import { InputField } from '../components/InputField';

export const Register = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values) => handleSubmit(values)}
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
