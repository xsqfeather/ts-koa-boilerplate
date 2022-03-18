import { Loaded } from "@mikro-orm/core";
import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Post,
  Put,
  Query,
  Files,
} from "amala";
import Container from "typedi";
import { DeleteManyInput, ListQuery } from "../../dtos/common.dto";
import { UpdateStorageFileInput } from "../dtos/storageFiles.dto";
import { StorageFile } from "../entities/StorageFile";
import StorageFileService from "../services/StorageFileService";
import DTOService from "../services/DTOService";
import { filter } from "lodash";
import IpfsService from "../services/IpfsService";

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
    console.log({ listQueryObject });

    const [storageFiles, total] = await this.storageFileService.getList({
      ...listQueryObject,
      filter: {
        ...filter,
        superior: {
          $ne: null,
        },
      },
    });
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
    // @Body() createStorageFileInput: CreateStorageFileInput,
    @Files() files: Record<string, File>
  ): Promise<{
    location: string;
  }> {
    const fileHash = await this.storageFileService.addOnePublicImage(
      files["file"]
    );
    const fileLocation = `https://files.woogege.com/ipfs/${fileHash}`;
    return {
      location: fileLocation,
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
