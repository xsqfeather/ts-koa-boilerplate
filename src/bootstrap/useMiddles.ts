import cors from "@koa/cors";
// import Router from "@koa/router";
import { bootstrapControllers } from "amala";
import Koa from "koa";
import serve from "koa-static";
import getBlockRuleTargets from "../lib/middles/getBlockRuleTargets";
import mount from "koa-mount";
import { koaSwagger } from "koa2-swagger-ui";

export default async function useMiddles(): Promise<
  Koa<Koa.DefaultState, Koa.DefaultContext>
> {
  // const pageRouter = new Router();
  const { app, router } = await bootstrapControllers({
    basePath: "/api",
    controllers: [
      __dirname + "/../controllers/**/*.controller.ts",
      __dirname + "/../lib/controllers/**/*.controller.ts",
    ],
    versions: {
      1: true,
      2: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandler: async (err: any, ctx: Koa.Context) => {
      console.error(err);
      ctx.status = err?.output?.statusCode || 500;
      ctx.body = err?.data ? err.data : err;
    },
    flow: [getBlockRuleTargets],
    enableOpenApi: true,
    openApiPath: "/api/doc",
  });

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(
    koaSwagger({
      routePrefix: "/swagger", // host at /swagger instead of default /docs
      swaggerOptions: {
        url: "/api/doc", // example path to json
      },
    })
  );

  app.use(mount("/statics/", serve(process.cwd() + "/statics/")));

  // pageRouter.get("/_imgs/:filename", (ctx: Context) => {
  //   ctx.body = "hello";
  // });

  // app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
