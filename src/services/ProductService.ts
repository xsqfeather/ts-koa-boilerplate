import { Service } from "typedi";
import { Product } from "../entities/Product";
import CurdService from "../lib/services/CurdService";

@Service()
export default class ProductService extends CurdService<Product> {
  constructor() {
    super(Product);
  }
}
