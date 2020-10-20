import express from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

import { schemaWithMiddleware } from './src/lib/graphql/index';
import { __prod__ } from './src/lib/constants';

import { config } from './src/typeorm.config';

const RedisStore = connectRedis(session);
const redis = new Redis();

const main = async () => {
    // connect db
    await createConnection(config);

    // express app
    const app = express();

    // cors
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );

    // cookies
    app.use(
        session({
            name: 'qid',
            store: new RedisStore({
                client: redis,
                disableTTL: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24, // 1 year
                sameSite: 'lax', // research
                httpOnly: true,
                secure: __prod__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: 'keyboard cat', // should be random string
            resave: false,
        })
    );

    // setup graphql
    const apolloServer = new ApolloServer({
        schema: schemaWithMiddleware,
        context: ({ req, res }) => ({ req, res, redis }),
    });

    apolloServer.applyMiddleware({
        app,
        path: '/api',
        cors: false,
    });

    // start server
    app.set('port', process.env.PORT || 5000);
    app.listen(app.get('port'), () => {
        console.log(`Server started on port ${app.get('port')}`);
    });
};

main();
