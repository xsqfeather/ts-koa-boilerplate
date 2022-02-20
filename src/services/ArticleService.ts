import { Loaded } from "@mikro-orm/core";
import { Service } from "typedi";
import { CreateArticleInput, UpdateArticleInput } from "../dtos/articles.dto";
import { ListQueryObject } from "../dtos/common.dto";
import { Article } from "../entities/Article";
import CurdService from "./CurdService";

@Service()
export default class ArticleService extends CurdService<Article> {
  constructor() {
    super(Article);
  }

  getList(
    listQuery: ListQueryObject
  ): Promise<[Loaded<Article, never>[], number]> {
    return this.getPaged(listQuery);
  }

  getOne(id: string): Promise<Loaded<Article, never>> {
    return this.getById(id);
  }

  async createOne(input: CreateArticleInput): Promise<Article> {
    return this.insertOne(input);
  }

  async updateOne(
    id: string,
    input: UpdateArticleInput
  ): Promise<Article | null> {
    return this.putOne(id, input);
  }

  async deleteMany(ids: string[]): Promise<Article[]> {
    return this.removeMany(ids);
  }

  async deleteOne(id: string): Promise<Article> {
    return this.removeOne(id);
  }
}
