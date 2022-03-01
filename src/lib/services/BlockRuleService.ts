import { Loaded } from "@mikro-orm/core";
import { Service } from "typedi";
import DI from "../DI";
import { BlockRule, RuleFact } from "../entities/BlockRule";
import CurdService from "./CurdService";

@Service()
export default class BlockRuleService extends CurdService<BlockRule> {
  private blockRuleRepository = DI.orm.em.getRepository(BlockRule);

  constructor() {
    super(BlockRule);
  }

  findByRuleFacts(ruleFacts: RuleFact[]): Promise<Loaded<BlockRule, never>[]> {
    return this.blockRuleRepository.find({ $or: ruleFacts });
  }
}
