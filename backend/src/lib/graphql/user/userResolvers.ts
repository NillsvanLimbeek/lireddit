import { IResolvers } from 'apollo-server-express';
import argon2 from 'argon2';

import { CTX } from '../../types';
import { User } from '../../entities';

interface RegisterUser {
    input: { username: string; password: string };
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
    },

    Mutation: {
        register: async (
            _root: void,
            { input }: RegisterUser,
            { db }: CTX
        ): Promise<User> => {
            console.log(input);

            const hashedPassword = await argon2.hash(input.password);
            const user = await db.em.create(User, {
                username: input.username,
                password: hashedPassword,
            });

            await db.em.persistAndFlush(user);
            return user;
        },
    },
};
