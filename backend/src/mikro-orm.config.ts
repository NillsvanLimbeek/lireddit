import path from 'path';
import { MikroORM } from '@mikro-orm/core';

import { __prod__ } from './lib/constants';
import { Post } from './lib/entities/Post';

const mikroConfig: Parameters<typeof MikroORM.init>[0] = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: 'lireddit',
    type: 'postgresql',
    entities: [Post],
    debug: !__prod__,
};

export default mikroConfig;
