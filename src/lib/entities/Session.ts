import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { RuleFact } from "./BlockRule";

@Entity()
export class Session extends BaseEntity {
  @Property({ type: "json", nullable: true })
  identiy: {
    username: string | null;
    userId: number | null;
    deviceId: string | null;
    roleName: string | null;
  };

  @Property({ type: "json", nullable: true })
  info?: {
    ip: string;
  } | null = null;

  @Property({ type: "json" })
  ruleFacts: RuleFact[] = [];

  @Property()
  beganAt = new Date();

  @Property()
  isAlive = true;

  @Property({ nullable: true })
  endedAt: Date | null = null;
}
