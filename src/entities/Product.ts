import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Product extends BaseEntity {
  @Property()
  public image: string;

  @Property()
  public thumbnail: string;

  @Property()
  public price: string;

  @Property()
  public width: number;

  @Property()
  public height: number;

  @Property()
  public categoryId: string;

  @Property()
  public stock: number;

  @Property()
  public description: string;
}
