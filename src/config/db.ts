import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export const development: Options = {
  metadataProvider: TsMorphMetadataProvider,
  type: "postgresql",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "dist/lib/entities/**/**.js"],
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123666",
  dbName: "koa_ts_development",
  allowGlobalContext: true,
  debug: true,
};

export const test: Options = {
  metadataProvider: TsMorphMetadataProvider,
  type: "postgresql",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "dist/lib/entities/**/**.js"],
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123666",
  dbName: "koa_ts_test",
  allowGlobalContext: true,
  debug: true,
};

export const production: Options = {
  metadataProvider: TsMorphMetadataProvider,
  type: "postgresql",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "dist/lib/entities/**/**.js"],
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123666",
  dbName: "koa_ts_production",
  allowGlobalContext: true,
  debug: false,
};
