import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export interface Database {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
}
