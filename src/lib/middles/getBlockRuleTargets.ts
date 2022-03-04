import { Context, Next } from "koa";

enum HTTPMethod {
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  POST = "POST",
}

function getGETMethodString(resourceName: string, resourceId: string): string {
  if (resourceId) {
    return `${resourceName}:${resourceId}:read`;
  }
  return `${resourceName}:list`;
}

function getPOSTMethodString(resourceName: string): string {
  return `${resourceName}:create`;
}

function getPUTMethodString(resourceName: string, resourceId: string): string {
  if (resourceId) {
    return `${resourceName}:${resourceId}:update`;
  }
  return `${resourceName}:update`;
}

function getDELETEMethodString(
  resourceName: string,
  resourceId: string
): string {
  if (resourceId) {
    return `${resourceName}:${resourceId}:delete`;
  }
  return `${resourceName}:delete`;
}

function getTargetParseByMethod(
  method: HTTPMethod,
  resourceName: string,
  resourceId: string
): string {
  switch (method) {
    case HTTPMethod.GET:
      return getGETMethodString(resourceName, resourceId);
    case HTTPMethod.POST:
      return getPOSTMethodString(resourceName);
    case HTTPMethod.PUT:
      return getPUTMethodString(resourceName, resourceId);
    case HTTPMethod.DELETE:
      return getDELETEMethodString(resourceName, resourceId);
    default:
      return "";
  }
}

export default async function getBlockRuleTargets(
  ctx: Context,
  next: Next
): Promise<void> {
  const path = ctx.path;
  const method = ctx.method;

  if (
    !path.includes("/api/") &&
    !path.includes("/login") &&
    !path.includes("/register")
  ) {
    ctx.body = "This is an invalided interface";
    ctx.status = 404;
    return;
  }

  const resource = path.split("/")[3];

  if (!resource) {
    ctx.body = "This is an invalided interface";
    ctx.status = 404;
    return;
  }

  const resourceId = path.split("/")[4];
  const target = getTargetParseByMethod(
    method as HTTPMethod,
    resource,
    resourceId
  );
  ctx.target = target;
  await next();
}
