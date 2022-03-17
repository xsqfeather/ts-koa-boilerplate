import { IsBoolean, IsOptional, IsString } from "class-validator";

import { JSONSchema } from "class-validator-jsonschema";

export class ArticleListFilter {
  @IsString()
  search?: string;

  @IsString()
  title?: string;

  @IsBoolean()
  isPublished?: boolean;
}

@JSONSchema({
  description: "A User object",
  example: { id: "123" },
})
export class CreateArticleInput {
  @IsString()
  title: string;

  @JSONSchema({
    description: "User primary key",
    format: "custom-id",
  })
  @IsString()
  body: string;
}

export class UpdateArticleInput {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
