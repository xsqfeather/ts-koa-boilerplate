import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Order extends BaseEntity {
  @Property()
  public date: Date;

  @Property()
  public reference: string;

  @Property()
  public status: string;

  @Property()
  public returned: string;

  @Property()
  public customerId: string;
}
