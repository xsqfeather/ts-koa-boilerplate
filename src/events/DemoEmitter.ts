import { Service } from "typedi";
import { Article } from "../entities/Article";
import { OnEvent } from "../lib/decorators/OnEvent";
import { BaseEventEmitter } from "../lib/events/BaseEventEmitter";

@Service()
export class ArticleEmitter extends BaseEventEmitter<Article> {
  @OnEvent("AfterCreateOneArticle")
  afterCreateOneHandler(article: Article): Article {
    return article;
  }

  @OnEvent("BeforeCreateOneArticle")
  beforeCreateOneHandler(article: Article): Article {
    return article;
  }
}
