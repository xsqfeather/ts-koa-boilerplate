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
  superior?: string;

  @IsString()
  @IsOptional()
  ipfsPath?: string;
}

export class UpdateStorageDirInput {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  superior?: string;

  @IsString()
  @IsOptional()
  ipfsPath?: string;
}
