import { IsString } from "class-validator";

export class CreateTaskInput {
  @IsString()
  name: string;

  @IsString()
  resource: string;

  @IsString()
  resourceId: string;
}

export class UpdateTaskInput extends CreateTaskInput {}
