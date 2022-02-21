import { Service } from "typedi";
import { Article } from "../entities/Article";
import CurdService from "../lib/services/CurdService";

@Service()
export default class ArticleService extends CurdService<Article> {
  constructor() {
    super(Article);
  }
}
