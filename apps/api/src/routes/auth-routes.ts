import type { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "../auth.js";

export function registerAuthRoutes(app: OpenAPIHono) {
  app.on(["POST", "GET"], "/api/auth/**", (c) => {
    return auth.handler(c.req.raw);
  });
}
