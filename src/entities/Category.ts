import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Category extends BaseEntity {
  @Property()
  public name: string;
}
