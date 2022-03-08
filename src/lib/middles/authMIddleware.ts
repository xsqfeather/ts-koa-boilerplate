import { Context, Next } from "koa";

export default function authMiddleware(
  ctx: Context,
  next: Next
): Promise<void> {
  return;
}
