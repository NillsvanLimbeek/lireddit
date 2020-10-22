import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../lib/graphql/generated/graphql';

interface CreatePost {
    title: string;
    text: string;
}

export const CreatePost = () => {
    const [createPost] = useCreatePostMutation();
    const history = useHistory();

    const handleSubmit = async (values: CreatePost) => {
        const { errors } = await createPost({
            variables: { input: values },
        });

        if (errors) {
            console.log(errors);
        } else {
            history.push('/');
        }
    };

    return (
        <Formik
            initialValues={{ title: '', text: '' }}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {() => (
                <Form className="w-1/3 mx-auto mt-8">
                    <InputField
                        type="text"
                        name="title"
                        label="Title"
                        placeholder="Title"
                    />

                    <InputField
                        name="text"
                        label="Post text"
                        placeholder="Post text"
                    />

                    <button type="submit" className="py-2 bg-blue-400 w-full">
                        Create post
                    </button>
                </Form>
            )}
        </Formik>
    );
};
