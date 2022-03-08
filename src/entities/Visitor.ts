import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class Visitor extends BaseEntity {
  @Property()
  public firstName: string;

  @Property()
  public lastName: string;

  @Property()
  public email: string;

  @Property()
  public address: string;

  @Property()
  public birthday: Date;

  @Property()
  public zipCode: string;

  @Property()
  public city: string;

  @Property()
  public password: string;
}
