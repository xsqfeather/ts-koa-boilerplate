import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { StorageDir } from "./StorageDir";

@Entity()
export class StorageFile extends BaseEntity {
  @Property()
  fileName: string;

  @Property()
  ext: string;

  @Property()
  mime: string;

  @Property()
  ipfsPath: string;

  @Property()
  ipfsCid: string;

  @Property()
  magnet: string;

  @Property()
  otherUrls: [];

  @Property()
  localPath: string;

  @ManyToOne(() => StorageDir)
  dir: StorageDir;
}
