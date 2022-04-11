import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class VodType extends BaseEntity {
  @Property()
  public name: string;
}
