import { Service } from "typedi";
import DI from "../DI";
import { RegisterInput } from "../dtos/auth.dto";
import { User } from "../entities/User";
import CurdService from "./CurdService";

@Service()
export default class UserService extends CurdService<User> {
  private userRepository = DI?.orm?.em.getRepository(User);

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

    if (input.email) {
      user = await this.findOneByUsername(input.email);
    }
    if (user && user.profile?.email) {
      return "profile.email";
    }

    return false;
  }

  checkInputFieldsRequired(input: RegisterInput): boolean {
    if (!input.email || !input.username || !input.mobile) {
      return false;
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

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      profile: {
        email,
      },
    });
  }

  findOneByIdKey(idKey: string): Promise<User> {
    return this.userRepository.findOne({
      $or: [
        {
          profile: {
            username: idKey,
          },
        },
        {
          profile: {
            email: idKey,
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any,
    });
  }

  deleteSuperAdmin(): Promise<number> {
    return this.userRepository.nativeDelete({
      roles: {
        $in: ["super"],
      },
    });
  }
}
