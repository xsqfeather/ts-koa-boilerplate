// import { FilterQuery } from "@mikro-orm/core";
import { Inject, Service } from "typedi";
import DI from "../DI";
import { StorageDir } from "../entities/StorageDir";
import { StorageFile } from "../entities/StorageFile";
import CurdService from "./CurdService";
import IpfsService from "./IpfsService";

@Service()
export default class StorageFileService extends CurdService<StorageFile> {
  private storageFileRepository = DI.orm.em.getRepository(StorageFile);

  @Inject(() => IpfsService)
  ipfsService: IpfsService;

  constructor() {
    super(StorageFile);
  }

  async addFile(args: {
    file: File;
    dir: StorageDir;
    fileName: string;
    fileType: string;
  }): Promise<StorageFile> {
    const { dir, fileName, file } = args;
    const ipfsPath = dir.ipfsCid.toString() + "/" + fileName;
    const source = [
      {
        path: ipfsPath,
        content: file,
      },
    ];
    return this.storageFileRepository.create({ ipfsPath });
  }
}
