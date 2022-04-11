import { Migration } from '@mikro-orm/migrations';

export class Migration20220409175350 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "password" varchar(255) not null, "roles" jsonb not null, "profile" jsonb not null, "user_status" jsonb null);');

    this.addSql('create table "tenant" ("_id" varchar(255) not null, "name" varchar(255) not null, "website" varchar(255) not null, "secret" varchar(255) not null, "id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);');
    this.addSql('alter table "tenant" add constraint "tenant_pkey" primary key ("_id");');

    this.addSql('create table "storage_dir" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null, "path" varchar(255) not null, "superior_id" int null, "status" text check ("status" in (\'Creating\', \'Done\')) not null);');

    this.addSql('create table "storage_file" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "file_name" varchar(255) not null, "ext" varchar(255) not null, "type" varchar(255) not null, "ipfs_cid" varchar(255) not null, "magnet" varchar(255) null, "other_urls" jsonb not null, "local_path" varchar(255) not null, "dir_id" int not null);');

    this.addSql('create table "session" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "identiy" varchar(255) not null, "info" varchar(255) null, "rule_facts" varchar(255) not null, "began_at" timestamptz(0) not null, "is_alive" boolean not null, "ended_at" timestamptz(0) null);');

    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "role_name" varchar(255) not null);');

    this.addSql('create table "migration" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null, "has_done" boolean not null);');

    this.addSql('create table "block_rule" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null, "rule_number" varchar(255) not null, "fact" varchar(255) not null, "operator" varchar(255) not null, "value" varchar(255) not null, "is_removable" boolean not null, "targets" varchar(255) not null, "began_at" timestamptz(0) null, "ended_at" timestamptz(0) null);');

    this.addSql('create table "aclcontrol" ("_id" varchar(255) not null, "id" varchar(255) not null, "operation" varchar(255) not null, "operator" varchar(255) not null, "operator_value" varchar(255) not null, "source" varchar(255) not null, "source_id" varchar(255) not null, "allowed" boolean not null, "deny_reason" varchar(255) not null, "began_at" timestamptz(0) not null, "ended_at" timestamptz(0) null, "is_approved" boolean not null);');
    this.addSql('alter table "aclcontrol" add constraint "aclcontrol_pkey" primary key ("_id");');

    this.addSql('create table "vod_resource" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "group_id" varchar(255) null, "type_id" int null, "type_id_1" int null, "type_name" varchar(255) null, "vod_actor" varchar(255) null, "vod_area" varchar(255) null, "vod_author" varchar(255) null, "vod_behind" varchar(255) null, "vod_blurb" varchar(255) null, "vod_class" varchar(255) null, "vod_color" varchar(255) null, "vod_content" varchar(255) null, "vod_copyright" int null, "vod_director" varchar(255) null, "vod_douban_id" int null, "vod_douban_score" varchar(255) null, "vod_down" int null, "vod_down_from" varchar(255) null, "vod_down_note" varchar(255) null, "vod_down_server" varchar(255) null, "vod_down_url" varchar(255) null, "vod_duration" varchar(255) null, "vod_en" varchar(255) null, "vod_hits" int null, "vod_hits_day" int null, "vod_hits_month" int null, "vod_hits_week" int null, "vod_id" int null, "vod_isend" int null, "vod_jumpurl" varchar(255) null, "vod_lang" varchar(255) null, "vod_letter" varchar(255) null, "vod_level" int null, "vod_lock" int null, "vod_name" varchar(255) null, "vod_pic" varchar(255) null, "vod_pic_screenshot" varchar(255) null, "vod_pic_slide" varchar(255) null, "vod_pic_thumb" varchar(255) null, "vod_play_from" varchar(255) null, "vod_play_note" varchar(255) null, "vod_play_server" varchar(255) null, "vod_play_url" varchar(255) null, "vod_plot" varchar(255) null, "vod_plot_detail" varchar(255) null, "vod_plot_name" varchar(255) null, "vod_points" int null, "vod_points_down" int null, "vod_points_play" int null, "vod_pubdate" varchar(255) null, "vod_pwd" varchar(255) null, "vod_pwd_down" varchar(255) null, "vod_pwd_down_url" varchar(255) null, "vod_pwd_play" varchar(255) null, "vod_pwd_play_url" varchar(255) null, "vod_pwd_url" varchar(255) null, "vod_rel_art" varchar(255) null, "vod_rel_vod" varchar(255) null, "vod_remarks" varchar(255) null, "vod_reurl" varchar(255) null, "vod_score" varchar(255) null, "vod_score_all" int null, "vod_score_num" int null, "vod_serial" varchar(255) null, "vod_state" varchar(255) null, "vod_status" int null, "vod_sub" varchar(255) null, "vod_tag" varchar(255) null, "vod_time" varchar(255) null, "vod_time_add" int null, "vod_time_hits" int null, "vod_time_make" int null, "vod_total" int null, "vod_tpl" varchar(255) null, "vod_tpl_down" varchar(255) null, "vod_tpl_play" varchar(255) null, "vod_trysee" int null, "vod_tv" varchar(255) null, "vod_up" int null, "vod_version" varchar(255) null, "vod_weekday" varchar(255) null, "vod_writer" varchar(255) null, "vod_year" varchar(255) null);');

    this.addSql('create table "visitor" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "address" varchar(255) not null, "birthday" timestamptz(0) not null, "zip_code" varchar(255) not null, "city" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('create table "video_collector" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null, "url" varchar(255) not null, "type" varchar(255) not null, "current_page" int not null, "status" varchar(255) not null);');

    this.addSql('create table "task" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null, "resource" varchar(255) not null, "resource_id" varchar(255) not null);');

    this.addSql('create table "review" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "comment" varchar(255) not null, "date" timestamptz(0) not null, "customer_id" varchar(255) not null);');

    this.addSql('create table "product" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "image" varchar(255) not null, "thumbnail" varchar(255) not null, "price" varchar(255) not null, "width" int not null, "height" int not null, "category_id" varchar(255) not null, "stock" int not null, "description" varchar(255) not null);');

    this.addSql('create table "order" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "date" timestamptz(0) not null, "reference" varchar(255) not null, "status" varchar(255) not null, "returned" varchar(255) not null, "customer_id" varchar(255) not null);');

    this.addSql('create table "invoice" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "command_id" varchar(255) not null, "total_ex_taxes" int not null, "delivery_fees" int not null, "taxes" int not null, "total" int not null);');

    this.addSql('create table "good" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "price" varchar(255) not null, "item_number" varchar(255) not null, "storage" int not null, "name" varchar(255) not null, "introduction" varchar(255) not null, "product_id" varchar(255) not null, "images" varchar(255) not null);');

    this.addSql('create table "category" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null);');

    this.addSql('create table "author" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "name" varchar(255) not null, "email" varchar(255) not null, "user_id" int not null);');
    this.addSql('alter table "author" add constraint "author_user_id_unique" unique ("user_id");');

    this.addSql('create table "article" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "tenant_id" varchar(255) null, "title" varchar(255) not null, "cover" varchar(255) not null, "body" varchar(255) not null, "is_published" boolean not null, "author_id" int not null);');

    this.addSql('alter table "storage_dir" add constraint "storage_dir_superior_id_foreign" foreign key ("superior_id") references "storage_dir" ("id") on update cascade on delete set null;');

    this.addSql('alter table "storage_file" add constraint "storage_file_dir_id_foreign" foreign key ("dir_id") references "storage_dir" ("id") on update cascade;');

    this.addSql('alter table "author" add constraint "author_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "author" drop constraint "author_user_id_foreign";');

    this.addSql('alter table "storage_dir" drop constraint "storage_dir_superior_id_foreign";');

    this.addSql('alter table "storage_file" drop constraint "storage_file_dir_id_foreign";');

    this.addSql('alter table "article" drop constraint "article_author_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "tenant" cascade;');

    this.addSql('drop table if exists "storage_dir" cascade;');

    this.addSql('drop table if exists "storage_file" cascade;');

    this.addSql('drop table if exists "session" cascade;');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "migration" cascade;');

    this.addSql('drop table if exists "block_rule" cascade;');

    this.addSql('drop table if exists "aclcontrol" cascade;');

    this.addSql('drop table if exists "vod_resource" cascade;');

    this.addSql('drop table if exists "visitor" cascade;');

    this.addSql('drop table if exists "video_collector" cascade;');

    this.addSql('drop table if exists "task" cascade;');

    this.addSql('drop table if exists "review" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "order" cascade;');

    this.addSql('drop table if exists "invoice" cascade;');

    this.addSql('drop table if exists "good" cascade;');

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('drop table if exists "author" cascade;');

    this.addSql('drop table if exists "article" cascade;');
  }

}
