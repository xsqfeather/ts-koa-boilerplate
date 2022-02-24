import "reflect-metadata";
import useMiddles from "./useMiddles";
import { MikroORM } from "@mikro-orm/core";
import DI from "../lib/DI";

import { development as developmentDBConfig } from "../config/db";

export default async function startApp(lifeCycle: {
  afterStart: () => Promise<void>;
}): Promise<void> {
  const { afterStart } = lifeCycle;
  DI.orm = await MikroORM.init(developmentDBConfig);
  DI.em = DI.orm.em;
  const app = await useMiddles();
  app.listen(8001, () => {
    console.log("SERVER RUNNING ON 8001");
    afterStart();
  });
}
