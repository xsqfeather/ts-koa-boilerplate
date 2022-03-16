import { Inject, Service } from "typedi";
import DI from "../DI";
import { CreateStorageDirInput } from "../dtos/storageDirs.dto";
import { StorageDir } from "../entities/StorageDir";
import { User } from "../entities/User";
import CurdService from "./CurdService";
import IpfsService from "./IpfsService";

@Service()
export default class StorageDirService extends CurdService<StorageDir> {
  private storageFileRepository = DI.orm.em.getRepository(StorageDir);

  @Inject(() => IpfsService)
  private ipfsService: IpfsService;

  constructor() {
    super(StorageDir);
  }

  async createNewDir(
    createStorageDirInput: CreateStorageDirInput
  ): Promise<StorageDir> {
    const { superior } = createStorageDirInput;
    let superDir = null;
    if (superior) {
      superDir = await this.storageFileRepository.findOne({ id: superior });
    } else {
      superDir = await this.getRootDir();
    }
    const dirPath = superDir.ipfsPath + "/" + createStorageDirInput.name;
    const newDir = await this.storageFileRepository.findOne({
      ipfsPath: dirPath,
      superior: null,
    });
    if (newDir) {
      return newDir;
    }
    const newIpfsRlt = await this.ipfsService.createDir(dirPath);
    return this.createOne({
      ...createStorageDirInput,
      superior: superDir.id,
      ipfsCid: newIpfsRlt.cid.toString(),
      ipfsPath: superDir.ipfsPath + "/" + createStorageDirInput.name,
    });
  }

  async getOrCreateDir(dirPath: string): Promise<StorageDir> {
    const dir = await this.storageFileRepository.findOne({
      ipfsPath: dirPath,
      superior: null,
    });
    if (dir) {
      return dir;
    }
    const ipfsResult = await this.ipfsService.createDir(dirPath);
    return this.createOne({
      name: "images",
      ipfsPath: dirPath,
      ipfsCid: ipfsResult.cid.toString(),
    });
  }

  async getPublicImageDir(): Promise<StorageDir> {
    return this.getOrCreateDir("/images");
  }

  async getRootDir(user?: User): Promise<StorageDir> {
    const path = user ? "/" + user.id : "/home";
    return this.getOrCreateDir(path);
  }
}
