import { IsOptional, IsString } from "class-validator";

export class StorageDirListFilter {
  @IsString()
  name: string;
}

export class CreateStorageDirInput {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  superiorId?: number;
}

export class UpdateStorageDirInput {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  superior?: number;
}
