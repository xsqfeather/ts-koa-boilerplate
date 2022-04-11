/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Service } from "typedi";
import { VodResource } from "../entities/VodResource";
import CurdService from "../lib/services/CurdService";
import axios from "axios";
import { VideoCollector } from "../entities/VideoCollector";
import DI from "../lib/DI";
import VideoCollectorService from "./VideoCollectorService";
import VodTypeService from "./VodTypeService";
import { Loaded } from "@mikro-orm/core";

@Service()
export default class VodResourceService extends CurdService<VodResource> {
  private vodResourceRepository = DI.orm.em.getRepository(VodResource);

  @Inject(() => VideoCollectorService)
  private videoCollectorService: VideoCollectorService;

  @Inject(() => VodTypeService)
  private vodTypeService: VodTypeService;

  constructor() {
    super(VodResource);
  }

  async findHits(limit = 5): Promise<Loaded<VodResource, never>[]> {
    return this.vodResourceRepository.find(
      {},
      { limit, orderBy: { vod_hits: "DESC" } }
    );
  }

  async bulkInsertFromUrl(url: string, type = "json"): Promise<number> {
    try {
      const rlt = await axios.get(url);
      const { data } = rlt;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const xml2js = require("xml2js");
      const parser = new xml2js.Parser({
        explicitArray: false,
        mergeAttrs: true,
      });

      let list =
        type === "json" ? data.list : await parser.parseStringPromise(data);

      if (!list) {
        list = data.data;
      }
      const repeatNames = await this.vodResourceRepository.find({
        vod_name: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          $in: list.map((v: any) => v.vod_name),
        },
      });

      const repeatTypeNames = list.map((v: any) => v.type_name);
      for (let index = 0; index < repeatTypeNames.length; index++) {
        const typeName = repeatTypeNames[index];
        console.log("====================================");

        console.log({ typeName });

        if (!typeName) {
          continue;
        }
        const count = await this.vodTypeService.countByName(typeName);
        if (count > 1) {
          await this.vodTypeService.deleteByName(typeName);
        }
        if (count === 0) {
          await this.vodTypeService.createOne({
            name: typeName,
          });
        }
      }
      const vodResourcesToCreated = list
        ?.filter((v: any) => !repeatNames.includes(v.vod_name))
        ?.map((item: any) => {
          item.vod_pic_screenshot = item.vod_pic_screenshot?.toString();
          return this.vodResourceRepository.create(item);
        });

      if (list.length <= 0) {
        return 0;
      }
      await this.vodResourceRepository.persistAndFlush(vodResourcesToCreated);
      return list.length;
    } catch (error) {
      console.error(error);
    }
  }

  async bulkInsertFromUpdated(videoCollector: VideoCollector): Promise<void> {
    if (videoCollector.status === "STOP" || videoCollector.status === "STOP") {
      const stopped = await this.videoCollectorService.getById(
        videoCollector.id
      );
      await this.videoCollectorService.updateOne(videoCollector.id, {
        status: "STOP",
        currentPage: stopped.currentPage,
      });
      return;
    }
    const { currentPage, url } = videoCollector;
    const listUrl =
      url + (url.includes("?") ? "&" : "?") + "pg=" + currentPage.toString();
    console.log({ listUrl });

    const inserted = await this.bulkInsertFromUrl(listUrl, videoCollector.type);
    if (inserted > 0) {
      await this.videoCollectorService.updateOneWithEffect(videoCollector.id, {
        currentPage: videoCollector.currentPage + 1,
        status: "RUNNING",
      });
    } else {
      const stopped = await this.videoCollectorService.getById(
        videoCollector.id
      );
      await this.videoCollectorService.updateOne(videoCollector.id, {
        status: "STOP",
        currentPage: stopped.currentPage,
      });
      return;
    }
  }
}
