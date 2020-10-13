import { Database } from './';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export interface CTX {
    db: Database;
    req: Request & { session: Express.Session };
    res: Response;
    redis: Redis;
}
