import cors from "@koa/cors";
import { bootstrapControllers } from "amala";
import Koa from "koa";
import getBlockRuleTargets from "../lib/middles/getBlockRuleTargets";

export default async function useMiddles(): Promise<
  Koa<Koa.DefaultState, Koa.DefaultContext>
> {
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
      ctx.status = err?.output?.statusCode || 500;
      ctx.body = err?.data ? err.data : err;
    },
  });

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(getBlockRuleTargets);
  app.use(router.routes()).use(router.allowedMethods());

  return app;
}
