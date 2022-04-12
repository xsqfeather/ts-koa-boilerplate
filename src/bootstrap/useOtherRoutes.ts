import Router from "@koa/router";
import Koa, { Context } from "koa";
import render from "koa-art-template";
import Container from "typedi";
import StorageFileService from "../lib/services/StorageFileService";
import VodResourceService from "../services/VodResourceService";
import VodTypeService from "../services/VodTypeService";

const otherRouter = new Router();

export default function useOtherRoutes(
  app: Koa<Koa.DefaultState, Koa.DefaultContext>
): void {
  render(app, {
    root: `${process.cwd()}/views`,
  });
  app.use(function (ctx, next) {
    ctx.state = ctx.state || {};
    ctx.state.now = new Date();
    ctx.state.ip = ctx.ip;
    ctx.state.version = "2.0.0";
    return next();
  });
  otherRouter.get("/", async (ctx: Context) => {
    const vodResourceService = Container.get(VodResourceService);
    const vodTypeService = Container.get(VodTypeService);
    const [vodResources, total] = await vodResourceService.getList({
      range: [0, 99],
      sort: ["vod_time", "DESC"],
    });

    const hits = await vodResourceService.findHits(20);
    const [types] = await vodTypeService.getList({
      range: [0, 99],
    });

    await ctx.render("home", {
      vodResources,
      total,
      page: 1,
      hits,
      types: types.map((type) => type.name || "未知"),
    });
  });
  otherRouter.get("/pages/:page", async (ctx: Context) => {
    const { page } = ctx.params;
    const vodResourceService = Container.get(VodResourceService);
    const [vodResources, total] = await vodResourceService.getList({
      range: [(page - 1) * 100, page * 100 - 1],
      sort: ["vod_time", "DESC"],
    });
    const vodTypeService = Container.get(VodTypeService);

    const [types] = await vodTypeService.getList({
      range: [0, 99],
    });

    const hits = await vodResourceService.findHits(20);

    await ctx.render("home", {
      vodResources,
      total,
      page: parseInt(page),
      hits,
      types: types.map((type) => type.name || "未知"),
    });
  });
  otherRouter.get("/posts/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const vodResourceService = Container.get(VodResourceService);
    const post = await vodResourceService.getById(+id);
    const urlWords = post.vod_play_url.split("$");
    const m3u8Addresses = [];
    for (let index = 0; index < urlWords.length; index++) {
      const word = urlWords[index];
      if (word.includes("m3u8")) {
        m3u8Addresses.push(word.replace(/\.m3u8.*/, ".m3u8"));
      }
    }
    const vodTypeService = Container.get(VodTypeService);

    const types = await vodTypeService.all();
    const typeCount = {};
    for (let index = 0; index < types.length; index++) {
      const type = types[index];
      typeCount[type.name] = await vodResourceService.countByType(type.name);
    }

    const next = await vodResourceService.getById(+post.id + 1);
    const prev = await vodResourceService.getById(+post.id - 1 || 0);

    const [maybeLikes, maybeLikesCount] = await vodResourceService.getList({
      range: [0, 2],
      sort: ["vod_time", "DESC"],
      filter: {
        type_name: post.type_name,
      },
    });

    await ctx.render("posts/show.art", {
      post,
      m3u8Addresses,
      types: types.map((type) => type.name || "未知"),
      typeCount,
      next,
      prev,
      maybeLikes,
      maybeLikesCount,
    });
  });

  otherRouter.get("/types/:page", async (ctx: Context) => {
    const { page } = ctx.params;
    const vodTypeService = Container.get(VodTypeService);

    const types = await vodTypeService.all();

    const typeNames = types.map((type) => type.name || "未知");
    for (let index = 0; index < typeNames.length; index++) {
      const count = await vodTypeService.countByName(typeNames[index]);
      if (count > 1) {
        await vodTypeService.deleteByName(typeNames[index]);
      }
    }
    await ctx.render("type/index.art", {
      types: typeNames,
      page: parseInt(page),
    });
  });

  otherRouter.get("/posts/:id/play/:index", async (ctx: Context) => {
    const { index, id } = ctx.params;
    const vodResourceService = Container.get(VodResourceService);
    const post = await vodResourceService.getById(+id);
    const urlWords = post.vod_play_url.split("$");
    const vodTypeService = Container.get(VodTypeService);

    const [types] = await vodTypeService.getList({
      range: [0, 99],
    });
    const m3u8Addresses = [];
    for (let index = 0; index < urlWords.length; index++) {
      const word = urlWords[index];
      if (word.includes("m3u8")) {
        m3u8Addresses.push(word.replace(/\.m3u8.*/, ".m3u8"));
      }
    }

    await ctx.render("posts/play.art", {
      post,
      playUrl: m3u8Addresses[index],
      index: parseInt(index),
      types: types.map((type) => type.name || "未知"),
    });
  });

  otherRouter.get("/_imgs/:filename", async (ctx: Context) => {
    const filepath = "/images/" + ctx.params.filename;
    const storageService = Container.get(StorageFileService);
    const storageFile = await storageService.findOneByPath(filepath);
    const buffer = await storageService.catFile(storageFile);
    ctx.response.set("content-type", storageFile.type);
    ctx.body = buffer;
  });

  app.use(otherRouter.routes()).use(otherRouter.allowedMethods());
}
