import "reflect-metadata";
import useMiddles from "./useMiddles";
import useMikroORM from "./useMikroORM";
import { runMigration } from "./runMigration";
import Gun from "gun";

export default async function startApp(lifeCycle: {
  afterStart: () => Promise<void>;
}): Promise<void> {
  const { afterStart } = lifeCycle;
  await useMikroORM();
  const app = await useMiddles();
  await runMigration();
  const web = app.listen(8001, () => {
    console.log("SERVER RUNNING ON 8001");
    afterStart();
  });
  Gun({ web });
}
