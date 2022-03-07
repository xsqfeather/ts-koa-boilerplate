import DI from "../DI";
import { Migration } from "../entities/Migration";
import CurdService from "./CurdService";
import * as seeders from "../../migrations";
import _ from "lodash";

export default class MigrationService extends CurdService<Migration> {
  private migrationRepository = DI.orm.em.getRepository(Migration);

  constructor() {
    super(Migration);
  }

  private async findOneByMigrationFileName(
    migrationFile: string
  ): Promise<Migration | null> {
    const migrationName = migrationFile.split("-");
    if (!migrationName[0]) {
      return null;
    }
    if (!migrationName[1]) {
      return null;
    }
    const date = new Date(migrationName[1]);
    if (date instanceof Date && !isNaN(date.valueOf())) {
      return null;
    }

    const migration = await this.migrationRepository.findOne({
      name: migrationName[0],
    });
    return migration;
  }

  async runMigrations(): Promise<void> {
    console.log({ seeders });
    console.log(_.values(seeders));

    for (let index = 0; index < _.values(seeders).length; index++) {
      const element = _.values(seeders)[index];
      console.log({ element });
      console.log(element.default.name);
      const migration = await this.findOneByMigrationFileName(
        element.default.name
      );
      if (migration && migration.hasDone) {
        continue;
      }
      const { up, down } = element.default();
      console.log({ up, down });
      await up();
    }
  }
}
