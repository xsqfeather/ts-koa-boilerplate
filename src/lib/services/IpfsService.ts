import { Service } from "typedi";
import { create, IPFSHTTPClient, urlSource } from "ipfs-http-client";
import { StatResult } from "ipfs-core-types/src/files/index";
import { unlinkSync, readFileSync } from "fs";
import { PublishResult } from "ipfs-core-types/src/name";

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

  async addOneFile(file: any): Promise<string> {
    if (!ipfsClient) {
      await this.initIpfsClient();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filePath = (file as any)?.path;
    if (filePath) {
      const uploadRlt = await ipfsClient.add(readFileSync(filePath), {
        progress: (bytes: number, path?: string) => {
          console.log({
            bytes,
            path,
          });
        },
      });
      unlinkSync(filePath);
      return uploadRlt.cid.toString();
    }
  }

  async addOneFileFromUrl(url: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadRlt = await ipfsClient.add(urlSource(url) as any);
    return uploadRlt.cid.toString();
  }

  publishName(ipfsCid: string): Promise<PublishResult> {
    return ipfsClient.name.publish(ipfsCid);
  }

  async catFile(ipfsCid: string): Promise<Buffer> {
    const chucks: Uint8Array[] = [];
    for await (const chunk of ipfsClient.cat(ipfsCid)) {
      chucks.push(chunk);
    }
    return Buffer.concat(chucks as unknown as readonly Uint8Array[]);
  }
}
