import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        id: ID
        createdAd: String
        updatedAt: String
        username: String
        email: String
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type UserResponse {
        errors: [FieldError]
        user: User
    }
`;
