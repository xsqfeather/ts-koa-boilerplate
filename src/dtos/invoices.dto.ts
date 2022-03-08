import { IsString, IsNumber } from "class-validator";

export class CreateInvoiceInput {
  @IsString()
  commandId: string;

  @IsNumber()
  totalExTaxes: number;

  @IsNumber()
  deliveryFees: number;

  @IsNumber()
  taxes: number;

  @IsNumber()
  total: number;
}

export class UpdateInvoiceInput extends CreateInvoiceInput {}
