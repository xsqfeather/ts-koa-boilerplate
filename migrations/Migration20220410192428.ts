import { Migration } from '@mikro-orm/migrations';

export class Migration20220410192428 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_dir" drop constraint if exists "storage_dir_superior_id_check";');
    this.addSql('alter table "storage_dir" alter column "superior_id" type bigint using ("superior_id"::bigint);');

    this.addSql('alter table "storage_file" drop constraint if exists "storage_file_dir_id_check";');
    this.addSql('alter table "storage_file" alter column "dir_id" type bigint using ("dir_id"::bigint);');

    this.addSql('alter table "author" drop constraint if exists "author_user_id_check";');
    this.addSql('alter table "author" alter column "user_id" type bigint using ("user_id"::bigint);');

    this.addSql('alter table "article" drop constraint if exists "article_author_id_check";');
    this.addSql('alter table "article" alter column "author_id" type bigint using ("author_id"::bigint);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_dir" drop constraint if exists "storage_dir_superior_id_check";');
    this.addSql('alter table "storage_dir" alter column "superior_id" type int using ("superior_id"::int);');

    this.addSql('alter table "storage_file" drop constraint if exists "storage_file_dir_id_check";');
    this.addSql('alter table "storage_file" alter column "dir_id" type int using ("dir_id"::int);');

    this.addSql('alter table "author" drop constraint if exists "author_user_id_check";');
    this.addSql('alter table "author" alter column "user_id" type int using ("user_id"::int);');

    this.addSql('alter table "article" drop constraint if exists "article_author_id_check";');
    this.addSql('alter table "article" alter column "author_id" type int using ("author_id"::int);');
  }

}
