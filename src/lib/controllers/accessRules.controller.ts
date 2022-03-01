import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import {
  CreateAccessRuleInput,
  UpdateAccessRuleInput,
} from "../dtos/accessRules.dto";
import { AccessRule } from "../entities/AccessRule";
import AccessRuleService from "../services/AccessRuleService";
import DTOService from "../services/DTOService";

@Controller("/access_rules")
export default class AccessRuleController {
  private accessRuleService = Container.get(AccessRuleService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<AccessRule, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [accessRules, total] = await this.accessRuleService.getList(
      listQueryObject
    );
    return {
      data: accessRules,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<AccessRule, never>> {
    return this.accessRuleService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createAccessRuleInput: CreateAccessRuleInput
  ): Promise<AccessRule> {
    return this.accessRuleService.createOne(createAccessRuleInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateAccessRuleInput: UpdateAccessRuleInput
  ): Promise<AccessRule> {
    return this.accessRuleService.updateOne(id, updateAccessRuleInput);
  }

  @Delete("/")
  async deleteMany(
    @Query() deleteInput: DeleteManyInput
  ): Promise<AccessRule[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.accessRuleService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<AccessRule> {
    return this.accessRuleService.deleteOne(id);
  }
}
