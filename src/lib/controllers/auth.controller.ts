import { Controller, Post } from "amala";

@Controller("/auth")
export default class AuthController {
  @Post("/login")
  login(): string {
    return "visited";
  }

  @Post("/register")
  register(): string {
    return "visited";
  }
}
