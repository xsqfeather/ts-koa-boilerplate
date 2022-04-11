import { Migration } from '@mikro-orm/migrations';

export class Migration20220410094520 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "vod_type" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "vod_type" cascade;');
  }

}
