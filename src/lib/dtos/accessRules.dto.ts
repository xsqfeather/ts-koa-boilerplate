import { IsBoolean, IsOptional, IsString } from "class-validator";
import { OperatorType } from "../entities/AccessRule";

export class AccessRuleListFilter {
  @IsString()
  name: string;

  @IsString()
  fact: string;

  @IsString()
  operator: OperatorType;

  @IsString()
  value: string;

  @IsBoolean()
  allowed: boolean;
}

export class CreateAccessRuleInput {
  @IsString()
  name: string;

  @IsString()
  fact: string;

  @IsString()
  operator: OperatorType;

  @IsString()
  value: string;

  @IsBoolean()
  allowed = false;
}

export class UpdateAccessRuleInput {
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

  @IsBoolean()
  allowed = false;
}
