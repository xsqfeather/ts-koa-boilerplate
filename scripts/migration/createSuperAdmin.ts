import UserService from "../../src/lib/services/UserService";
import DTOService from "../../src/lib/services/DTOService";
import { UserProfile } from "../../src/lib/entities/User";

export default async function createSuperAdmin(
  username: string,
  password: string
): Promise<void> {
  const userService = new UserService();
  const dtoService = new DTOService();
  await userService.deleteSuperAdmin();

  const profile = new UserProfile();
  profile.username = username;
  await userService.createOne({
    profile,
    password: dtoService.makePassword(password),
    roles: ["super"],
  });
}
