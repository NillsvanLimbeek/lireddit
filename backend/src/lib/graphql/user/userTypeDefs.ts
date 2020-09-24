import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        id: ID
        createdAd: String
        updatedAt: String
        username: String
    }

    input UsernamePasswordInput {
        username: String!
        password: String!
    }

    type UserResponse {
        errors: [FieldError]
        user: User
    }
`;
