import { Controller, Get } from "amala";

@Controller("/")
export default class HomeController {
  @Get("/")
  index(): string {
    return "hello api";
  }
}
