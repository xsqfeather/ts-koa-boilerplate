import { Service } from "typedi";
import { Visitor } from "../entities/Visitor";
import CurdService from "../lib/services/CurdService";

@Service()
export default class VisitorService extends CurdService<Visitor> {
  constructor() {
    super(Visitor);
  }
}
