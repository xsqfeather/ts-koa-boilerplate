import { Loaded } from "@mikro-orm/core";
import {
  Body,
  Controller,
  Delete,
  Flow,
  Get,
  Params,
  Post,
  Put,
  Query,
  Files,
  Ctx,
} from "amala";
import Container from "typedi";
import { CreateArticleInput, UpdateArticleInput } from "../dtos/articles.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Article } from "../entities/Article";
import ArticleService from "../services/ArticleService";
import DTOService from "../lib/services/DTOService";
import authMiddleware from "../lib/middles/authMIddleware";
import StorageFileService from "../lib/services/StorageFileService";
import Koa from "koa";

@Controller("/articles")
export default class ArticleController {
  private articleService = Container.get(ArticleService);

  private dtoService = Container.get(DTOService);

  private storageFileService = Container.get(StorageFileService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Article, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [articles, total] = await this.articleService.getList(
      listQueryObject
    );
    return {
      data: articles,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Article, never>> {
    return this.articleService.getOne(id);
  }

  @Post("/")
  @Flow([authMiddleware])
  async createOne(
    @Body() createArticleInput: CreateArticleInput
  ): Promise<Article> {
    return this.articleService.createOne(createArticleInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateArticleInput: UpdateArticleInput
  ): Promise<Article> {
    return this.articleService.updateOne(id, updateArticleInput);
  }

  @Post("/edit/upload")
  async uploadCover(
    @Files() files: Record<string, File>,
    @Ctx() ctx: Koa.Context
  ): Promise<{
    location?: string;
    success: boolean;
    reason?: string;
  }> {
    const { success, reason, uploaded } =
      await this.storageFileService.addOnePublicImage(files["file"]);
    if (!success) {
      ctx.status = 403;
      return {
        success,
        reason,
      };
    }

    return {
      success,
      location: `${ctx.origin}/_imgs/${uploaded?.fileName}`,
    };
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Article[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.articleService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Article> {
    return this.articleService.deleteOne(id);
  }
}
