import { Service } from "typedi";
import { AccessRule } from "../entities/AccessRule";
import CurdService from "./CurdService";

@Service()
export default class AccessRuleService extends CurdService<AccessRule> {
  constructor() {
    super(AccessRule);
  }
}
