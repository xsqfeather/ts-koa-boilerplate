import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateProductInput, UpdateProductInput } from "../dtos/products.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Product } from "../entities/Product";
import ProductService from "../services/ProductService";
import DTOService from "../lib/services/DTOService";

@Controller("/products")
export default class ProductController {
  private productService = Container.get(ProductService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Product, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [products, total] = await this.productService.getList(
      listQueryObject
    );
    return {
      data: products,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Product, never>> {
    return this.productService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createProductInput: CreateProductInput
  ): Promise<Product> {
    return this.productService.createOne(createProductInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateProductInput: UpdateProductInput
  ): Promise<Product> {
    return this.productService.updateOne(id, updateProductInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Product[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.productService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Product> {
    return this.productService.deleteOne(id);
  }
}
