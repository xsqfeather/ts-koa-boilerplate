import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  roles: string[];

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
