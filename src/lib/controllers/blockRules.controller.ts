import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import {
  CreateBlockRuleInput,
  UpdateBlockRuleInput,
} from "../dtos/blockRules.dto";
import { BlockRule } from "../entities/BlockRule";
import BlockRuleService from "../services/BlockRuleService";
import DTOService from "../services/DTOService";

@Controller("/block_rules")
export default class BlockRuleController {
  private blockRuleService = Container.get(BlockRuleService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<BlockRule, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [blockRules, total] = await this.blockRuleService.getList(
      listQueryObject
    );
    return {
      data: blockRules,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<BlockRule, never>> {
    return this.blockRuleService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createBlockRuleInput: CreateBlockRuleInput
  ): Promise<BlockRule> {
    return this.blockRuleService.createOne(createBlockRuleInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateBlockRuleInput: UpdateBlockRuleInput
  ): Promise<BlockRule> {
    return this.blockRuleService.updateOne(id, updateBlockRuleInput);
  }

  @Delete("/")
  async deleteMany(
    @Query() deleteInput: DeleteManyInput
  ): Promise<BlockRule[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.blockRuleService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<BlockRule> {
    return this.blockRuleService.deleteOne(id);
  }
}
