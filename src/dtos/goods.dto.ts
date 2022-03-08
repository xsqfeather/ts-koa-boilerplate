import { IsString, IsNumber } from "class-validator";

export class CreateGoodInput {
  @IsString()
  price: string;

  @IsString()
  itemNumber: string;

  @IsNumber()
  storage: number;

  @IsString()
  name: string;

  @IsString()
  introduction: string;

  @IsString()
  productId: string;

  @IsString()
  images: string;
}

export class UpdateGoodInput extends CreateGoodInput {}
