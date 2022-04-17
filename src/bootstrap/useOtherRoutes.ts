import Router from "@koa/router";
import Koa, { Context } from "koa";
import render from "koa-art-template";
import Container from "typedi";
import DI from "../lib/DI";
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
    await DI.orm.em.flush();
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
    await DI.orm.em.flush();
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
    await DI.orm.em.flush();
    const { id } = ctx.params;
    const vodResourceService = Container.get(VodResourceService);
    const post = await vodResourceService.findOneAndUpdateHit(+id);

    const urlWords = post?.vod_play_url?.split("$");
    const m3u8Addresses = [];
    for (let index = 0; index < urlWords?.length; index++) {
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
      range: [0, 5],
      sort: ["vod_time", "DESC"],
      filter: {
        type_name: post.type_name,
      },
    });

    const [typeTrends, typeTrendsCount] = await vodResourceService.getList({
      range: [0, 2],
      sort: ["vod_hits", "DESC"],
      filter: {
        type_name: post.type_name,
      },
    });

    let vodType = await vodTypeService.findByName(post.type_name);

    if (!vodType) {
      vodType = await vodTypeService.createOne({
        name: post.type_name,
        count: 1,
      });
    }

    await ctx.render("posts/show.art", {
      post,
      m3u8Addresses,
      types,
      typeCount,
      next,
      prev,
      maybeLikes,
      maybeLikesCount,
      typeTrends,
      typeTrendsCount,
      vodType,
    });
  });

  otherRouter.get("/types/:page", async (ctx: Context) => {
    await DI.orm.em.flush();
    const { page } = ctx.params;
    const vodTypeService = Container.get(VodTypeService);

    const types = await vodTypeService.all();

    await ctx.render("type/index.art", {
      types,
      page: parseInt(page),
    });
  });

  otherRouter.get("/search/:page", async (ctx: Context) => {
    const { q } = ctx.query;
    const { page = 1 } = ctx.params;
    const vodResourceService = Container.get(VodResourceService);
    const vodTypeService = Container.get(VodTypeService);
    try {
      const [vodResources, total] = await vodResourceService.getList({
        range: [(page - 1) * 100, page * 100 - 1],
        filter: {
          q,
        },
        sort: ["vod_time", "DESC"],
      });

      const hits = await vodResourceService.findHits(20);

      const types = await vodTypeService.all();
      const typeCount = {};
      for (let index = 0; index < types.length; index++) {
        const type = types[index];
        typeCount[type.name] = await vodResourceService.countByType(type.name);
      }

      await ctx.render("search", {
        vodResources,
        total,
        page: 1,
        hits,
        types,
        search: q,
        typeCount,
      });
    } catch (error) {
      ctx.body = error;
    }
  });

  otherRouter.get("/type_posts/:type/:page", async (ctx: Context) => {
    await DI.orm.em.flush();
    const { page = 1, type } = ctx.params;
    const vodTypeService = Container.get(VodTypeService);
    const vodResourceService = Container.get(VodResourceService);

    const vodType = await vodTypeService.getById(type);

    if (!vodType) {
      return ctx.redirect("/");
    }

    const types = await vodTypeService.all();
    const typeCount = {};
    for (let index = 0; index < types.length; index++) {
      const type = types[index];
      typeCount[type.name] = await vodResourceService.countByType(type.name);
    }

    const [typeTrends, typeTrendsCount] = await vodResourceService.getList({
      range: [0, 2],
      sort: ["vod_hits", "DESC"],
      filter: {
        type_name: vodType?.name || "未知",
      },
    });

    const [vodResources, total] = await vodResourceService.getList({
      range: [(page - 1) * 100, page * 100 - 1],
      sort: ["vod_time", "DESC"],
      filter: {
        type_name: vodType?.name || "未知",
      },
    });
    await ctx.render("type/list.art", {
      vodType,
      types,
      typeCount,
      page: parseInt(page),
      typeTrends,
      typeTrendsCount,
      vodResources,
      total,
    });
  });

  otherRouter.get("/posts/:id/play/:index", async (ctx: Context) => {
    await DI.orm.em.flush();
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

    let vodType = await vodTypeService.findByName(post.type_name);
    if (!vodType) {
      ctx.redirect("/");
    }

    if (!vodType) {
      vodType = await vodTypeService.createOne({
        name: post.type_name,
        count: 1,
      });
    }

    const next = await vodResourceService.getById(+post.id + 1);
    const prev = await vodResourceService.getById(+post.id - 1 || 0);

    const [maybeLikes, maybeLikesCount] = await vodResourceService.getList({
      range: [0, 5],
      sort: ["vod_time", "DESC"],
      filter: {
        type_name: post.type_name,
      },
    });

    await ctx.render("posts/play.art", {
      post,
      playUrl: m3u8Addresses[index],
      index: parseInt(index),
      types: types.map((type) => type.name || "未知"),
      vodType,
      next,
      prev,
      m3u8Addresses,
      maybeLikes,
      maybeLikesCount,
    });
  });

  otherRouter.get("/_imgs/:filename", async (ctx: Context) => {
    await DI.orm.em.flush();
    const filepath = "/images/" + ctx.params.filename;
    try {
      const storageService = Container.get(StorageFileService);
      const storageFile = await storageService.findOneByPath(filepath);
      if (storageFile) {
        const buffer = await storageService.catFile(storageFile);
        ctx.response.set("content-type", storageFile.type);
        ctx.body = buffer;
      }
      ctx.response.set("content-type", "image/png");
      ctx.body = null;
    } catch (error) {
      console.error(error);
      ctx.response.set("content-type", "image/png");
      ctx.body = null;
    }
  });

  app.use(otherRouter.routes()).use(otherRouter.allowedMethods());
}
