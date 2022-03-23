import { Loaded } from "@mikro-orm/core";
import {
  Body,
  Controller,
  Ctx,
  Delete,
  Files,
  Get,
  Params,
  Post,
  Put,
  Query,
} from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import {
  CreateStorageFileInput,
  UpdateStorageFileInput,
} from "../dtos/storageFiles.dto";
import { StorageFile } from "../entities/StorageFile";
import StorageFileService from "../services/StorageFileService";
import DTOService from "../services/DTOService";
import IpfsService from "../services/IpfsService";
import Koa from "koa";

@Controller("/storageFiles")
export default class StorageFileController {
  private storageFileService = Container.get(StorageFileService);

  private ipfsService = Container.get(IpfsService);

  private dtoService = Container.get(DTOService);

  constructor() {
    this.ipfsService.initIpfsClient();
  }

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<StorageFile, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);

    const [storageFiles, total] = await this.storageFileService.getList(
      listQueryObject
    );
    return {
      data: storageFiles,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<StorageFile, never>> {
    return this.storageFileService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createStorageFileInput: CreateStorageFileInput
  ): Promise<StorageFile> {
    return this.storageFileService.createOne(createStorageFileInput);
  }

  @Post("/upload")
  async uploadFile(
    @Files() files: Record<string, File>,
    @Ctx() ctx: Koa.Context
  ): Promise<{
    location?: string;
    success: boolean;
    reason?: string;
  }> {
    const { success, reason, uploaded } =
      await this.storageFileService.addOnePublicImage(files["file"]);
    if (!success) {
      ctx.status = 403;
      return {
        success,
        reason,
      };
    }

    return {
      success,
      location: `${ctx.origin}/_imgs/${uploaded?.fileName}`,
    };
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateStorageFileInput: UpdateStorageFileInput
  ): Promise<StorageFile> {
    return this.storageFileService.updateOne(id, updateStorageFileInput);
  }

  @Delete("/")
  async deleteMany(
    @Query() deleteInput: DeleteManyInput
  ): Promise<StorageFile[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.storageFileService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<StorageFile> {
    return this.storageFileService.deleteOne(id);
  }
}
