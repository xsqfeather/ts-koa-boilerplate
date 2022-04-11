import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateGoodInput, UpdateGoodInput } from "../dtos/goods.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Good } from "../entities/Good";
import GoodService from "../services/GoodService";
import DTOService from "../lib/services/DTOService";

@Controller("/goods")
export default class GoodController {
  private goodService = Container.get(GoodService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Good, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [goods, total] = await this.goodService.getList(listQueryObject);
    return {
      data: goods,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Good, never>> {
    return this.goodService.getOne(+id);
  }

  @Post("/")
  async createOne(@Body() createGoodInput: CreateGoodInput): Promise<Good> {
    return this.goodService.createOne(createGoodInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateGoodInput: UpdateGoodInput
  ): Promise<Good> {
    return this.goodService.updateOne(+id, updateGoodInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Good[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.goodService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Good> {
    return this.goodService.deleteOne(+id);
  }
}
