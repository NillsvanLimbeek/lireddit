import { IResolvers } from 'apollo-server-express';

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
            { title }: { title: string }
        ): Promise<Post> => {
            return await Post.create({ title }).save();
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
