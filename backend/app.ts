import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './src/lib/graphql';
import { __prod__ } from './src/lib/constants';

import mikroConfig from './src/mikro-orm.config';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const main = async () => {
    // connect db
    const orm = await MikroORM.init(mikroConfig);
    orm.getMigrator().up();

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
                client: redisClient,
                disableTTL: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24, // 1 year
                sameSite: 'lax', // research
                httpOnly: true,
                secure: __prod__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: 'keyboard cat',
            resave: false,
        })
    );

    // setup graphql
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ db: orm, req, res }),
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
