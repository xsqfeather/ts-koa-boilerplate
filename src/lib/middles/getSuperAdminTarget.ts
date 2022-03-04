import { Context, Next } from "koa";

export default async function getSuperAdminTarget(
  ctx: Context,
  next: Next
): Promise<void> {
  if (ctx.isSuper) {
    return await next();
  }
}
