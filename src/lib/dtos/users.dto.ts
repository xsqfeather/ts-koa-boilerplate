import { IsOptional, IsString } from "class-validator";

export class UserListFilter {
  @IsString()
  username: string;
}

export class CreateUserInput {
  @IsString()
  username: string;
}

export class UpdateUserInput {
  @IsString()
  @IsOptional()
  username: string;
}
