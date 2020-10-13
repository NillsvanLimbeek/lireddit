import { IResolvers } from 'apollo-server-express';
import argon2 from 'argon2';
import { v4 } from 'uuid';

import { CTX, RegisterUser, UserResponse, LoginUser } from '../../types';
import { User } from '../../entities';
import { registerValidation, sendEmail } from '../../utils';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from './../../constants';

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
            { db, req }: CTX
        ): Promise<UserResponse> => {
            let response: UserResponse = {};

            const errors = registerValidation({ input });
            if (errors) return { errors };

            const hashedPassword = await argon2.hash(input.password);
            const user = await db.em.create(User, {
                username: input.username,
                email: input.email,
                password: hashedPassword,
            });

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
            req.session.userId = user.id;

            return response;
        },

        login: async (
            _root: void,
            { input }: LoginUser,
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

        logout: (
            _root: void,
            _args: void,
            { req, res }: CTX
        ): Promise<boolean> => {
            return new Promise((resolve) => {
                req.session.destroy((error) => {
                    if (error) {
                        console.error(error);
                        resolve(false);
                        return;
                    }

                    res.clearCookie(COOKIE_NAME);
                    resolve(true);
                });
            });
        },

        forgotPassword: async (
            _root: void,
            { email }: { email: string },
            { db, redis }: CTX
        ) => {
            const user = await db.em.findOne(User, { email });

            // if no email was found, do nothing
            if (!user) return true;

            const token = v4();
            await redis.set(
                FORGOT_PASSWORD_PREFIX + token,
                user.id,
                'ex',
                1000 * 60 * 60 * 3
            ); // 3 days to reset password

            sendEmail(
                user.email,
                `<a href="http://localhost:3000/forgot-password/${token}">Reset password</a>`
            );

            return true;
        },

        changePassword: async (
            _root: void,
            { token, newPassword }: { token: string; newPassword: string },
            { redis, db, req }: CTX
        ): Promise<UserResponse> => {
            if (newPassword.length <= 2) {
                return {
                    errors: [
                        {
                            field: 'password',
                            message: 'password should be at least 3 characters',
                        },
                    ],
                };
            }

            const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

            if (!userId) {
                return {
                    errors: [{ field: 'token', message: 'token expired' }],
                };
            }

            const user = await db.em.findOne(User, { id: parseInt(userId) });

            if (!user) {
                return {
                    errors: [
                        { field: 'token', message: 'user no longer exists' },
                    ],
                };
            }

            user.password = await argon2.hash(newPassword);
            db.em.persistAndFlush(user);

            req.session.userId = user.id;

            return { user };
        },
    },
};
