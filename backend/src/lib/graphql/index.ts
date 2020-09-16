import { makeExecutableSchema } from 'apollo-server-express';
import merge from 'lodash.merge';

import { postTypeDefs } from './post/postTypeDefs';
import { userTypeDefs } from './user/userTypeDefs';

import { postResolvers } from './post/postResolvers';
import { userResolvers } from './user/userResolvers';

import { typeDefs } from './typeDefs';

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, postTypeDefs, userTypeDefs],
    resolvers: merge(postResolvers, userResolvers),
});
