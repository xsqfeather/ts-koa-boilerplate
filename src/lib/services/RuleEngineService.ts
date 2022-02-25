import { Service } from "typedi";
import { Engine, Fact, Rule, TopLevelCondition } from "json-rules-engine";

@Service()
export default class RuleEngineService {
  private engine: Engine;

  constructor() {
    this.engine = new Engine();
  }

  async allow(conditions: TopLevelCondition, facts: Fact[]): Promise<boolean> {
    const rule: Rule = {
      conditions,
      name: "",
      event: undefined,
      priority: 0,
      setConditions: function (conditions: TopLevelCondition): Rule {
        throw new Error("Function not implemented.");
      },
      setEvent: function (event: Event): void {
        throw new Error("Function not implemented.");
      },
      setPriority: function (priority: number): void {
        throw new Error("Function not implemented.");
      },
      toJSON: function (): string {
        throw new Error("Function not implemented.");
      },
    };
    this.engine.addRule(rule);
    await this.engine.run(facts);
    return false;
  }

  async deny() {}
}
