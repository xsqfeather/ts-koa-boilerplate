import doenv from "dotenv";
import Logger from "pino";

const logger = Logger();
logger.info(`IN [${process.env.NODE_ENV}] environment`);
let config = doenv.config({
  path: `.env/${
    process.env.NODE_ENV ? process.env.NODE_ENV : "development"
  }.env`,
}).parsed;

if (config === undefined) {
  logger.warn("using .env/development.env");
  config = doenv.config({ path: `.env/development.env` }).parsed;
}
if (!config) {
  throw new Error("missing config file '.env/development.env'");
}

export default config;
