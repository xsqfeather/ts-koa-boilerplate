import { Service } from "typedi";
import { ListQuery, ListQueryObject } from "../../dtos/common.dto";
import * as bcrypt from "bcrypt";

@Service()
export default class DTOService {
  parseListQuery(listQuery: ListQuery): ListQueryObject {
    const { range, sort, filter } = listQuery;
    const listQueryObject = new ListQueryObject();
    try {
      listQueryObject.range = JSON.parse(range);
    } catch (error) {
      throw new Error(error);
    }
    try {
      listQueryObject.sort = JSON.parse(sort);
    } catch (error) {
      throw new Error(error);
    }
    try {
      listQueryObject.filter = JSON.parse(filter);
    } catch (error) {
      throw new Error(error);
    }

    return listQueryObject;
  }

  makePassword(plainText: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainText, salt);
    return hash;
  }

  isPasswordMatch(plainText: string, hash: string): boolean {
    return bcrypt.compareSync(plainText, hash);
  }
}
