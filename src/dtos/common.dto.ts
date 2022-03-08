import { IsOptional, IsString } from "class-validator";

export class ListQuery {
  @IsString()
  @IsOptional()
  range?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  filter?: string;
}

export class ListQueryObject {
  range?: number[];

  sort?: string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: any;
}

export class DeleteManyInput {
  ids: string;
}
