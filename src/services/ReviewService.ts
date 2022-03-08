import { Service } from "typedi";
import { Review } from "../entities/Review";
import CurdService from "../lib/services/CurdService";

@Service()
export default class ReviewService extends CurdService<Review> {
  constructor() {
    super(Review);
  }
}
