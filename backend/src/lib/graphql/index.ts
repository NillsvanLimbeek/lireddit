import { makeExecutableSchema, gql } from 'apollo-server-express';
import merge from 'lodash.merge';

import { postTypeDefs } from './post/postTypeDefs';
import { userTypeDefs } from './user/userTypeDefs';

import { postResolvers } from './post/postResolvers';
import { userResolvers } from './user/userResolvers';

const typeDefs = gql`
    type Query {
        users: [User]

        posts: [Post]
        post(id: Int!): Post
    }

    type Mutation {
        register(input: RegisterInput!): User

        createPost(title: String): Post
        updatePost(id: Int!, title: String!): Post
        deletePost(id: Int!): Boolean
    }
`;

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, postTypeDefs, userTypeDefs],
    resolvers: merge(postResolvers, userResolvers),
});
