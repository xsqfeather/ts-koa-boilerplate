import { MikroORM } from "@mikro-orm/core";
import DI from "../lib/DI";
import * as envDbConfig from "../config/db";

export default async function useMikroORM(isDebug = true): Promise<void> {
  const env = process.env.NODE_ENV || "development";
  const config = envDbConfig[env];
  config.isDebug = isDebug;
  DI.orm = await MikroORM.init(config);
  DI.em = DI.orm.em;
}
