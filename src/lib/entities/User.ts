import { Embeddable, Embedded, Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Embeddable()
export class UserProfile {
  age: number;

  gender: "female" | "male";
}

@Embeddable()
export class UserStatus {
  isBlocked: boolean;
}

@Entity()
export class User extends BaseEntity {
  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  roles: string[];

  @Embedded()
  profile!: UserProfile;

  @Embedded()
  useStatus!: UserStatus;

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
