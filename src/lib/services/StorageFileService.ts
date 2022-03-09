import { FilterQuery } from "@mikro-orm/core";
import { Service } from "typedi";
import DI from "../DI";
import { StorageFile } from "../entities/StorageFile";
import CurdService from "./CurdService";

@Service()
export default class StorageFileService extends CurdService<StorageFile> {
  private storageFileRepository = DI.orm.em.getRepository(StorageFile);

  constructor() {
    super(StorageFile);
  }

  async uploadFile(file: File): Promise<StorageFile> {
    return this.storageFileRepository.create({});
  }

  async deleteFile(query: FilterQuery<StorageFile>): Promise<void> {
    await this.storageFileRepository.nativeDelete(query);
  }

  saveIntoIpfs() {
    console.log("123");
  }

  //   updateFileStream(readStream: ReadableStream) {
  //      return readStream.pipeTo()
  //   }
}
