import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { RuleFact } from "./BlockRule";

@Entity()
export class Session extends BaseEntity {
  @Property()
  identiy: {
    username: string | null;
    userId: string | null;
    deviceId: string | null;
    roleName: string | null;
  };

  @Property({ nullable: true })
  info?: {
    ip: string;
  } | null = null;

  @Property()
  ruleFacts: RuleFact[] = [];

  @Property()
  beganAt = new Date();

  @Property()
  isAlive = true;

  @Property({ nullable: true })
  endedAt: Date | null = null;
}
