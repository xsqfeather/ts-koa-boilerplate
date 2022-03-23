import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class VodResource extends BaseEntity {
  @Property()
  group_id: string;

  @Property()
  type_id: number;

  @Property()
  type_id_1: number;

  @Property()
  type_name: string;

  @Property()
  vod_actor: string;

  @Property()
  vod_area: string;

  @Property()
  vod_author: string;

  @Property()
  vod_behind: string;

  @Property()
  vod_blurb: string;

  @Property()
  vod_class: string;

  @Property()
  vod_color: string;

  @Property()
  vod_content: string;

  @Property()
  vod_copyright: number;

  @Property()
  vod_director: string;

  @Property()
  vod_douban_id: number;

  @Property()
  vod_douban_score: string;

  @Property()
  vod_down: number;

  @Property()
  vod_down_from: string;

  @Property()
  vod_down_note: string;

  @Property()
  vod_down_server: string;

  @Property()
  vod_down_url: string;

  @Property()
  vod_duration: string;

  @Property()
  vod_en: string;

  @Property()
  vod_hits: number;

  @Property()
  vod_hits_day: number;

  @Property()
  vod_hits_month: number;

  @Property()
  vod_hits_week: number;

  @Property()
  vod_id: number;

  @Property()
  vod_isend: number;

  @Property()
  vod_jumpurl: string;

  @Property()
  vod_lang: string;

  @Property()
  vod_letter: string;

  @Property()
  vod_level: number;

  @Property()
  vod_lock: number;

  @Property()
  vod_name: string;

  @Property()
  vod_pic: string;

  @Property({ nullable: true })
  vod_pic_screenshot: string[] | string;

  @Property()
  vod_pic_slide: string;

  @Property()
  vod_pic_thumb: string;

  @Property()
  vod_play_from: string;

  @Property()
  vod_play_note: string;

  @Property()
  vod_play_server: string;

  @Property()
  vod_play_url: string;

  @Property()
  vod_plot: string;

  @Property()
  vod_plot_detail: string;

  @Property()
  vod_plot_name: string;

  @Property()
  vod_points: number;

  @Property()
  vod_points_down: number;

  @Property()
  vod_points_play: number;

  @Property()
  vod_pubdate: string;

  @Property()
  vod_pwd: string;

  @Property()
  vod_pwd_down: string;

  @Property()
  vod_pwd_down_url: string;

  @Property()
  vod_pwd_play: string;

  @Property()
  vod_pwd_play_url: string;

  @Property()
  vod_pwd_url: string;

  @Property()
  vod_rel_art: string;

  @Property()
  vod_rel_vod: string;

  @Property()
  vod_remarks: string;

  @Property()
  vod_reurl: string;

  @Property()
  vod_score: string;

  @Property()
  vod_score_all: number;

  @Property()
  vod_score_num: number;

  @Property()
  vod_serial: string;

  @Property()
  vod_state: string;

  @Property()
  vod_status: number;

  @Property()
  vod_sub: string;

  @Property()
  vod_tag: string;

  @Property()
  vod_time: string;

  @Property()
  vod_time_add: number;

  @Property()
  vod_time_hits: number;

  @Property()
  vod_time_make: number;

  @Property()
  vod_total: number;

  @Property()
  vod_tpl: string;

  @Property()
  vod_tpl_down: string;

  @Property()
  vod_tpl_play: string;

  @Property()
  vod_trysee: number;

  @Property()
  vod_tv: string;

  @Property()
  vod_up: number;

  @Property()
  vod_version: string;

  @Property()
  vod_weekday: string;

  @Property()
  vod_writer: string;

  @Property()
  vod_year: string;
}
