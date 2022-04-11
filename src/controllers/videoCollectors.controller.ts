import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import {
  CreateVideoCollectorInput,
  UpdateVideoCollectorInput,
} from "../dtos/videoCollectors.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { VideoCollector } from "../entities/VideoCollector";
import VideoCollectorService from "../services/VideoCollectorService";
import DTOService from "../lib/services/DTOService";

@Controller("/videoCollectors")
export default class VideoCollectorController {
  private videoCollectorService = Container.get(VideoCollectorService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<VideoCollector, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [videoCollectors, total] = await this.videoCollectorService.getList(
      listQueryObject
    );
    return {
      data: videoCollectors,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<VideoCollector, never>> {
    return this.videoCollectorService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createVideoCollectorInput: CreateVideoCollectorInput
  ): Promise<VideoCollector> {
    return this.videoCollectorService.createOne(createVideoCollectorInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateVideoCollectorInput: UpdateVideoCollectorInput
  ): Promise<VideoCollector> {
    return this.videoCollectorService.updateOneWithEffect(
      +id,
      updateVideoCollectorInput
    );
  }

  @Delete("/")
  async deleteMany(
    @Query() deleteInput: DeleteManyInput
  ): Promise<VideoCollector[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.videoCollectorService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<VideoCollector> {
    return this.videoCollectorService.deleteOne(+id);
  }
}
