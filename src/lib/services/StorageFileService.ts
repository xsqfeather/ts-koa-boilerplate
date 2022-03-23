import { Inject, Service } from "typedi";
import { StorageFile } from "../entities/StorageFile";
import CurdService from "./CurdService";
import IpfsService from "./IpfsService";
import StorageDirService from "./StorageDirService";
import { customRandom, random, urlAlphabet } from "nanoid";
import DI from "../DI";
import { StorageDir } from "../entities/StorageDir";

const nanoid = customRandom(urlAlphabet, 8, random);

@Service()
export default class StorageFileService extends CurdService<StorageFile> {
  private storageFileRepository = DI.em.getRepository(StorageFile);

  @Inject(() => IpfsService)
  ipfsService: IpfsService;

  @Inject(() => StorageDirService)
  storageDirService: StorageDirService;

  constructor() {
    super(StorageFile);
  }

  findOneByPath(path: string): Promise<StorageFile> {
    return this.storageFileRepository.findOne({ localPath: path });
  }

  async catFile(storageFile: StorageFile): Promise<Buffer> {
    return this.ipfsService.catFile(storageFile.ipfsCid);
  }

  async addOnePublicFile(file: File, dir: StorageDir): Promise<StorageFile> {
    const fileNumber = nanoid();
    const exts = file.name.split(".");
    const ext = exts[exts.length - 1];
    const fileName = fileNumber + "." + ext;
    const imgPath = dir.path + "/" + fileName;
    const ipfsCid = await this.ipfsService.addOneFile(file);
    return this.createOne({
      fileName,
      localPath: imgPath,
      ipfsCid,
      dir: dir,
      ext,
      type: file.type,
      otherUrls: [],
    });
  }

  async addOnePublicImage(file: File): Promise<{
    success: boolean;
    uploaded?: StorageFile;
    reason?: string;
  }> {
    if (!file.type.includes("image")) {
      return {
        success: false,
        reason: "FILE_TYPE_NOT_MATCH",
      };
    }
    const imageDir = await this.storageDirService.getPublicImageDir();
    const uploaded = await this.addOnePublicFile(file, imageDir);
    return {
      success: true,
      uploaded,
    };
  }

  async addOnePublicVideo(file: File): Promise<{
    success: boolean;
    uploaded?: StorageFile;
    reason?: string;
  }> {
    if (!file.type.includes("video")) {
      return {
        success: false,
        reason: "FILE_TYPE_NOT_MATCH",
      };
    }
    const videoDir = await this.storageDirService.getPublicVideoDir();
    const uploaded = await this.addOnePublicFile(file, videoDir);
    return {
      success: true,
      uploaded,
    };
  }
}
