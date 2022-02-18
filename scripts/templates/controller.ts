import i from "i";

const inflect = i();

export interface classPropType {
  name: string;
  type: string;
}

export interface classPropRuleType extends classPropType {
  rule: string;
}

export const generateControllerCodeText = (
  SourceName: string,
  classProps: classPropType[]
): string => {
  const sourceName = inflect.camelize(SourceName, false);
  const sourceNames = inflect.pluralize(sourceName);
  const source_name = inflect.underscore(SourceName);
  const source_names = inflect.pluralize(source_name);
  const projection = (): string => {
    let text = "id";
    for (let index = 0; index < classProps.length; index++) {
      const prop = classProps[index];
      text += ` ${prop.name}`;
    }
    return text;
  };
  return `
   import { DocumentType } from "@typegoose/typegoose";

import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Post as HttpPost,
  Put,
  Query,
} from "amala";
import Container from "typedi";
import { ${SourceName} } from "../models/${SourceName}";
import {
  Create${SourceName}Input,
  Update${SourceName}Input,
} from "../dtos/${source_names}.dto";
import { ${SourceName}Service } from "../services/${SourceName}Service";
import { FindListResult } from "../types/controller";

@Controller("/erotic_${source_names}")
export default class ${SourceName}Controller {
  private ${sourceName}Service = Container.get(${SourceName}Service);

  @Get("/")
  async index(
    @Query() query?: { filter?: string; range?: string; sort?: string }
  ): Promise<FindListResult<${SourceName}>> {
    const [${sourceNames}, total] = await this.${sourceName}Service.getList({
      query,
      projection: "${projection()}",
    });

    return {
      total: total,
      list: ${sourceNames},
    };
  }

  @Get("/:id")
  async getOne(@Params("id") id: string): Promise<${SourceName}> {
    return this.${sourceName}Service.getOne(id, "${projection()}");
  }

  @HttpPost("/")
  async createOne(
    @Body() create${SourceName}Input: Create${SourceName}Input
  ): Promise<${SourceName}> {
    return this.${sourceName}Service.createOne(create${SourceName}Input);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() update${SourceName}Input: Update${SourceName}Input
  ): Promise<{ prev: ${SourceName}; now: ${SourceName} | null }> {
    return this.${sourceName}Service.updateOne(id, update${SourceName}Input);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<DocumentType<${SourceName}>> {
    return this.${sourceName}Service.deleteOne(id);
  }

  @Delete("/")
  async deleteMany(
    @Query() query: { filter: string }
  ): Promise<FindListResult<${SourceName}>> {
    return this.${sourceName}Service.deleteMany(query);
  }
}

    `;
};
