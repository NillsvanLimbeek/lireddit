import { IResolvers } from 'apollo-server-express';
import argon2 from 'argon2';

import { CTX, FieldError } from '../../types';
import { User } from '../../entities';

interface RegisterUser {
    input: { username: string; password: string };
}

interface UserResponse {
    errors?: FieldError[];
    user?: User;
}

export const userResolvers: IResolvers = {
    Query: {
        users: async (
            _root: void,
            _args: void,
            { db }: CTX
        ): Promise<User[]> => {
            return await db.em.find(User, {});
        },

        me: async (
            _root: void,
            _arg: void,
            { db, req }: CTX
        ): Promise<User | null> => {
            if (!req.session.userId) return null;

            const user = await db.em.findOne(User, { id: req.session.userId });
            return user;
        },
    },

    Mutation: {
        register: async (
            _root: void,
            { input }: RegisterUser,
            { db }: CTX
        ): Promise<UserResponse> => {
            let response: UserResponse = {};

            const hashedPassword = await argon2.hash(input.password);
            const user = await db.em.create(User, {
                username: input.username,
                password: hashedPassword,
            });

            if (input.username.length <= 2) {
                return (response = {
                    errors: [
                        {
                            field: 'username',
                            message: 'username should be at least 2 characters',
                        },
                    ],
                });
            }

            if (input.password.length <= 3) {
                return (response = {
                    errors: [
                        {
                            field: 'password',
                            message: 'password should be at least 3 characters',
                        },
                    ],
                });
            }

            try {
                await db.em.persistAndFlush(user);
            } catch (err) {
                if (err.code === '23505') {
                    return (response = {
                        errors: [
                            {
                                field: 'username',
                                message: 'username already exist',
                            },
                        ],
                    });
                }
            }

            response = { user };
            return response;
        },

        login: async (
            _root: void,
            { input }: RegisterUser,
            { db, req }: CTX
        ): Promise<UserResponse> => {
            let response: UserResponse = {};
            const user = await db.em.findOne(User, {
                username: input.username,
            });

            if (!user) {
                return (response = {
                    errors: [
                        { field: 'username', message: 'user was not found' },
                    ],
                });
            }

            const valid = await argon2.verify(user.password, input.password);

            if (!valid) {
                return (response = {
                    errors: [
                        { field: 'password', message: 'password incorrect' },
                    ],
                });
            }

            req.session.userId = user.id;

            response = { user };
            return response;
        },
    },
};
