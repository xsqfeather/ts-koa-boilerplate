// import { FilterQuery } from "@mikro-orm/core";
// import { CID } from "ipfs-http-client";
import { UUID } from "bson";
import { Inject, Service } from "typedi";
import { StorageFile } from "../entities/StorageFile";
import CurdService from "./CurdService";
import IpfsService from "./IpfsService";
import StorageDirService from "./StorageDirService";

@Service()
export default class StorageFileService extends CurdService<StorageFile> {
  @Inject(() => IpfsService)
  ipfsService: IpfsService;

  @Inject(() => StorageDirService)
  storageDirService: StorageDirService;

  constructor() {
    super(StorageFile);
  }

  async addOnePublicImage(file: File): Promise<string> {
    const imageDir = await this.storageDirService.getPublicImageDir();
    const uuid = new UUID();
    console.log(file.name.split("."));
    const exts = file.name.split(".");
    const ext = exts[exts.length - 1];
    const fileName = uuid + "." + ext;
    const imgPath = imageDir.ipfsPath + "/" + fileName;
    //QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn
    await this.ipfsService.addOneFile({
      ipfsPath: imgPath,
      file,
    });
    return imgPath;
  }
}
