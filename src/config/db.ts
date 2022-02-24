import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";

export const development: Options = {
  type: "mongo",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "dist/lib/entities/**/**.js"],
  seeder: {
    pathTs: "src/seeders/development",
    path: "dist/seeders/development",
  },
  dbName: "koa-ts-development",
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: "mongodb://127.0.0.1:27017",
  allowGlobalContext: true,
};

export const test: Options = {
  type: "mongo",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "dist/lib/entities/**/**.js"],
  dbName: "koa-ts-test",
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: "mongodb://127.0.0.1:27017",
  allowGlobalContext: true,
};

export const production: Options = {
  type: "mongo",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "dist/lib/entities/**/**.js"],
  dbName: "koa-ts-test",
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: "mongodb://127.0.0.1:27017",
  allowGlobalContext: true,
};
