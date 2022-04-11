import { Migration } from '@mikro-orm/migrations';

export class Migration20220410192215 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_id_check";');
    this.addSql('alter table "user" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "storage_dir" drop constraint if exists "storage_dir_id_check";');
    this.addSql('alter table "storage_dir" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "storage_file" drop constraint if exists "storage_file_id_check";');
    this.addSql('alter table "storage_file" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "session" drop constraint if exists "session_id_check";');
    this.addSql('alter table "session" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "role" drop constraint if exists "role_id_check";');
    this.addSql('alter table "role" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "migration" drop constraint if exists "migration_id_check";');
    this.addSql('alter table "migration" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "block_rule" drop constraint if exists "block_rule_id_check";');
    this.addSql('alter table "block_rule" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "vod_type" drop constraint if exists "vod_type_id_check";');
    this.addSql('alter table "vod_type" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_id_check";');
    this.addSql('alter table "vod_resource" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "visitor" drop constraint if exists "visitor_id_check";');
    this.addSql('alter table "visitor" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "video_collector" drop constraint if exists "video_collector_id_check";');
    this.addSql('alter table "video_collector" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "task" drop constraint if exists "task_id_check";');
    this.addSql('alter table "task" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "review" drop constraint if exists "review_id_check";');
    this.addSql('alter table "review" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "product" drop constraint if exists "product_id_check";');
    this.addSql('alter table "product" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "order" drop constraint if exists "order_id_check";');
    this.addSql('alter table "order" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "invoice" drop constraint if exists "invoice_id_check";');
    this.addSql('alter table "invoice" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "good" drop constraint if exists "good_id_check";');
    this.addSql('alter table "good" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "category" drop constraint if exists "category_id_check";');
    this.addSql('alter table "category" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "author" drop constraint if exists "author_id_check";');
    this.addSql('alter table "author" alter column "id" type BIGINT using ("id"::BIGINT);');

    this.addSql('alter table "article" drop constraint if exists "article_id_check";');
    this.addSql('alter table "article" alter column "id" type BIGINT using ("id"::BIGINT);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_id_check";');
    this.addSql('alter table "user" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "storage_dir" drop constraint if exists "storage_dir_id_check";');
    this.addSql('alter table "storage_dir" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "storage_file" drop constraint if exists "storage_file_id_check";');
    this.addSql('alter table "storage_file" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "session" drop constraint if exists "session_id_check";');
    this.addSql('alter table "session" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "role" drop constraint if exists "role_id_check";');
    this.addSql('alter table "role" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "migration" drop constraint if exists "migration_id_check";');
    this.addSql('alter table "migration" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "block_rule" drop constraint if exists "block_rule_id_check";');
    this.addSql('alter table "block_rule" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "vod_type" drop constraint if exists "vod_type_id_check";');
    this.addSql('alter table "vod_type" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_id_check";');
    this.addSql('alter table "vod_resource" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "visitor" drop constraint if exists "visitor_id_check";');
    this.addSql('alter table "visitor" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "video_collector" drop constraint if exists "video_collector_id_check";');
    this.addSql('alter table "video_collector" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "task" drop constraint if exists "task_id_check";');
    this.addSql('alter table "task" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "review" drop constraint if exists "review_id_check";');
    this.addSql('alter table "review" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "product" drop constraint if exists "product_id_check";');
    this.addSql('alter table "product" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "order" drop constraint if exists "order_id_check";');
    this.addSql('alter table "order" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "invoice" drop constraint if exists "invoice_id_check";');
    this.addSql('alter table "invoice" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "good" drop constraint if exists "good_id_check";');
    this.addSql('alter table "good" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "category" drop constraint if exists "category_id_check";');
    this.addSql('alter table "category" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "author" drop constraint if exists "author_id_check";');
    this.addSql('alter table "author" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "article" drop constraint if exists "article_id_check";');
    this.addSql('alter table "article" alter column "id" type int using ("id"::int);');
  }

}
