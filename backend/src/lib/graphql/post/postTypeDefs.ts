import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
    type Post {
        id: ID
        createdAd: String
        updatedAt: String
        title: String
    }
`;
