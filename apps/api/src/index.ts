import "dotenv/config";
import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { migrate } from "./db/migrate.js";

migrate();

const app = createApp();
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Nexu API listening on http://localhost:${info.port}`);
});
