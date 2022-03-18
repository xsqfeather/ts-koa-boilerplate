import { Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { StorageFile } from "./StorageFile";

enum StorageDirStatus {
  Creating = "Creating",
  Done = "Done",
}

@Entity()
export class StorageDir extends BaseEntity {
  @Property()
  name: string;

  @Property()
  ipfsPath: string;

  @Property({ nullable: true })
  ipns: string;

  @Property({ nullable: true })
  ipfsCid: string;

  @OneToMany(() => StorageFile, (file) => file.dir)
  files: StorageFile[] = [];

  @ManyToOne(() => StorageDir, { nullable: true })
  superior?: StorageDir;

  @Property()
  status: StorageDirStatus = StorageDirStatus.Creating;
}
