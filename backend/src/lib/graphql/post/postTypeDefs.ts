import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
    type Post {
        id: ID
        createdAt: String
        updatedAt: String
        title: String
    }
`;
