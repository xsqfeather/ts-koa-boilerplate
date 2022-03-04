import { IsOptional, IsString } from "class-validator";

export class SessionListFilter {
  @IsString()
  userId: string;
}

export class CreateSessionInput {
  @IsString()
  userId: string;
}

export class UpdateSessionInput {
  @IsString()
  @IsOptional()
  Sessionname: string;
}
