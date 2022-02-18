import { classPropRuleType, classPropType } from "./model";

export const mapRuleClassProps = (
  classProps: classPropType[]
): classPropRuleType[] => {
  return classProps.map((prop) => {
    switch (prop.type) {
      case "string":
        return {
          ...prop,
          rule: "@IsString()",
        };

      case "boolean":
        return {
          ...prop,
          rule: "@IsBoolean()",
        };

      case "number":
        return {
          ...prop,
          rule: "@IsNumber()",
        };

      default:
        return {
          ...prop,
          rule: "",
        };
    }
  });
};
export const generateDtoText = (
  SourceName: string,
  classProps: classPropRuleType[]
): string => {
  const propsText = (): string => {
    let returnText = "";
    for (const prop of classProps) {
      returnText += `
        ${prop.rule}
        ${prop.name}: ${prop.type};
        `;
    }
    return returnText;
  };
  const importValidatorText = (): string => {
    let text = "";
    if (propsText().includes("IsString")) {
      text += "IsString, ";
    }
    if (propsText().includes("IsBoolean")) {
      text += "IsBoolean, ";
    }
    if (propsText().includes("IsNumber")) {
      text += "IsNumber, ";
    }
    return text;
  };
  return `import { ${importValidatorText()} } from "class-validator";

export class Create${SourceName}Input {
  ${propsText()}
}

export class Update${SourceName}Input extends Create${SourceName}Input {}

  `;
};
