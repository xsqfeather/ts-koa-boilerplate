// import { FilterQuery } from "@mikro-orm/core";
import { Service } from "typedi";
// import DI from "../DI";
import { StorageDir } from "../entities/StorageDir";
// import { StorageFile } from "../entities/StorageFile";
// import { User } from "../entities/User";
import CurdService from "./CurdService";

@Service()
export default class StorageDirService extends CurdService<StorageDir> {
  // private storageFileRepository = DI.orm.em.getRepository(StorageFile);

  constructor() {
    super(StorageDir);
  }

  // async deleteDir(query: FilterQuery<StorageFile>): Promise<void> {
  //   await this.storageFileRepository.nativeDelete(query);
  // }

  // async createDir(superDir: StorageDir): Promise<void> {
  //   return;
  // }

  // async getRootDir(user?: User): Promise<void> {
  //   return;
  // }

  // async getPublicImageDir(): Promise<void> {
  //   return;
  // }

  // async getPublicAssetsDir(): Promise<void> {
  //   return;
  // }

  // async getPublicUsersDir(): Promise<void> {
  //   return;
  // }

  // async getUserDir(user: User): Promise<void> {
  //   return;
  // }
}
