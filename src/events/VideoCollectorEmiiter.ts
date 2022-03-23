import Container, { Service } from "typedi";
import { VideoCollector } from "../entities/VideoCollector";
import { OnEvent } from "../lib/decorators/OnEvent";
import { BaseEventEmitter } from "../lib/events/BaseEventEmitter";
import VodResourceService from "../services/VodResourceService";

@Service()
export class VideoCollectorEmitter extends BaseEventEmitter<VideoCollector> {
  @OnEvent("AfterCreateOneVideoCollector")
  afterCreateOneHandler(videoCollector: VideoCollector): VideoCollector {
    return videoCollector;
  }

  @OnEvent("AfterUpdateOneVideoCollector")
  afterUpdateOneHandler(videoCollector: VideoCollector): void {
    const vodResourceService = Container.get(VodResourceService);
    vodResourceService.bulkInsertFromUpdated(videoCollector);
  }
}
