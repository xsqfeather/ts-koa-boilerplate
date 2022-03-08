import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Good extends BaseEntity {
  @Property()
  public price: string;

  @Property()
  public itemNumber: string;

  @Property()
  public storage: number;

  @Property()
  public name: string;

  @Property()
  public introduction: string;

  @Property()
  public productId: string;

  @Property()
  public images: string;
}
