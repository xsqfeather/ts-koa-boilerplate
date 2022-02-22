import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Session extends BaseEntity {
  @Property()
  identiy: {
    username: string | null;
    userId: string | null;
    deviceId: string | null;
    roleName: string | null;
    roleId: string | null;
  };

  @Property()
  attributes: {
    [x: string]: string | number;
  };

  @Property()
  token: string;

  @Property()
  beganAt = new Date();

  @Property()
  endedAt: Date | null;
}
