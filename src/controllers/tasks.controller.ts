import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateTaskInput, UpdateTaskInput } from "../dtos/tasks.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Task } from "../entities/Task";
import TaskService from "../services/TaskService";
import DTOService from "../lib/services/DTOService";

@Controller("/tasks")
export default class TaskController {
  private taskService = Container.get(TaskService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Task, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [tasks, total] = await this.taskService.getList(listQueryObject);
    return {
      data: tasks,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Task, never>> {
    return this.taskService.getOne(id);
  }

  @Post("/")
  async createOne(@Body() createTaskInput: CreateTaskInput): Promise<Task> {
    return this.taskService.createOne(createTaskInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateTaskInput: UpdateTaskInput
  ): Promise<Task> {
    return this.taskService.updateOne(id, updateTaskInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Task[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.taskService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Task> {
    return this.taskService.deleteOne(id);
  }
}
