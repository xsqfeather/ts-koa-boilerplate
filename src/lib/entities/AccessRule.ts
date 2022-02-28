import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class AccessRule extends BaseEntity {
  @Property()
  name: string;

  @Property()
  fact: string;

  @Property()
  operator: string;

  @Property()
  value: string;

  @Property()
  allowed: boolean;
}
