import { Service } from "typedi";
import { Category } from "../entities/Category";
import CurdService from "../lib/services/CurdService";

@Service()
export default class CategoryService extends CurdService<Category> {
  constructor() {
    super(Category);
  }
}
