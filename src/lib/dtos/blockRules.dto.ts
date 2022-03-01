import { IsOptional, IsString } from "class-validator";
import { OperatorType } from "../entities/BlockRule";

export class BlockRuleListFilter {
  @IsString()
  name: string;

  @IsString()
  fact: string;

  @IsString()
  operator: OperatorType;

  @IsString()
  value: string;
}

export class CreateBlockRuleInput {
  @IsString()
  name: string;

  @IsString()
  fact: string;

  @IsString()
  operator: OperatorType;

  @IsString()
  value: string;
}

export class UpdateBlockRuleInput {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  fact: string;

  @IsString()
  @IsOptional()
  operator: OperatorType;

  @IsString()
  @IsOptional()
  value: string;
}
