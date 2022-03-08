import { Service } from "typedi";
import { Invoice } from "../entities/Invoice";
import CurdService from "../lib/services/CurdService";

@Service()
export default class InvoiceService extends CurdService<Invoice> {
  constructor() {
    super(Invoice);
  }
}
