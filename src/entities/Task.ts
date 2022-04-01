import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Task extends BaseEntity {
  @Property()
  public name: string;

  @Property()
  public resource: string;

  @Property()
  public resourceId: string;
}
