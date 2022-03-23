import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateVideoCollectorInput {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  type: string;

  @IsNumber()
  @IsOptional()
  currentPage = 1;

  @IsString()
  @IsOptional()
  status = "STOP";
}

export class UpdateVideoCollectorInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  currentPage?: number;

  @IsString()
  @IsOptional()
  status? = "STOP";
}
