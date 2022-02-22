import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../lib/entities/BaseEntity";
import { Author } from "./Author";

@Entity()
export class Article extends BaseEntity {
  @Property()
  title: string;

  @Property()
  cover: string;

  @Property()
  body: string;

  @Property()
  isPublished = false;

  @ManyToOne()
  author: Author;

  constructor(title: string, body: string) {
    super();
    this.title = title;
    this.body = body;
  }
}
