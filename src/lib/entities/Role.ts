import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Role extends BaseEntity {
  @Property()
  roleName: string;
}
