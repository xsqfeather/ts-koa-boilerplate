import { Entity, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Role } from "./Role";
import { User } from "./User";

@Entity()
export class UserRole extends BaseEntity {
  @ManyToOne()
  user!: User;

  @ManyToOne()
  role!: Role;
}
