import { Service } from "typedi";
import DI from "../DI";
import { User } from "../entities/User";
import CurdService from "./CurdService";

@Service()
export default class UserService extends CurdService<User> {
  private userRepository = DI.orm.em.getRepository(User);

  constructor() {
    super(User);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }
}
