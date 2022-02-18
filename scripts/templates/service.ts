import i from "i";

const inflect = i();
export const generateServiceCodeText = (SourceName: string): string => {
  const sourceName = inflect.camelize(SourceName, false);
  const sourceNames = inflect.pluralize(sourceName);
  const source_name = inflect.underscore(SourceName);
  const source_names = inflect.pluralize(source_name);
  return `import { ListQueryFilter } from "../types/base";
import { Inject, Service } from "typedi";
import { ${SourceName}, ${SourceName}Model } from "../models/${SourceName}";
import { CommonService } from "./CommonService";
import { DocumentType, mongoose } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import {
  Create${SourceName}Input,
  Update${SourceName}Input,
} from "../dtos/${source_names}.dto";
import { FindListResult } from "../types/controller";

@Service()
export class ${SourceName}Service {
  @Inject(() => CommonService)
  private commonService: CommonService;

  async getList({
    query,
    projection,
  }: {
    query?: { filter?: string; range?: string; sort?: string };
    projection: string;
  }): Promise<[DocumentType<${SourceName}, BeAnObject>[], number]> {
    const {
      query: mongoQuery,
      range,
      sort,
    } = this.commonService.parseQuery(
      query,
      (filter: ListQueryFilter) => filter
    );
    try {
      const [${sourceNames}, total ] = await ${SourceName}Model.getPagedAndCount<${SourceName}>({
        query: mongoQuery,
        range,
        sort,
        projection,
      });
      return [${sourceNames}, total ];
    } catch (error) {
      throw error;
    }
  }

  async getOne(
    id: string,
    projection: string
  ): Promise<DocumentType<${SourceName}, BeAnObject>> {
    const ${sourceName} = await ${SourceName}Model.getOneByNumberId(Number(id), projection);
    return ${sourceName};
  }

  async createOne(
    create${SourceName}Input: Create${SourceName}Input
  ): Promise<${SourceName}> {
    const post = await ${SourceName}Model.createOne(create${SourceName}Input);
    return post;
  }

  async updateOne(
    id: string,
    update${SourceName}Input: Update${SourceName}Input
  ): Promise<{ prev: ${SourceName}; now: ${SourceName} | null }> {
    const { prev, now } = await ${SourceName}Model.writeOne<${SourceName}>({
      query: { _id: new mongoose.Types.ObjectId(id) },
      doc: update${SourceName}Input,
    });
    return {
      now,
      prev,
    };
  }

  async deleteOne(id: string): Promise<DocumentType<${SourceName}>> {
    const ${sourceName} = await ${SourceName}Model.getOneById<${SourceName}>(
      new mongoose.Types.ObjectId(id),
      "_id"
    );
    await ${SourceName}Model.softDeleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return ${sourceName};
  }

  async deleteMany(query: {
    filter: string;
  }): Promise<FindListResult<${SourceName}>> {
    const { ids } = JSON.parse(query.filter);

    const ${sourceName} = await ${SourceName}Model.softDeleteMany<${SourceName}>({
      id: { $in: ids },
    });
    return {
      total: ids.length,
      list: ${sourceName},
    };
  }
}`;
};
