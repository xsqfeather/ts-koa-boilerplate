import { Migration } from '@mikro-orm/migrations';

export class Migration20220413154028 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "vod_type" add column "count" bigint null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "vod_type" drop column "count";');
  }

}
