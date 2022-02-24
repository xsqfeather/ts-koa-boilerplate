import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class ACLControl {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  operation: "read" | "put" | "delete";

  @Property()
  operator: "user" | "group" | "role";

  @Property()
  operatorValue: string;

  @Property()
  source: string;

  @Property()
  denyReason: string;

  @Property()
  beganAt = new Date();

  @Property()
  endedAt: Date | null;

  @Property()
  isApproved: boolean;
}
