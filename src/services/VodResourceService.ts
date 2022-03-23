/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Service } from "typedi";
import { VodResource } from "../entities/VodResource";
import CurdService from "../lib/services/CurdService";
import axios from "axios";
import { VideoCollector } from "../entities/VideoCollector";
import DI from "../lib/DI";
import VideoCollectorService from "./VideoCollectorService";

@Service()
export default class VodResourceService extends CurdService<VodResource> {
  private vodResourceRepository = DI.orm.em.getRepository(VodResource);

  @Inject(() => VideoCollectorService)
  private videoCollectorService: VideoCollectorService;

  constructor() {
    super(VodResource);
  }

  async bulkInsertFromUrl(url: string): Promise<number> {
    const { data } = await axios.get(url);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repeatNames = await this.vodResourceRepository.find({
      vod_name: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $in: data.list.map((v: any) => v.vod_name),
      },
    });
    const vodResourcesToCreated = data.list
      ?.filter((v: any) => !repeatNames.includes(v.vod_name))
      ?.map((item: any) => {
        item.vod_pic_screenshot = item.vod_pic_screenshot?.toString();
        return this.vodResourceRepository.create(item);
      });

    if (data.list.length <= 0) {
      return 0;
    }

    await this.vodResourceRepository.persistAndFlush(vodResourcesToCreated);

    return data.list.length;
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
    const listUrl = url + "&pg=" + currentPage.toString();
    console.log({ listUrl });

    const inserted = await this.bulkInsertFromUrl(listUrl);
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