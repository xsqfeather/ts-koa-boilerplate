import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class VideoCollector extends BaseEntity {
  @Property()
  public name: string;

  @Property()
  public url: string;

  @Property()
  public type: string;

  @Property()
  public currentPage = 1;

  @Property()
  public status: string;
}
