import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "./BaseEntity";

@Entity()
export class Author extends BaseEntity {
  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted = false;

  @Property()
  born?: Date;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
