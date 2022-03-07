import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Migration extends BaseEntity {
  @Property()
  name: string;

  @Property()
  hasDone: boolean;
}
