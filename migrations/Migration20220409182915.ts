import { Migration } from '@mikro-orm/migrations';

export class Migration20220409182915 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_vod_content_check";');
    this.addSql('alter table "vod_resource" alter column "vod_content" type text using ("vod_content"::text);');
    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_vod_play_url_check";');
    this.addSql('alter table "vod_resource" alter column "vod_play_url" type text using ("vod_play_url"::text);');
    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_vod_plot_detail_check";');
    this.addSql('alter table "vod_resource" alter column "vod_plot_detail" type text using ("vod_plot_detail"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_vod_content_check";');
    this.addSql('alter table "vod_resource" alter column "vod_content" type varchar(255) using ("vod_content"::varchar(255));');
    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_vod_play_url_check";');
    this.addSql('alter table "vod_resource" alter column "vod_play_url" type varchar(255) using ("vod_play_url"::varchar(255));');
    this.addSql('alter table "vod_resource" drop constraint if exists "vod_resource_vod_plot_detail_check";');
    this.addSql('alter table "vod_resource" alter column "vod_plot_detail" type varchar(255) using ("vod_plot_detail"::varchar(255));');
  }

}
