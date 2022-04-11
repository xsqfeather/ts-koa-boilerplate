import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateVisitorInput, UpdateVisitorInput } from "../dtos/visitors.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Visitor } from "../entities/Visitor";
import VisitorService from "../services/VisitorService";
import DTOService from "../lib/services/DTOService";

@Controller("/visitors")
export default class VisitorController {
  private visitorService = Container.get(VisitorService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Visitor, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [visitors, total] = await this.visitorService.getList(
      listQueryObject
    );
    return {
      data: visitors,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Visitor, never>> {
    return this.visitorService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createVisitorInput: CreateVisitorInput
  ): Promise<Visitor> {
    return this.visitorService.createOne(createVisitorInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateVisitorInput: UpdateVisitorInput
  ): Promise<Visitor> {
    return this.visitorService.updateOne(+id, updateVisitorInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Visitor[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.visitorService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Visitor> {
    return this.visitorService.deleteOne(+id);
  }
}
