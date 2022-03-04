import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { customRandom, random, urlAlphabet } from "nanoid";
import charcode from "charcode";

const nanoid = customRandom(urlAlphabet, 4, random);

function generateRuleNumber(): string {
  const ruleNumber = nanoid();

  const ruleChars = ruleNumber.split("");
  let chars = "AR-";

  for (let index = 0; index < ruleChars.length; index++) {
    const ruleChar = ruleChars[index];
    chars +=
      parseInt(ruleChar) !== NaN ? charcode(ruleChar).toString() : ruleChar;
  }

  return chars;
}

export type OperatorType = "eq" | "ne" | "gt" | "lt" | "in";

export interface RuleFact {
  fact: string;
  operator: OperatorType;
  value: string;
}

@Entity()
export class BlockRule extends BaseEntity {
  @Property()
  name: string;

  @Property()
  ruleNumber = generateRuleNumber();

  @Property()
  fact: string;

  @Property()
  operator: OperatorType;

  @Property()
  value: string;

  @Property({ onCreate: () => false })
  isRemovable = false;

  @Property({ onCreate: () => [] })
  targets: string[] = [];

  @Property({ onCreate: () => new Date() })
  beganAt? = new Date();

  @Property({ onCreate: () => null })
  endedAt?: Date | null = null;
}
