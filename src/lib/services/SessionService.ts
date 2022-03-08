import { Inject, Service } from "typedi";
import DI from "../DI";
import { RuleFact } from "../entities/BlockRule";
import { Session } from "../entities/Session";
import { User } from "../entities/User";
import BlockRuleService from "./BlockRuleService";
import CurdService from "./CurdService";

@Service()
export default class SessionService extends CurdService<Session> {
  private sessionRepository = DI.orm.em.getRepository(Session);

  @Inject(() => BlockRuleService)
  private blockRuleService: BlockRuleService;

  constructor() {
    super(Session);
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

  async createOneByUser(props: {
    user?: User;
    otherInfo?: {
      deviceId?: string;
      ip?: string;
    };
    ruleFacts?: RuleFact[];
  }): Promise<Session> {
    const { user, otherInfo, ruleFacts } = props;
    const session = await this.createOne({
      identiy: {
        userId: user?.id || null,
        deviceId: otherInfo?.deviceId || null,
      },
      info: {
        ip: otherInfo?.deviceId || null,
      },
      ruleFacts: [
        ...(ruleFacts || []),
        { fact: "role", operator: "eq", value: "loginedUser" },
      ],
      beganAt: new Date(),
      endedAt: null,
    });

    if (user?.id) {
      this.sessionRepository.nativeDelete({
        identiy: {
          userId: user?.id,
        },
      });
    }

    return session;
  }
}
