export const generateServiceCodeText = (SourceName: string): string => {
  return `import { Service } from "typedi";
import { ${SourceName} } from "../entities/${SourceName}";
import CurdService from "../lib/services/CurdService";

@Service()
export default class ${SourceName}Service extends CurdService<${SourceName}> {
  constructor() {
    super(${SourceName});
  }
}
`;
};
