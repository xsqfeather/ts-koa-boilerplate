import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../../lib/entities/User";

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const userRepository = em.getRepository(User);
    const user = await userRepository.findOne({
      roles: {
        $in: ["super"],
      },
    });
    console.log({ user });
  }
}
