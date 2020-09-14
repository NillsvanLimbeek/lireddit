import { IResolvers } from 'apollo-server-express';

import { Database } from '../types';
import { Post } from '../entities/Post';

interface CTX {
    db: Database;
}

export const resolvers: IResolvers = {
    Query: {
        posts: async (
            _root: void,
            _args: void,
            { db }: CTX
        ): Promise<Post[]> => {
            return await db.em.find(Post, {});
        },

        post: async (
            _root: void,
            { id }: { id: number },
            { db }: CTX
        ): Promise<Post | null> => {
            return await db.em.findOne(Post, { id });
        },
    },

    Mutation: {
        createPost: async (
            _root: void,
            { title }: { title: string },
            { db }: CTX
        ): Promise<Post> => {
            const post = await db.em.create(Post, { title });
            db.em.persistAndFlush(post);

            return post;
        },

        updatePost: async (
            _root: void,
            { id, title }: { id: number; title: string },
            { db }: CTX
        ): Promise<Post | null> => {
            const post = await db.em.findOne(Post, { id });

            if (!post) {
                return null;
            }

            post.title = title;
            await db.em.persistAndFlush(post);

            return post;
        },

        deletePost: async (
            _root: void,
            { id }: { id: number },
            { db }: CTX
        ): Promise<boolean> => {
            await db.em.nativeDelete(Post, { id });
            return true;
        },
    },
};
