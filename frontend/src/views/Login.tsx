import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, Flex, Box } from 'rebass';

import { FieldError, useLoginMutation } from '../lib/graphql/generated/graphql';
import { toErrorMap } from '../lib/utils';

import { InputField } from '../components/InputField';

interface Register {
    password: string;
    username: string;
}

export const Login = () => {
    const [login] = useLoginMutation({ refetchQueries: ['Me'] });
    const history = useHistory();

    const handleSubmit = async (values: Register, setErrors: any) => {
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
        <Flex justifyContent={'center'}>
            <Box width={400}>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values, { setErrors }) => {
                        handleSubmit(values, setErrors);
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

                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
};
