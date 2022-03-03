import { Service } from "typedi";
import DI from "../DI";
import { RegisterInput } from "../dtos/auth.dto";
import { User } from "../entities/User";
import CurdService from "./CurdService";

@Service()
export default class UserService extends CurdService<User> {
  private userRepository = DI.orm.em.getRepository(User);

  constructor() {
    super(User);
  }

  async checkUniqueField(input: RegisterInput): Promise<string | boolean> {
    let user: User;
    if (input.username) {
      user = await this.findOneByUsername(input.username);
    }
    if (user && user.profile?.username) {
      return "profile.username";
    }

    return true;
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      profile: {
        username,
      },
    });
  }
}
