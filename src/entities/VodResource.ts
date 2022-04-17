import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../lib/entities/BaseEntity";

@Entity()
export class VodResource extends BaseEntity {
  @Property({ nullable: true })
  group_id?: string;

  @Property({ nullable: true })
  type_id: number;

  @Property({ nullable: true })
  type_id_1?: number;

  @Property({ nullable: true })
  type_name?: string;

  @Property({ nullable: true })
  vod_actor: string;

  @Property({ nullable: true })
  vod_area: string;

  @Property({ nullable: true })
  vod_author?: string;

  @Property({ nullable: true })
  vod_behind?: string;

  @Property({ nullable: true })
  vod_blurb?: string;

  @Property({ nullable: true })
  vod_class: string;

  @Property({ nullable: true })
  vod_color: string;

  @Property({ type: "text", nullable: true })
  vod_content: string;

  @Property({ nullable: true })
  vod_copyright: number;

  @Property({ nullable: true })
  vod_director: string;

  @Property({ nullable: true })
  vod_douban_id: number;

  @Property({ nullable: true })
  vod_douban_score: string;

  @Property({ nullable: true })
  vod_down: number;

  @Property({ nullable: true })
  vod_down_from: string;

  @Property({ nullable: true })
  vod_down_note: string;

  @Property({ nullable: true })
  vod_down_server: string;

  @Property({ nullable: true })
  vod_down_url: string;

  @Property({ nullable: true })
  vod_duration: string;

  @Property({ nullable: true })
  vod_en: string;

  @Property({ nullable: true })
  vod_hits: number;

  @Property({ nullable: true })
  vod_hits_day: number;

  @Property({ nullable: true })
  vod_hits_month: number;

  @Property({ nullable: true })
  vod_hits_week: number;

  @Property({ nullable: true })
  vod_id: number;

  @Property({ nullable: true })
  vod_isend: number;

  @Property({ nullable: true })
  vod_jumpurl: string;

  @Property({ nullable: true })
  vod_lang: string;

  @Property({ nullable: true })
  vod_letter: string;

  @Property({ nullable: true })
  vod_level: number;

  @Property({ nullable: true })
  vod_lock: number;

  @Property({ nullable: true })
  vod_name: string;

  @Property({ default: "" })
  vod_pic: string;

  @Property({ nullable: true })
  vod_pic_screenshot: string[] | string;

  @Property({ nullable: true })
  vod_pic_slide: string;

  @Property({ nullable: true })
  vod_pic_thumb: string;

  @Property({ nullable: true })
  vod_play_from: string;

  @Property({ nullable: true })
  vod_play_note: string;

  @Property({ nullable: true })
  vod_play_server: string;

  @Property({ type: "text", nullable: true })
  vod_play_url: string;

  @Property({ nullable: true })
  vod_plot: string;

  @Property({ type: "text", nullable: true })
  vod_plot_detail: string;

  @Property({ nullable: true })
  vod_plot_name: string;

  @Property({ nullable: true })
  vod_points: number;

  @Property({ nullable: true })
  vod_points_down: number;

  @Property({ nullable: true })
  vod_points_play: number;

  @Property({ nullable: true })
  vod_pubdate: string;

  @Property({ nullable: true })
  vod_pwd: string;

  @Property({ nullable: true })
  vod_pwd_down: string;

  @Property({ nullable: true })
  vod_pwd_down_url: string;

  @Property({ nullable: true })
  vod_pwd_play: string;

  @Property({ nullable: true })
  vod_pwd_play_url: string;

  @Property({ nullable: true })
  vod_pwd_url: string;

  @Property({ nullable: true })
  vod_rel_art: string;

  @Property({ nullable: true })
  vod_rel_vod: string;

  @Property({ nullable: true })
  vod_remarks: string;

  @Property({ nullable: true })
  vod_reurl: string;

  @Property({ nullable: true })
  vod_score: string;

  @Property({ nullable: true })
  vod_score_all: number;

  @Property({ nullable: true })
  vod_score_num: number;

  @Property({ nullable: true })
  vod_serial: string;

  @Property({ nullable: true })
  vod_state: string;

  @Property({ nullable: true })
  vod_status: number;

  @Property({ nullable: true })
  vod_sub: string;

  @Property({ nullable: true })
  vod_tag: string;

  @Property({ nullable: true })
  vod_time: string;

  @Property({ nullable: true })
  vod_time_add: number;

  @Property({ nullable: true })
  vod_time_hits: number;

  @Property({ nullable: true })
  vod_time_make: number;

  @Property({ nullable: true })
  vod_total: number;

  @Property({ nullable: true })
  vod_tpl: string;

  @Property({ nullable: true })
  vod_tpl_down: string;

  @Property({ nullable: true })
  vod_tpl_play: string;

  @Property({ nullable: true })
  vod_trysee: number;

  @Property({ nullable: true })
  vod_tv: string;

  @Property({ nullable: true })
  vod_up: number;

  @Property({ nullable: true })
  vod_version: string;

  @Property({ nullable: true })
  vod_weekday: string;

  @Property({ nullable: true })
  vod_writer: string;

  @Property({ nullable: true })
  vod_year: string;
}
