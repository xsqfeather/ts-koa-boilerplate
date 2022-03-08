import "reflect-metadata";
import i from "i";

import MigrationService from "../src/lib/services/MigrationService";

import { writeFileSync } from "fs";
import path from "path";
import createMigrationFile from "./migration/createMigrationFile";
import { exec } from "child_process";
import useMikroORM from "../src/bootstrap/useMikroORM";

const args = process.argv;

const originMigrationName = args[2];

async function createSeed(): Promise<void> {
  await useMikroORM();
  const migrationService = new MigrationService();

  const inflect = i();

  const migrationName = inflect.camelize(originMigrationName, false);
  const migration = await migrationService.createOne({
    name: migrationName,
    hasDone: false,
  });

  const migrationFileStr = createMigrationFile(migrationName);

  writeFileSync(
    path.resolve(
      __dirname,
      `../src/migrations/${migration.createdAt
        .getTime()
        .toString()}-${migrationName}.ts`
    ),
    migrationFileStr
  );
  exec("yarn lint --fix", () => {
    console.log("=================files below created===================");
    console.log(
      path.resolve(__dirname, `../src/migrations/${migrationName}.ts`)
    );
    process.exit();
  });
}

createSeed();
