import { Service } from "typedi";
import { Good } from "../entities/Good";
import CurdService from "../lib/services/CurdService";

@Service()
export default class GoodService extends CurdService<Good> {
  constructor() {
    super(Good);
  }
}
