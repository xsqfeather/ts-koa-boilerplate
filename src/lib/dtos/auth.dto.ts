import { IsOptional, IsString } from "class-validator";

export class RegisterInput {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  password: string;
}
