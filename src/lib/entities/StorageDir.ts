import { Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { StorageFile } from "./StorageFile";
import { User } from "./User";

@Entity()
export class StorageDir extends BaseEntity {
  @Property()
  name: string;

  @Property()
  ipfsCid: string;

  @OneToMany(() => StorageFile, (file) => file.dir)
  files: StorageFile[];

  @ManyToOne()
  superior: StorageDir;

  @ManyToOne()
  owner: User;
}
