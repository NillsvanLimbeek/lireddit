import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        id: ID
        createdAt: String
        updatedAt: String
        username: String
        email: String
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    type UserResponse {
        errors: [FieldError]
        user: User
    }

    input LoginInput {
        username: String!
        password: String!
    }
`;
