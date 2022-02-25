import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TestSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {}

}
