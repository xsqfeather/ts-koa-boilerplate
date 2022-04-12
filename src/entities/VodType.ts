import { Entity, Property, t } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class VodType extends BaseEntity {
  @Property()
  public name: string;

  @Property({ type: t.bigint })
  public count: number;
}
