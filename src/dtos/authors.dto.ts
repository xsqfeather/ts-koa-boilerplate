import { IsBoolean, IsOptional, IsString } from "class-validator";

export class AuthorListFilter {
  @IsString()
  name?: string;

  @IsString()
  email?: string;

  @IsBoolean()
  isPublished?: boolean;
}

export class CreateAuthorInput {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class UpdateAuthorInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
