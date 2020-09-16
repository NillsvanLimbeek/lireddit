import { Database } from './';
import { Request, Response } from 'express';

export interface CTX {
    db: Database;
    req: Request & { session: Express.Session };
    res: Response;
}
