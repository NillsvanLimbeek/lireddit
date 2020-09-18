import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type FieldError {
        field: String!
        message: String!
    }

    type Query {
        users: [User]
        me: User

        posts: [Post]
        post(id: Int!): Post
    }

    type Mutation {
        register(input: RegisterInput!): UserResponse
        login(input: RegisterInput!): UserResponse

        createPost(title: String): Post
        updatePost(id: Int!, title: String!): Post
        deletePost(id: Int!): Boolean
    }
`;
