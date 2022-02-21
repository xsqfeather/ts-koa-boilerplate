import { IsBoolean, IsOptional, IsString } from "class-validator";

export class ArticleListFilter {
  @IsString()
  search?: string;

  @IsString()
  title?: string;

  @IsBoolean()
  isPublished?: boolean;
}

export class CreateArticleInput {
  @IsString()
  title: string;

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
