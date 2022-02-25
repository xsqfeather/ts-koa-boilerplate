import { Options } from "@mikro-orm/core";
import { development, production, test } from "./config/db";

function chooseEvnDBOptions(NODE_ENV: string): Options {
  console.log({ NODE_ENV });

  switch (NODE_ENV) {
    case "development":
      return development;

    case "test":
      return test;

    case "production":
      return production;

    default:
      return development;
  }
}

const options: Options = chooseEvnDBOptions(process.env.NODE_ENV);

export default options;
