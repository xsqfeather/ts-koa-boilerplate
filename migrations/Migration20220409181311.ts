import { Migration } from '@mikro-orm/migrations';

export class Migration20220409181311 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_profile_check";');
    this.addSql('alter table "user" alter column "profile" type jsonb using ("profile"::jsonb);');
    this.addSql('alter table "user" alter column "profile" drop not null;');

    this.addSql('alter table "session" drop constraint if exists "session_identiy_check";');
    this.addSql('alter table "session" alter column "identiy" type jsonb using ("identiy"::jsonb);');
    this.addSql('alter table "session" alter column "identiy" drop not null;');
    this.addSql('alter table "session" drop constraint if exists "session_info_check";');
    this.addSql('alter table "session" alter column "info" type jsonb using ("info"::jsonb);');
    this.addSql('alter table "session" drop constraint if exists "session_rule_facts_check";');
    this.addSql('alter table "session" alter column "rule_facts" type jsonb using ("rule_facts"::jsonb);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_profile_check";');
    this.addSql('alter table "user" alter column "profile" type jsonb using ("profile"::jsonb);');
    this.addSql('alter table "user" alter column "profile" set not null;');

    this.addSql('alter table "session" drop constraint if exists "session_identiy_check";');
    this.addSql('alter table "session" alter column "identiy" type varchar(255) using ("identiy"::varchar(255));');
    this.addSql('alter table "session" alter column "identiy" set not null;');
    this.addSql('alter table "session" drop constraint if exists "session_info_check";');
    this.addSql('alter table "session" alter column "info" type varchar(255) using ("info"::varchar(255));');
    this.addSql('alter table "session" drop constraint if exists "session_rule_facts_check";');
    this.addSql('alter table "session" alter column "rule_facts" type varchar(255) using ("rule_facts"::varchar(255));');
  }

}
