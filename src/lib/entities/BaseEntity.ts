import { PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

export abstract class BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ onCreate: () => null })
  deletedAt?: null | Date = null;

  @Property()
  acl?: {
    read: {
      roles: string[];
      attrs: string[];
      users: string[];
    };
  };
}
