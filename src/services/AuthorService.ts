import { Service } from "typedi";
import { Author } from "../entities/Author";
import CurdService from "../lib/services/CurdService";

@Service()
export default class AuthorService extends CurdService<Author> {
  constructor() {
    super(Author);
  }
}
