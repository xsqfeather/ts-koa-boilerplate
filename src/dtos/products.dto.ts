import { IsString, IsNumber } from "class-validator";

export class CreateProductInput {
  @IsString()
  image: string;

  @IsString()
  thumbnail: string;

  @IsString()
  price: string;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  categoryId: string;

  @IsNumber()
  stock: number;

  @IsString()
  description: string;
}

export class UpdateProductInput extends CreateProductInput {}
