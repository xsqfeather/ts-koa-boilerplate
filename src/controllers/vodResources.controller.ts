import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import {
  CreateVodResourceInput,
  UpdateVodResourceInput,
} from "../dtos/vodResources.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { VodResource } from "../entities/VodResource";
import VodResourceService from "../services/VodResourceService";
import DTOService from "../lib/services/DTOService";

@Controller("/vodResources")
export default class VodResourceController {
  private vodResourceService = Container.get(VodResourceService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<VodResource, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [vodResources, total] = await this.vodResourceService.getList(
      listQueryObject
    );
    return {
      data: vodResources,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<VodResource, never>> {
    return this.vodResourceService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createVodResourceInput: CreateVodResourceInput
  ): Promise<VodResource> {
    return this.vodResourceService.createOne(createVodResourceInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateVodResourceInput: UpdateVodResourceInput
  ): Promise<VodResource> {
    return this.vodResourceService.updateOne(+id, updateVodResourceInput);
  }

  @Delete("/")
  async deleteMany(
    @Query() deleteInput: DeleteManyInput
  ): Promise<VodResource[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.vodResourceService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<VodResource> {
    return this.vodResourceService.deleteOne(+id);
  }
}
