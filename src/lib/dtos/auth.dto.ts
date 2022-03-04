import { IsOptional, IsString } from "class-validator";

export class RegisterInput {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  password: string;

  mobile: {
    countryCode: string;
    number: string;
  };
}

export class LoginInput {
  @IsString()
  @IsOptional()
  idKey: string;

  @IsString()
  @IsOptional()
  password: string;
}
