import { Body, Controller, Ctx, Post } from "amala";
import { Context } from "koa";
import Container from "typedi";
import { LoginInput, RegisterInput } from "../dtos/auth.dto";
import { User } from "../entities/User";
import AuthService from "../services/AuthService";
import { ErrorMsg } from "../valueObjects";

@Controller("/auth")
export default class AuthController {
  private authService = Container.get(AuthService);

  @Post("/login")
  async login(
    @Body() input: LoginInput,
    @Ctx() ctx: Context
  ): Promise<
    | {
        token: string;
        success: number;
      }
    | {
        code: string;
        reason: string;
      }
  > {
    const loginRlt = await this.authService.login(input);
    if (loginRlt.success) {
      return {
        token: loginRlt.result as string,
        success: 1,
      };
    }

    ctx.status = 401;

    return {
      code: (loginRlt.result as ErrorMsg).getCode(),
      reason: (loginRlt.result as ErrorMsg).getReason(),
    };
  }

  @Post("/register")
  async register(@Body() input: RegisterInput): Promise<{
    result: User | ErrorMsg;
    success: boolean;
  }> {
    const registerRlt = await this.authService.register(input);
    return registerRlt;
  }
}
