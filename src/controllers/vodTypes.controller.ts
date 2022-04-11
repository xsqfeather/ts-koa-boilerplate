import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateVodTypeInput, UpdateVodTypeInput } from "../dtos/vodTypes.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { VodType } from "../entities/VodType";
import VodTypeService from "../services/VodTypeService";
import DTOService from "../lib/services/DTOService";

@Controller("/vodTypes")
export default class VodTypeController {
  private vodTypeService = Container.get(VodTypeService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<VodType, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [vodTypes, total] = await this.vodTypeService.getList(
      listQueryObject
    );
    return {
      data: vodTypes,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<VodType, never>> {
    return this.vodTypeService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createVodTypeInput: CreateVodTypeInput
  ): Promise<VodType> {
    return this.vodTypeService.createOne(createVodTypeInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateVodTypeInput: UpdateVodTypeInput
  ): Promise<VodType> {
    return this.vodTypeService.updateOne(+id, updateVodTypeInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<VodType[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.vodTypeService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<VodType> {
    return this.vodTypeService.deleteOne(+id);
  }
}
