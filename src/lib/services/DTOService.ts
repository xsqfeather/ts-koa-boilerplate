import { Service } from "typedi";
import * as bcrypt from "bcrypt";
import JWT, { JwtPayload } from "jsonwebtoken";
import { machineIdSync } from "node-machine-id";

import { ListQuery, ListQueryObject } from "../../dtos/common.dto";

@Service()
export default class DTOService {
  parseListQuery(listQuery: ListQuery): ListQueryObject {
    const {
      range = "[0,9]",
      sort = '["createdAt","DESC"]',
      filter,
    } = listQuery;
    const listQueryObject = new ListQueryObject();
    try {
      listQueryObject.range = JSON.parse(range);
    } catch (error) {
      throw new Error(error);
    }
    try {
      console.log({ sort });

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

  createToken(sessionId: number): string {
    return JWT.sign({ sessionId }, machineIdSync(), { expiresIn: "1d" });
  }

  verifyToken(token: string): {
    decoded?: JwtPayload | string;
    error?: Error;
  } & {
    authorization: boolean;
  } {
    try {
      const decoded = JWT.verify(token, machineIdSync());
      return {
        decoded,
        authorization: true,
      };
    } catch (error) {
      return {
        authorization: false,
        error,
      };
    }
  }
}
