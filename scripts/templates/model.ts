import i from "i";

const inflect = i();

export interface classPropType {
  name: string;
  type: string;
}

export interface classPropRuleType extends classPropType {
  rule: string;
}

export const mapClassProps = (fields: string[]): classPropType[] => {
  return fields.map((f) => {
    const nameType = f.split(":");
    const name = nameType[0];
    const type = nameType[1];
    return {
      name: inflect.camelize(name, false),
      type,
    };
  });
};
export const generateModelCodeText = (
  modelName: string,
  classProps: classPropType[]
): string => {
  const propsText = (): string => {
    let returnText = "";
    for (const prop of classProps) {
      returnText += `
        @Property()
        public ${prop.name}: ${prop.type};
        `;
    }
    return returnText;
  };
  return `
    import { Entity ${
      classProps.length === 0 ? "" : " ,Property"
    } } from "@mikro-orm/core";

    import { BaseEntity } from "../lib/entities/BaseEntity";

    @Entity()
    export class ${modelName} extends BaseEntity {
        ${propsText()}
    }
    `;
};
