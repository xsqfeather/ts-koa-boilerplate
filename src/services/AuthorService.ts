import { Loaded } from "@mikro-orm/core";
import { Service } from "typedi";
import { CreateAuthorInput, UpdateAuthorInput } from "../dtos/authors.dto";
import { ListQueryObject } from "../dtos/common.dto";
import { Author } from "../entities/Author";
import CurdService from "./CurdService";

@Service()
export default class AuthorService extends CurdService<Author> {
  constructor() {
    super(Author);
  }

  getList(
    listQuery: ListQueryObject
  ): Promise<[Loaded<Author, never>[], number]> {
    return this.getPaged(listQuery);
  }

  getOne(id: string): Promise<Loaded<Author, never>> {
    return this.getById(id);
  }

  async createOne(input: CreateAuthorInput): Promise<Author> {
    return this.insertOne(input);
  }

  async updateOne(
    id: string,
    input: UpdateAuthorInput
  ): Promise<Author | null> {
    return this.putOne(id, input);
  }

  async deleteMany(ids: string[]): Promise<Author[]> {
    return this.removeMany(ids);
  }

  async deleteOne(id: string): Promise<Author> {
    return this.removeOne(id);
  }
}
