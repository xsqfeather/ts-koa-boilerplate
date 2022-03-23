import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import {
  CreateStorageDirInput,
  UpdateStorageDirInput,
} from "../dtos/storageDirs.dto";
import { StorageDir } from "../entities/StorageDir";
import StorageDirService from "../services/StorageDirService";
import DTOService from "../services/DTOService";

@Controller("/storageDirs")
export default class StorageDirController {
  private storageDirService = Container.get(StorageDirService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<StorageDir, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);

    const [storageDirs, total] = await this.storageDirService.getList(
      listQueryObject
    );
    return {
      data: storageDirs,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<StorageDir, never>> {
    return this.storageDirService.getOne(id);
  }

  @Post("/")
  async createOne(
    @Body() createStorageDirInput: CreateStorageDirInput
  ): Promise<StorageDir> {
    let superDir: StorageDir;
    if (createStorageDirInput.superiorId) {
      superDir = await this.storageDirService.getById(
        createStorageDirInput.superiorId
      );
    } else {
      superDir = await this.storageDirService.getRootDir();
    }
    return this.storageDirService.createOne({
      ...createStorageDirInput,
      path: superDir.path + "/" + createStorageDirInput.name,
      superiorId: superDir.id,
    });
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateStorageDirInput: UpdateStorageDirInput
  ): Promise<StorageDir> {
    return this.storageDirService.updateOne(id, updateStorageDirInput);
  }

  @Delete("/")
  async deleteMany(
    @Query() deleteInput: DeleteManyInput
  ): Promise<StorageDir[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.storageDirService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<StorageDir> {
    return this.storageDirService.deleteOne(id);
  }
}
