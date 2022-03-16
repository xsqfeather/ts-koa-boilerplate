import { IsString } from "class-validator";

export class StorageFileListFilter {
  @IsString()
  fileName: string;
}

export class CreateStorageFileInput {
  file: File;
}

export class UpdateStorageFileInput {
  file: File;
}
