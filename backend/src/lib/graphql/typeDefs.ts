import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Post {
        id: ID
        createdAd: String
        updatedAt: String
        title: String
    }

    type Query {
        posts: [Post]
        post(id: Int!): Post
    }

    type Mutation {
        createPost(title: String): Post
        updatePost(id: Int!, title: String!): Post
        deletePost(id: Int!): Boolean
    }
`;
