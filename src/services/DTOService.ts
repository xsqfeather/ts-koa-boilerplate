import { Service } from "typedi";
import { ListQuery, ListQueryObject } from "../dtos/common.dto";

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
}
