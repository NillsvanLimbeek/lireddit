import { IResolvers } from 'apollo-server-express';

export const resolvers: IResolvers = {
    Query: {
        hello: (_: void, args: void): string => {
            return 'Hello!';
        },
    },
};
