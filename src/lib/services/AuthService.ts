import { Service } from "typedi";
import { User } from "../entities/User";
import CurdService from "./CurdService";

@Service()
export default class AuthService extends CurdService<User> {
  constructor() {
    super(User);
  }

  login() {
    //need svg and limited login time by deviceId
  }

  register() {}
}
