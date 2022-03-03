import { Embeddable, Embedded, Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Embeddable()
export class UserProfile {
  age: number;

  gender: "female" | "male";

  username: string;
}

@Embeddable()
export class UserStatus {
  isBlocked: boolean;
}

@Entity()
export class User extends BaseEntity {
  @Property()
  password: string;

  @Property()
  roles: string[];

  @Embedded()
  profile!: UserProfile;

  @Embedded()
  useStatus!: UserStatus;

  constructor(profile: UserProfile, password: string) {
    super();
    this.profile = profile;
    this.password = password;
  }
}
