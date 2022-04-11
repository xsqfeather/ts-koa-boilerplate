import { PrimaryKey, Property, t } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey({ type: t.bigint, autoincrement: true })
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ onCreate: () => null })
  deletedAt?: null | Date = null;

  @Property({ nullable: true })
  tenantId?: null | string = null;
}
