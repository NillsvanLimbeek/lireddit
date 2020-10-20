import { CTX } from '../types/Ctx';
import { IMiddlewareFunction } from 'graphql-middleware';

export const isAuth: IMiddlewareFunction<undefined, CTX, undefined> = async (
    resolve,
    root,
    args,
    context,
    info
) => {
    if (!context.req.session.userId) {
        throw new Error('not authorized');
    }

    const result = await resolve(root, args, context, info);
    return result;
};
