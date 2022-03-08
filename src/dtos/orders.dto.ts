import { IsString } from "class-validator";

export class CreateOrderInput {
  date: Date;

  @IsString()
  reference: string;

  @IsString()
  status: string;

  @IsString()
  returned: string;

  @IsString()
  customerId: string;
}

export class UpdateOrderInput extends CreateOrderInput {}
