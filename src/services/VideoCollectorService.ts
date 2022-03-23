import { Inject, Service } from "typedi";
import { UpdateVideoCollectorInput } from "../dtos/videoCollectors.dto";
import { VideoCollector } from "../entities/VideoCollector";
import { VideoCollectorEmitter } from "../events/VideoCollectorEmiiter";
import CurdService from "../lib/services/CurdService";

@Service()
export default class VideoCollectorService extends CurdService<VideoCollector> {
  @Inject(() => VideoCollectorEmitter)
  private videoCollectorEmitter: VideoCollectorEmitter;

  constructor() {
    super(VideoCollector);
  }

  async updateOneWithEffect(
    id: string,
    updateVideoCollectorInput: UpdateVideoCollectorInput
  ): Promise<VideoCollector> {
    const videoCollector = await this.updateOne(id, updateVideoCollectorInput);

    this.videoCollectorEmitter.emit(
      "AfterUpdateOneVideoCollector",
      videoCollector
    );
    return videoCollector;
  }
}
