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
        @prop()
        public ${prop.name}: ${prop.type};
        `;
    }
    return returnText;
  };
  return `
    import { getModelForClass${
      classProps.length === 0 ? "" : " ,prop"
    } } from "@typegoose/typegoose";
    import BaseClass from "./BaseClass";

    export class ${modelName} extends BaseClass {
        ${propsText()}
    }
    export const ${modelName}Model = getModelForClass(${modelName});

    `;
};
