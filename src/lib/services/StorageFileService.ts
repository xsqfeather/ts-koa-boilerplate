// import { FilterQuery } from "@mikro-orm/core";
// import { CID } from "ipfs-http-client";
import { Inject, Service } from "typedi";
import { StorageFile } from "../entities/StorageFile";
import CurdService from "./CurdService";
import IpfsService from "./IpfsService";

@Service()
export default class StorageFileService extends CurdService<StorageFile> {
  @Inject(() => IpfsService)
  ipfsService: IpfsService;

  constructor() {
    super(StorageFile);
  }
}
