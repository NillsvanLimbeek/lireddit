import { IResolvers } from 'apollo-server-express';

import { CTX } from './../../types/Ctx';
import { PostInput } from './../../types/PostInput';

import { Post } from '../../entities/Post';

export const postResolvers: IResolvers = {
    Query: {
        posts: async (): Promise<Post[]> => {
            return await Post.find();
        },

        post: async (
            _root: void,
            { id }: { id: number }
        ): Promise<Post | undefined> => {
            return await Post.findOne(id);
        },
    },

    Mutation: {
        createPost: async (
            _root: void,
            { input }: PostInput,
            { req }: CTX
        ): Promise<Post> => {
            if (!req.session.userId) {
                throw new Error('not authenticated');
            }

            return await Post.create({
                ...input,
                creatorId: req.session.userId,
            }).save();
        },

        updatePost: async (
            _root: void,
            { id, title }: { id: number; title: string }
        ): Promise<Post | undefined> => {
            const post = await Post.findOne(id);

            if (!post) {
                return undefined;
            }

            post.title = title;
            await Post.update({ id }, { title });

            return post;
        },

        deletePost: async (
            _root: void,
            { id }: { id: number }
        ): Promise<boolean> => {
            await Post.delete(id);
            return true;
        },
    },
};
