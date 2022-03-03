import { Inject, Service } from "typedi";
import { ErrorMsg } from "../valueObjects";
import { RegisterInput } from "../dtos/auth.dto";
import { User } from "../entities/User";
import CurdService from "./CurdService";
import UserService from "./UserService";

@Service()
export default class AuthService extends CurdService<User> {
  constructor() {
    super(User);
  }

  @Inject(() => UserService)
  userService: UserService;

  async register(input: RegisterInput): Promise<User | ErrorMsg> {
    const uniqueField = await this.userService.checkUniqueField(input);
    if (uniqueField) {
      return new ErrorMsg("auth", "register", `${uniqueField} already exists`);
    }
  }
}
