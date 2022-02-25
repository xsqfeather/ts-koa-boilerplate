import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class RuleCondition extends BaseEntity {
  @Property()
  fact: string;

  @Property()
  operator: string;

  @Property()
  value: string;

  @Property()
  path: string;
}
