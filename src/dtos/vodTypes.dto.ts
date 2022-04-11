import { IsString } from "class-validator";

export class CreateVodTypeInput {
  @IsString()
  name: string;
}

export class UpdateVodTypeInput extends CreateVodTypeInput {}
