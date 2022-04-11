import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import { CreateSessionInput, UpdateSessionInput } from "../dtos/session.dto";
import { Session } from "../entities/Session";
import SessionService from "../services/SessionService";
import DTOService from "../services/DTOService";

@Controller("/sessions")
export default class SessionController {
  private sessionService = Container.get(SessionService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Session, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [sessions, total] = await this.sessionService.getList(
      listQueryObject
    );
    return {
      data: sessions,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Session, never>> {
    return this.sessionService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createSessionInput: CreateSessionInput
  ): Promise<Session> {
    return this.sessionService.createOne(createSessionInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateSessionInput: UpdateSessionInput
  ): Promise<Session> {
    return this.sessionService.updateOne(+id, updateSessionInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Session[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.sessionService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Session> {
    return this.sessionService.deleteOne(+id);
  }
}
