import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
export class UserAttribute extends BaseEntity {
  @ManyToOne()
  user: User;

  @Property()
  attributeKey: string;

  @Property()
  attributeValue: string | number;

  @Property()
  beganAt = new Date();

  @Property()
  endedAt: Date | null;
}
