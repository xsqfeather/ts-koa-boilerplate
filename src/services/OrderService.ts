import { Service } from "typedi";
import { Order } from "../entities/Order";
import CurdService from "../lib/services/CurdService";

@Service()
export default class OrderService extends CurdService<Order> {
  constructor() {
    super(Order);
  }
}
