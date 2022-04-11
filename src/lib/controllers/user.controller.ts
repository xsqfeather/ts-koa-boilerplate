import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import { CreateUserInput, UpdateUserInput } from "../dtos/users.dto";
import { User } from "../entities/User";
import UserService from "../services/UserService";
import DTOService from "../services/DTOService";

@Controller("/users")
export default class UserController {
  private userService = Container.get(UserService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<User, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [users, total] = await this.userService.getList(listQueryObject);
    return {
      data: users,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<User, never>> {
    return this.userService.getOne(+id);
  }

  @Post("/")
  async createOne(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.userService.createOne(createUserInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.userService.updateOne(+id, updateUserInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<User[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.userService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<User> {
    return this.userService.deleteOne(+id);
  }
}
