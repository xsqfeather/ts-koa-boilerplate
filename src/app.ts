import Container from "typedi";
import startApp from "./bootstrap/startApp";
import { job } from "./jobs/jobs";
import { JobQueue } from "./jobs/queue";
import VodResourceService from "./services/VodResourceService";
import VodTypeService from "./services/VodTypeService";

startApp({
  afterStart: async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (process as any).env.NODE_APP_INSTANCE;

    if (!parseInt(instance)) {
      job.start();
      const insertVodQueue = new JobQueue("insertVodQueue");
      await insertVodQueue.init();
      // eslint-disable-next-line @typescript-eslint/ban-types

      setInterval(async () => {
        try {
          const task = await insertVodQueue.popMsg();
          if (task) {
            const toInserted = JSON.parse(task);
            const vodResourceService = Container.get(VodResourceService);
            const vodTypeService = Container.get(VodTypeService);
            await vodTypeService.createOneByName(toInserted.type_name);
            await vodResourceService.createOrUpdate(toInserted);
          }
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    }
  },
});
