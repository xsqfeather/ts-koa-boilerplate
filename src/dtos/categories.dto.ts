import { IsString } from "class-validator";

export class CreateCategoryInput {
  @IsString()
  name: string;
}

export class UpdateCategoryInput extends CreateCategoryInput {}
