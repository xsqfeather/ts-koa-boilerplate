import { Inject, Service } from "typedi";
import { StorageFile } from "../entities/StorageFile";
import CurdService from "./CurdService";
import IpfsService from "./IpfsService";
import StorageDirService from "./StorageDirService";
import { customRandom, random, urlAlphabet } from "nanoid";
import DI from "../DI";

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

  async addOnePublicImage(file: File): Promise<string> {
    const imageDir = await this.storageDirService.getPublicImageDir();
    const imageNumber = nanoid();
    console.log({ file });

    const exts = file.name.split(".");
    const ext = exts[exts.length - 1];
    const fileName = imageNumber + "." + ext;
    const imgPath = imageDir.path + "/" + fileName;
    const ipfsCid = await this.ipfsService.addOneFile(file);
    await this.createOne({
      fileName,
      localPath: imgPath,
      ipfsCid,
      dir: imageDir,
      ext,
      type: file.type,
      otherUrls: [],
    });
    return imgPath;
  }
}
