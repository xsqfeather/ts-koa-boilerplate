import { Body, Controller, Post } from "amala";
import Container from "typedi";
import { LoginInput, RegisterInput } from "../dtos/auth.dto";
import { User } from "../entities/User";
import AuthService from "../services/AuthService";
import { ErrorMsg } from "../valueObjects";

@Controller("/auth")
export default class AuthController {
  private authService = Container.get(AuthService);

  @Post("/login")
  async login(@Body() input: LoginInput): Promise<{
    result: User | ErrorMsg;
    success: boolean;
  }> {
    const loginRlt = await this.authService.login(input);
    return loginRlt;
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
