import { Service } from "typedi";
import DI from "../DI";
import { CreateStorageDirInput } from "../dtos/storageDirs.dto";
import { StorageDir } from "../entities/StorageDir";
import { User } from "../entities/User";
import CurdService from "./CurdService";

@Service()
export default class StorageDirService extends CurdService<StorageDir> {
  private storageDirRepository = DI.orm.em.getRepository(StorageDir);

  constructor() {
    super(StorageDir);
  }

  async createNewDir(
    createStorageDirInput: CreateStorageDirInput
  ): Promise<StorageDir> {
    const { superiorId } = createStorageDirInput;
    let superDir: StorageDir;
    if (superiorId) {
      superDir = await this.storageDirRepository.findOne({ id: superiorId });
    } else {
      superDir = await this.getRootDir();
    }
    const dirPath = superDir.path + "/" + createStorageDirInput.name;
    const newDir = await this.storageDirRepository.findOne({
      path: dirPath,
      superior: null,
    });
    if (newDir) {
      return newDir;
    }
    return this.createOne({
      ...createStorageDirInput,
      superior: superDir.id,
    });
  }

  async getOrCreateDir(superPath: string, name: string): Promise<StorageDir> {
    const dir = await this.storageDirRepository.findOne({
      path: superPath + "/" + name,
      deletedAt: null,
    });
    if (dir) {
      return dir;
    }
    return this.createOne({
      name,
      path: superPath + "/" + name,
    });
  }

  async getPublicImageDir(): Promise<StorageDir> {
    return this.getOrCreateDir("", "images");
  }

  async getPublicVideoDir(): Promise<StorageDir> {
    return this.getOrCreateDir("", "videos");
  }

  async getRootDir(user?: User): Promise<StorageDir> {
    const name = user ? "" + user.id : "home";
    const dir = await this.getOrCreateDir("", name);
    return dir;
  }
}
