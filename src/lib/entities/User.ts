import { Embeddable, Embedded, Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Embeddable()
export class UserProfile {
  age?: number;

  gender?: "female" | "male";

  username?: string;

  email?: string;
}

@Embeddable()
export class UserStatus {
  isBlocked: boolean;

  constructor() {
    this.isBlocked = true;
  }
}

@Entity()
export class User extends BaseEntity {
  @Property()
  password: string;

  @Property()
  roles: string[];

  @Property()
  profile!: UserProfile;

  @Property()
  userStatus?: UserStatus = {
    isBlocked: false,
  };

  constructor(profile: UserProfile, password: string) {
    super();
    this.profile = profile;
    this.password = password;
  }
}
