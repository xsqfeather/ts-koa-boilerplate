import { createClient, RedisClientType } from "redis";
import { Service } from "typedi";

@Service()
export default class RedisCache {
  client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.client.connect(); //todo new redis await
  }

  async connect(): Promise<RedisClientType> {
    return this.client;
  }
}
