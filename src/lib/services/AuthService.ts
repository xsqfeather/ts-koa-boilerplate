import { Inject, Service } from "typedi";
import { ErrorMsg } from "../valueObjects";
import { LoginInput, RegisterInput } from "../dtos/auth.dto";
import { User } from "../entities/User";
import CurdService from "./CurdService";
import UserService from "./UserService";
import DTOService from "./DTOService";
import { Session } from "../entities/Session";
import SessionService from "./SessionService";

@Service()
export default class AuthService extends CurdService<User> {
  constructor() {
    super(User);
  }

  @Inject(() => UserService)
  userService: UserService;

  @Inject(() => DTOService)
  dtoService: DTOService;

  @Inject(() => SessionService)
  sessionService: SessionService;

  private async beforeRegisterCheck(
    input: RegisterInput
  ): Promise<ErrorMsg | null> {
    const uniqueField = await this.userService.checkUniqueField(input);
    if (uniqueField) {
      return new ErrorMsg("auth", "register", `${uniqueField} already exists`);
    }
    if (!this.userService.checkInputFieldsRequired(input)) {
      return new ErrorMsg("auth", "register", `some field required`);
    }
    return null;
  }

  async login(input: LoginInput): Promise<{
    result: Session | ErrorMsg;
    success: boolean;
  }> {
    const user = await this.userService.findOneByIdKey(input.idKey);

    if (!user) {
      return {
        result: new ErrorMsg("auth", "login", "user is not exist"),
        success: false,
      };
    }

    if (this.dtoService.isPasswordMatch(input.password, user.password)) {
      user.password = null;
      const session = await this.sessionService.createOne({
        identiy: {
          userId: user.id,
          username: user.profile.username,
        },
      });
      return {
        result: session,
        success: true,
      };
    }
    return {
      result: new ErrorMsg("auth", "login", "user or password wrong"),
      success: false,
    };
  }

  async register(input: RegisterInput): Promise<{
    result: User | ErrorMsg;
    success: boolean;
  }> {
    const checkRlt = await this.beforeRegisterCheck(input);
    if (checkRlt) {
      return {
        result: checkRlt,
        success: false,
      };
    }

    const user = await this.userService.createOne(input);
    user.password = null;
    if (user.id) {
      return {
        result: user,
        success: true,
      };
    }

    return {
      result: new ErrorMsg("auth", "register", `unknown error`),
      success: false,
    };
  }
}
