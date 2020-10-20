import { CTX } from '../types/Ctx';
import { IMiddlewareFunction } from 'graphql-middleware';

export const logArgs: IMiddlewareFunction<undefined, CTX, undefined> = async (
    resolve,
    root,
    args,
    context,
    info
) => {
    console.log(`1. logInput: ${JSON.stringify(args)}`);
    const result = await resolve(root, args, context, info);
    console.log(`5. logInput`);
    return result;
};
