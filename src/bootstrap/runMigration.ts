import { machineIdSync } from "node-machine-id";
import MigrationService from "../lib/services/MigrationService";
export async function runMigration(): Promise<void> {
  console.log("machine==========", machineIdSync());

  const migrations = await new MigrationService().allUnDone();
  for (let index = 0; index < migrations.length; index++) {
    const migration = migrations[index];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const migrationMethod = require(`../migrations/${migration.createdAt
      .getTime()
      .toString()}-${migration.name}`);
    if (migrationMethod) {
      const { up } = migrationMethod.default();
      if (!up) {
        console.error(`${migration.name} not return an up function`);
      }
      await up();
    }
  }
}
