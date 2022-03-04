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

  @Property()
  info: {
    ip: string | null;
  };

  @Property()
  ruleFacts: RuleFact[];

  @Property()
  token: string;

  @Property()
  beganAt = new Date();

  @Property()
  endedAt: Date | null;
}
