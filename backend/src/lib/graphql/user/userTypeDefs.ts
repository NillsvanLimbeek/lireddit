import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        id: ID
        createdAd: String
        updatedAt: String
        username: String
    }

    input RegisterInput {
        username: String!
        password: String!
    }
`;
