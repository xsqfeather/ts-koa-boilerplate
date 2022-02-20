import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Permission {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  resource: string;

  @Property()
  operator:
    | "getList"
    | "getMany"
    | "getOne"
    | "updateOne"
    | "updateMany"
    | "deleteOne"
    | "deleteMany";

  @Property()
  beganAt = new Date();

  @Property()
  endedAt: Date | null;
}
