import {
  EntityData,
  EntityDTO,
  EntityName,
  EntityRepository,
  FilterQuery,
  Loaded,
  QueryOrderMap,
  RequiredEntityData,
  wrap,
} from "@mikro-orm/core";
import _ from "lodash";
import DI from "../DI";
import { ListQueryObject } from "../../dtos/common.dto";

export default class CurdService<T> {
  private repository: EntityRepository<T>;

  private className: string;

  constructor(entity: EntityName<T>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.className = (entity as any).name;

    this.repository = DI.orm.em.getRepository(entity);
  }

  async getPaged(
    listQuery: ListQueryObject
  ): Promise<[Loaded<T, never>[], number]> {
    const {
      filter = {} as FilterQuery<T>,
      range = [0, 9],
      sort = ["createdAt", -1],
    } = listQuery;
    const records = await this.repository.findAndCount(
      {
        ...filter,
        deletedAt: null,
      },
      {
        limit: range[1] - range[0] + 1,
        offset: range[0],
        orderBy: {
          [sort[0]]: sort[1],
        } as QueryOrderMap<T>,
      }
    );
    console.log(`after ${this.className} emitter`);
    return records;
  }

  async insertOne(input: RequiredEntityData<T>): Promise<T> {
    try {
      const record = this.repository.create(input);
      await this.repository.persistAndFlush(record);
      return record;
    } catch (error) {
      console.error(error);
    }
  }

  async putOne(id: string, input: RequiredEntityData<T>): Promise<T | null> {
    const record = await this.repository.findOne(id as FilterQuery<T>);
    if (!record) {
      return null;
    }
    try {
      wrap(record).assign(
        _.omit(input, ["deletedAt", "id", "_id", "updatedAt"]) as unknown as
          | EntityData<Loaded<T, never>>
          | Partial<EntityDTO<Loaded<T, never>>>
      );
      await this.repository.flush();
    } catch (error) {
      console.error(error);
    }

    return record;
  }

  async removeMany(ids: string[]): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = this.repository.find({
      id: { $in: ids },
    } as FilterQuery<T>);
    await this.repository.nativeUpdate(
      { id: { $in: ids } } as FilterQuery<T>,
      {
        deletedAt: new Date(),
      } as unknown as EntityData<T>
    );
    return records;
  }

  async getById(id: string): Promise<Loaded<T, never>> {
    return this.repository.findOne(id as FilterQuery<T>);
  }

  async removeOne(id: string): Promise<T> {
    const record = this.repository.findOne(id as FilterQuery<T>);
    await this.repository.nativeUpdate(
      { id } as FilterQuery<T>,
      {
        deletedAt: new Date(),
      } as unknown as EntityData<T>
    );
    return record;
  }

  getList(listQuery: ListQueryObject): Promise<[Loaded<T, never>[], number]> {
    return this.getPaged(listQuery);
  }

  getOne(id: string): Promise<Loaded<T, never>> {
    return this.getById(id);
  }

  async createOne(input: RequiredEntityData<T>): Promise<T> {
    return this.insertOne(input);
  }

  async updateOne(id: string, input: RequiredEntityData<T>): Promise<T | null> {
    return this.putOne(id, input);
  }

  async deleteMany(ids: string[]): Promise<T[]> {
    return this.removeMany(ids);
  }

  async deleteOne(id: string): Promise<T> {
    return this.removeOne(id);
  }
}
