import i from "i";

const inflect = i();

export interface classPropType {
  name: string;
  type: string;
}

export interface classPropRuleType extends classPropType {
  rule: string;
}

export const generateControllerCodeText = (SourceName: string): string => {
  const sourceName = inflect.camelize(SourceName, false);
  const sourceNames = inflect.pluralize(sourceName);

  return `
   import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { Create${SourceName}Input, Update${SourceName}Input } from "../dtos/${sourceNames}.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { ${SourceName} } from "../entities/${SourceName}";
import ${SourceName}Service from "../services/${SourceName}Service";
import DTOService from "../lib/services/DTOService";

@Controller("/${sourceNames}")
export default class ${SourceName}Controller {
  private ${sourceName}Service = Container.get(${SourceName}Service);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<${SourceName}, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [${sourceNames}, total] = await this.${sourceName}Service.getList(
      listQueryObject
    );
    return {
      data: ${sourceNames},
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<${SourceName}, never>> {
    return this.${sourceName}Service.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() create${SourceName}Input: Create${SourceName}Input
  ): Promise<${SourceName}> {
    return this.${sourceName}Service.createOne(create${SourceName}Input);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() update${SourceName}Input: Update${SourceName}Input
  ): Promise<${SourceName}> {
    return this.${sourceName}Service.updateOne(id, update${SourceName}Input);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<${SourceName}[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.${sourceName}Service.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<${SourceName}> {
    return this.${sourceName}Service.deleteOne(id);
  }
}
 `;
};
