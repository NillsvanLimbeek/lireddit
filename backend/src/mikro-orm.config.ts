import path from 'path';
import { MikroORM } from '@mikro-orm/core';

import { __prod__ } from './lib/constants';
import { Post, User } from './lib/entities';

const mikroConfig: Parameters<typeof MikroORM.init>[0] = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: 'lireddit',
    type: 'postgresql',
    entities: [Post, User],
    debug: !__prod__,
};

export default mikroConfig;
