import { Service } from "typedi";
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { StatResult } from "ipfs-core-types/src/files/index";

let ipfsClient: IPFSHTTPClient;
@Service()
export default class IpfsService {
  public async initIpfsClient(): Promise<void> {
    ipfsClient = create({ url: "https://fileapi.woogege.com" });
  }

  public async createDir(path: string): Promise<StatResult> {
    if (!ipfsClient) {
      await this.initIpfsClient();
    }
    try {
      const checkStat = await ipfsClient.files.stat(path);

      if (checkStat.type !== "directory") {
        await ipfsClient.files.mkdir(path);
      }
      return checkStat;
    } catch (error) {
      console.log("checkStat filed", error);

      await ipfsClient.files.mkdir(path);
      return this.createDir(path);
    }
  }
}
