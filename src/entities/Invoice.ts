import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Invoice extends BaseEntity {
  @Property()
  public commandId: string;

  @Property()
  public totalExTaxes: number;

  @Property()
  public deliveryFees: number;

  @Property()
  public taxes: number;

  @Property()
  public total: number;
}
