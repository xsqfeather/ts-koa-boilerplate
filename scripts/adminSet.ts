import useMikroORM from "../src/bootstrap/useMikroORM";
import createSuperAdmin from "./migration/createSuperAdmin";

const argvList = process.argv;
const username = argvList[2];
const password = argvList[3];

if (!username) {
  throw new Error("username required");
}

if (!password) {
  throw new Error("password required");
}

async function adminSet(): Promise<void> {
  await useMikroORM();
  await createSuperAdmin(username, password);
  process.exit();
}

adminSet();
