import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateOrderInput, UpdateOrderInput } from "../dtos/orders.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Order } from "../entities/Order";
import OrderService from "../services/OrderService";
import DTOService from "../lib/services/DTOService";

@Controller("/commands")
export default class CommandController {
  private orderService = Container.get(OrderService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Order, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [orders, total] = await this.orderService.getList(listQueryObject);
    return {
      data: orders,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Order, never>> {
    return this.orderService.getOne(+id);
  }

  @Post("/")
  async createOne(@Body() createOrderInput: CreateOrderInput): Promise<Order> {
    return this.orderService.createOne(createOrderInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateOrderInput: UpdateOrderInput
  ): Promise<Order> {
    return this.orderService.updateOne(+id, updateOrderInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Order[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.orderService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Order> {
    return this.orderService.deleteOne(+id);
  }
}
