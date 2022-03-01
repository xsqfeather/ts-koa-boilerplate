import { Inject, Service } from "typedi";
import { BlockRule } from "../entities/BlockRule";
import { Session } from "../entities/Session";
import BlockRuleService from "./BlockRuleService";
import CurdService from "./CurdService";

@Service()
export default class SessionService extends CurdService<BlockRule> {
  @Inject(() => BlockRuleService)
  private blockRuleService: BlockRuleService;

  constructor() {
    super(BlockRule);
  }

  async getPermissions(session: Session): Promise<string[]> {
    const sessionRuleFacts = session.ruleFacts;
    const blockRules = await this.blockRuleService.findByRuleFacts(
      sessionRuleFacts
    );
    let blockTargets = [];
    for (let index = 0; index < blockRules.length; index++) {
      const blockRule = blockRules[index];
      blockTargets = blockTargets.concat(blockRule);
    }
    return blockTargets;
  }
}
