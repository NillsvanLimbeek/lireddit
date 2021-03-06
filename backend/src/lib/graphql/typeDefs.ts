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
        login(input: LoginInput!): UserResponse
        logout: Boolean
        forgotPassword(email: String!): Boolean
        changePassword(newPassword: String!): UserResponse

        createPost(input: PostInput): Post
        updatePost(id: Int!, title: String!): Post
        deletePost(id: Int!): Boolean
    }
`;
