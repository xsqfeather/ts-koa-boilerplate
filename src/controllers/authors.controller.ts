import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateAuthorInput, UpdateAuthorInput } from "../dtos/authors.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Author } from "../entities/Author";
import AuthorService from "../services/AuthorService";
import DTOService from "../services/DTOService";

@Controller("/authors")
export default class AuthorController {
  private authorService = Container.get(AuthorService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Author, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [authors, total] = await this.authorService.getList(listQueryObject);
    return {
      data: authors,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Author, never>> {
    return this.authorService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createAuthorInput: CreateAuthorInput
  ): Promise<Author> {
    return this.authorService.createOne(createAuthorInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateAuthorInput: UpdateAuthorInput
  ): Promise<Author> {
    return this.authorService.updateOne(id, updateAuthorInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Author[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.authorService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Author> {
    return this.authorService.deleteOne(id);
  }
}
