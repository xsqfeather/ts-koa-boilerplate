import { wrap } from "@mikro-orm/core";
import _ from "lodash";
import DI from "../DI";
import { Migration } from "../entities/Migration";
import CurdService from "./CurdService";

export default class MigrationService extends CurdService<Migration> {
  private migrationRepository = DI.orm.em.getRepository(Migration);

  constructor() {
    super(Migration);
  }

  allUnDone(): Promise<Migration[]> {
    return this.migrationRepository.find(
      { hasDone: false },
      { orderBy: { createdAt: 1 } }
    );
  }

  async setUnDone(migration: Migration): Promise<void> {
    migration.hasDone = false;
    wrap(migration).assign(
      _.omit(migration, ["deletedAt", "id", "_id", "updatedAt"])
    );
    await this.migrationRepository.flush();
  }

  async setDone(migration: Migration): Promise<void> {
    migration.hasDone = true;
    wrap(migration).assign(
      _.omit(migration, ["deletedAt", "id", "_id", "updatedAt"])
    );
    await this.migrationRepository.flush();
  }
}
