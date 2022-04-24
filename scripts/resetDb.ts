import useMikroORM from "../src/bootstrap/useMikroORM";
import createSuperAdmin from "./migration/createSuperAdmin";

async function adminSet(): Promise<void> {
  await useMikroORM();
  await createSuperAdmin(username, password);
  process.exit();
}

adminSet();
