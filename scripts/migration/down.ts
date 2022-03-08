import useMikroORM from "../../src/bootstrap/useMikroORM";
async function migrationDown(): Promise<void> {
  await useMikroORM(false);
  process.exit();
}

migrationDown();
