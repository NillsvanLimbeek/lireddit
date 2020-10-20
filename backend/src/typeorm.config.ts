import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'lireddit2',
    synchronize: true,
    logging: false,
    entities: ['src/lib/entities/**/*.ts'],
    migrations: ['src/lib/migration/**/*.ts'],
    subscribers: ['src/lib/subscriber/**/*.ts'],
};
