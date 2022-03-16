import { Context, Next } from "koa";
import DTOService from "../services/DTOService";

export default async function authMiddleware(
  ctx: Context,
  next: Next
): Promise<void> {
  const token = ctx.headers.authorization;
  const verifyRlt = new DTOService().verifyToken(token);
  if (verifyRlt.authorization) {
    ctx.state.user = verifyRlt?.decoded?.sub;
    return await next();
  }
  ctx.status = 401;
  ctx.body = {
    code: "fetch:auth:fail",
    reason: "need to login first",
  };
  return;
}
