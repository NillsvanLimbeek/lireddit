import { MikroORM } from '@mikro-orm/core';

import mikroConfig from './src/mikro-orm.config';

// import { Post } from './src/lib/entities/Post';

const main = async () => {
    // connect db
    const orm = await MikroORM.init(mikroConfig);

    // run migrations
    orm.getMigrator().up();

    // create post
    // const post = orm.em.create(Post, { title: 'The first post' });
    // await orm.em.persistAndFlush(post);

    // find posts
    // const posts = await orm.em.find(Post, {});
    // console.log(posts);
};

main();
