import { BaseEventEmitter } from "../lib/events/emitters";
import { Service } from "typedi";
import { DocumentType } from "@typegoose/typegoose";
import { on_article_created } from "../constants/events";
import { Article } from "../models/Article";

@Service()
export class DemoEmitter extends BaseEventEmitter<
  typeof on_article_created,
  DocumentType<Article>
> {
  @OnEvent(on_article_created)
  async onArticleCreated(
    article: DocumentType<Article>
  ): Promise<DocumentType<Article>> {
    return article;
  }
}
