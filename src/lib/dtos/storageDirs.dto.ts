import { IsOptional, IsString } from "class-validator";

export class StorageDirListFilter {
  @IsString()
  name: string;
}

export class CreateStorageDirInput {
  @IsString()
  name: string;
}

export class UpdateStorageDirInput {
  @IsString()
  @IsOptional()
  name: string;
}
