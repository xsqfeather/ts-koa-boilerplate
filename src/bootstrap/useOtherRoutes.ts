import Router from "@koa/router";
import Koa, { Context } from "koa";
import render from "koa-art-template";

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
    const users = [{ name: "Dead Horse" }, { name: "Jack" }, { name: "Tom" }];

    await ctx.render("home", {
      users,
    });
  });
  otherRouter.get("/_imgs/:filename", (ctx: Context) => {
    const filepath = "/images/" + ctx.params.filename;
  });

  app.use(otherRouter.routes()).use(otherRouter.allowedMethods());
}
