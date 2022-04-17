import { Migration } from '@mikro-orm/migrations';

export class Migration20220417090220 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_file" drop constraint if exists "storage_file_local_path_check";');
    this.addSql('alter table "storage_file" alter column "local_path" type varchar(255) using ("local_path"::varchar(255));');
    this.addSql('alter table "storage_file" alter column "local_path" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_file" drop constraint if exists "storage_file_local_path_check";');
    this.addSql('alter table "storage_file" alter column "local_path" type varchar using ("local_path"::varchar);');
    this.addSql('alter table "storage_file" alter column "local_path" set not null;');
  }

}
