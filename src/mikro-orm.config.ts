import { Options } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";

const options: Options = {
  type: "mongo",
  entitiesTs: ["src/entities/**/**.ts", "src/lib/entities/**/**.ts"],
  entities: ["dist/entities/**/**.js", "src/lib/entities/**/**.js"],
  dbName: "koa-ts-boilerplate",
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: "mongodb://127.0.0.1:27017",
  allowGlobalContext: true,
};

export default options;
