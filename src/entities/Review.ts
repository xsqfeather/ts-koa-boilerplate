import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Review extends BaseEntity {
  @Property()
  public comment: string;

  @Property()
  public date: Date;

  @Property()
  public customerId: string;
}
