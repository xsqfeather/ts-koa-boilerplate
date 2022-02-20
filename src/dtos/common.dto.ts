import { IsString } from "class-validator";

export class ListQuery {
  @IsString()
  range?: string;

  @IsString()
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
