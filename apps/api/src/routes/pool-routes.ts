import { createRoute, z } from "@hono/zod-openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { openclawConfigSchema } from "@nexu/shared";
import { generatePoolConfig } from "../lib/config-generator.js";
import { db } from "../db/index.js";

const errorResponseSchema = z.object({
  message: z.string(),
});

const poolIdParam = z.object({
  poolId: z.string(),
});

const getPoolConfigRoute = createRoute({
  method: "get",
  path: "/api/internal/pools/{poolId}/config",
  tags: ["Internal"],
  request: {
    params: poolIdParam,
  },
  responses: {
    200: {
      content: { "application/json": { schema: openclawConfigSchema } },
      description: "Generated OpenClaw config",
    },
    404: {
      content: { "application/json": { schema: errorResponseSchema } },
      description: "Pool not found",
    },
  },
});

export function registerPoolRoutes(app: OpenAPIHono) {
  app.openapi(getPoolConfigRoute, async (c) => {
    const { poolId } = c.req.valid("param");
    try {
      const config = await generatePoolConfig(db, poolId);
      return c.json(config, 200);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      if (message.includes("not found")) {
        return c.json({ message }, 404);
      }
      throw error;
    }
  });
}
