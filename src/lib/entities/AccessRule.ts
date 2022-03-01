import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { customRandom, random, urlAlphabet } from "nanoid";
import charcode from "charcode";

const nanoid = customRandom(urlAlphabet, 6, random);

function generateRuleNumber(): string {
  const ruleNumber = nanoid();
  console.log({ ruleNumber });

  const ruleChars = ruleNumber.split("");
  let chars = "AR-";
  console.log({ ruleChars });

  for (let index = 0; index < ruleChars.length; index++) {
    const ruleChar = ruleChars[index];
    chars +=
      parseInt(ruleChar) !== NaN
        ? charcode(ruleChar).toString().split("")[0]
        : ruleChar;

    console.log({ chars });
  }

  return chars;
}

export type OperatorType = "eq" | "ne" | "gt" | "lt" | "in";

@Entity()
export class AccessRule extends BaseEntity {
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

  @Property()
  allowed: boolean;

  @Property({ onCreate: () => new Date() })
  beganAt? = new Date();

  @Property({ onCreate: () => null })
  endedAt?: Date | null = null;
}
