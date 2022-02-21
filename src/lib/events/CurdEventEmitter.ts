import { EntityName, EntityRepository } from "@mikro-orm/core";
import { Service } from "typedi";
import DI from "../../DI";
import OnEvent from "../decorators/OnEvent";
import { BaseEventEmitter } from "./BaseEventEmitter";

@Service()
export class CurdEventEmitter<T> extends BaseEventEmitter<T> {
  private repository: EntityRepository<T>;

  private className: string;

  constructor(entity: EntityName<T>) {
    super();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.className = (entity as any).name;

    this.repository = DI.orm.em.getRepository(entity);
  }

  @OnEvent("AfterC")
  afterCreatedHandler(article: T): T {
    this.repository.find();
    return article;
  }
}
