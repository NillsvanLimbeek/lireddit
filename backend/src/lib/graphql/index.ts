import { makeExecutableSchema } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import merge from 'lodash.merge';

import { postTypeDefs } from './post/postTypeDefs';
import { userTypeDefs } from './user/userTypeDefs';

import { postResolvers } from './post/postResolvers';
import { userResolvers } from './user/userResolvers';

import { typeDefs } from './typeDefs';

import { isAuth } from '../middleware';

const authMiddleware = {
    Mutation: {
        createPost: isAuth,
        updatePost: isAuth,
        deletePost: isAuth,

        logout: isAuth,
        forgotPassword: isAuth,
        changePassword: isAuth,
    },
};

const middleware = [authMiddleware];

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, postTypeDefs, userTypeDefs],
    resolvers: merge(postResolvers, userResolvers),
});

export const schemaWithMiddleware = applyMiddleware(schema, ...middleware);
