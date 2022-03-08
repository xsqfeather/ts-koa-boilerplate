import { IsString } from "class-validator";

export class CreateReviewInput {
  @IsString()
  comment: string;

  date: Date;

  @IsString()
  customerId: string;
}

export class UpdateReviewInput extends CreateReviewInput {}
