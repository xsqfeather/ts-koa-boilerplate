import { IsString } from "class-validator";

export class CreateVodResourceInput {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  birthday: Date;

  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsString()
  password: string;
}

export class UpdateVodResourceInput extends CreateVodResourceInput {}
