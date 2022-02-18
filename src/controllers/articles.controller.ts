import { Controller, Get } from "amala";
import { Article } from "../entities/Article";
import { FindListResult } from "../types/controller";

@Controller("/articles")
export default class ArticleController {
  @Get("/")
  index(): FindListResult<Article> {
    return {
      total: 0,
      list: [],
    };
  }
}
