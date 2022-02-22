import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../lib/entities/BaseEntity";
import { User } from "../lib/entities/User";

@Entity()
export class Author extends BaseEntity {
  @Property()
  name: string;

  @Property()
  email: string;

  @OneToOne()
  user: User;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
