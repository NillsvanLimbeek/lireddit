import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
    type Post {
        id: ID
        creatorId: ID
        createdAt: String
        updatedAt: String
        title: String
        text: String
        points: Int
    }

    input PostInput {
        title: String
        text: String
    }
`;
