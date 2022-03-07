import useMikroORM from "../../src/bootstrap/useMikroORM";
async function migrationUp(): Promise<void> {
  await useMikroORM(false);
  process.exit();
}

migrationUp();
