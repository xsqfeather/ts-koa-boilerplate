import { IsString } from "class-validator";

export class StorageFileListFilter {
  @IsString()
  fileName: string;
}

export class CreateStorageFileInput {
  file: any;
}

export class UpdateStorageFileInput {
  file: any;
}
