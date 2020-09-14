import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './src/lib/graphql';

import mikroConfig from './src/mikro-orm.config';

const main = async () => {
    // connect db
    const orm = await MikroORM.init(mikroConfig);
    orm.getMigrator().up();

    const app = express();

    // setup graphql
    const apolloServer = new ApolloServer({
        schema,
        context: () => ({ db: orm }),
    });

    apolloServer.applyMiddleware({ app, path: '/api' });

    // start server
    app.set('port', process.env.PORT || 5000);
    app.listen(app.get('port'), () => {
        console.log(`Server started on port ${app.get('port')}`);
    });
};

main();
