import "reflect-metadata";
import useMiddles from "./useMiddles";
import { EntityManager, MikroORM } from "@mikro-orm/core";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

export default async function startApp(): Promise<void> {
  const app = await useMiddles();
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  app.listen(8001, () => {
    console.log("SERVER RUNNING ON 8001");
  });
}
