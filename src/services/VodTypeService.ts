import { Loaded } from "@mikro-orm/core";
import { Service } from "typedi";
import { VodType } from "../entities/VodType";
import DI from "../lib/DI";
import CurdService from "../lib/services/CurdService";

@Service()
export default class VodTypeService extends CurdService<VodType> {
  private vodTypeRepository = DI.orm.em.getRepository(VodType);

  constructor() {
    super(VodType);
  }

  all(): Promise<Loaded<VodType, never>[]> {
    return this.vodTypeRepository.find({});
  }

  findInTypes(types: string[]): Promise<Loaded<VodType, never>[]> {
    return this.vodTypeRepository.find({
      name: {
        $in: types,
      },
      deletedAt: null,
    });
  }

  findByName(name: string): Promise<Loaded<VodType, never>> {
    return this.vodTypeRepository.findOne({
      name: name,
      deletedAt: null,
    });
  }

  countByName(name: string): Promise<number> {
    return this.vodTypeRepository.count({
      name: name,
    });
  }

  deleteByName(name: string): Promise<number> {
    return this.vodTypeRepository.nativeDelete({
      name,
    });
  }
}
