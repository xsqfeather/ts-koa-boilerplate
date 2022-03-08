import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/categories.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Category } from "../entities/Category";
import CategoryService from "../services/CategoryService";
import DTOService from "../lib/services/DTOService";

@Controller("/categories")
export default class CategoryController {
  private categoryService = Container.get(CategoryService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Category, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [categories, total] = await this.categoryService.getList(
      listQueryObject
    );
    return {
      data: categories,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Category, never>> {
    return this.categoryService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createCategoryInput: CreateCategoryInput
  ): Promise<Category> {
    return this.categoryService.createOne(createCategoryInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateCategoryInput: UpdateCategoryInput
  ): Promise<Category> {
    return this.categoryService.updateOne(id, updateCategoryInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Category[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.categoryService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Category> {
    return this.categoryService.deleteOne(id);
  }
}
