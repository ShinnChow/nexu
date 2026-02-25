import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { registerAuthRoutes } from "./routes/auth-routes.js";
import { registerBotRoutes } from "./routes/bot-routes.js";
import { registerChannelRoutes } from "./routes/channel-routes.js";
import { registerPoolRoutes } from "./routes/pool-routes.js";
import { authMiddleware } from "./middleware/auth.js";

type AppBindings = {
  Variables: {
    userId: string;
    session: unknown;
  };
};

export function createApp() {
  const app = new OpenAPIHono<AppBindings>();

  app.use("*", logger());
  app.use(
    "*",
    cors({
      origin: process.env.WEB_URL ?? "http://localhost:5173",
      credentials: true,
    }),
  );

  registerAuthRoutes(app);

  app.use("/v1/*", authMiddleware);

  registerBotRoutes(app);
  registerChannelRoutes(app);
  registerPoolRoutes(app);

  app.doc("/openapi.json", {
    openapi: "3.1.0",
    info: { title: "Nexu API", version: "1.0.0" },
  });

  app.get("/health", (c) => c.json({ status: "ok" }));

  return app;
}
