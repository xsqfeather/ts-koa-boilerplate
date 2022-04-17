import axios from "axios";
import CronJob from "cron";
import Container from "typedi";
import { collectUrls } from "../constants/urls";
import RedisCache from "../RedisCache";
import { JobQueue } from "./queue";
export const job = new CronJob.CronJob(
  "0 */5 * * * *",
  async function () {
    const redisCache = Container.get(RedisCache);
    try {
      const redisClient = await redisCache.connect();
      const insertVodQueue = new JobQueue("insertVodQueue");
      await insertVodQueue.init();

      for (let index = 0; index < collectUrls.length; index++) {
        const url = collectUrls[index];
        const currentPage = await redisClient.get(url + "currentPage");
        const rlt = await axios.get(url + (currentPage || 1).toString());
        if (!rlt?.data?.list?.length) {
          await redisClient.set(url + "currentPage", 1);
          break;
        }

        for (let i = 0; i < rlt?.data?.list?.length; i++) {
          const item = rlt?.data?.list[i];
          insertVodQueue.sendMsg(JSON.stringify(item));
        }
        if (!currentPage) {
          await redisClient.set(url + "currentPage", 1);
        }
        await redisClient.set(
          url + "currentPage",
          (parseInt(currentPage) || 0) + 1
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
  null,
  false,
  "Asia/Shanghai"
);
