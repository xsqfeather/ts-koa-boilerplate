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
  type: string;

  @Property()
  ipfsCid: string;

  @Property({ nullable: true })
  magnet: string;

  @Property({ type: "json" })
  otherUrls: [];

  @Property({ nullable: true })
  localPath?: string;

  @ManyToOne(() => StorageDir)
  dir: StorageDir;
}
