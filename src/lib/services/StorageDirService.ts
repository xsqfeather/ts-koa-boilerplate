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

  // async deleteDir(query: FilterQuery<StorageFile>): Promise<void> {
  //   await this.storageFileRepository.nativeDelete(query);
  // }

  // async createDir(superDir: StorageDir): Promise<void> {
  //   return;
  // }

  async getRootDir(user?: User): Promise<StorageDir> {
    const path = user ? "/" + user.id : "/home";
    const rootDir = await this.storageFileRepository.findOne({
      ipfsPath: path,
      superior: null,
    });
    if (rootDir) {
      return rootDir;
    }
    const ipfsResult = await this.ipfsService.createDir(path);
    return this.createOne({
      name: "home",
      ipfsPath: path,
      ipfsCid: ipfsResult.cid.toString(),
    });
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

  async getPublicImageDir(): Promise<StorageDir> {
    const path = "/images";
    const rootDir = await this.storageFileRepository.findOne({
      ipfsPath: path,
      superior: null,
    });
    if (rootDir) {
      return rootDir;
    }
    const ipfsResult = await this.ipfsService.createDir(path);
    return this.createOne({
      name: "home",
      ipfsPath: path,
      ipfsCid: ipfsResult.cid.toString(),
    });
  }

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
