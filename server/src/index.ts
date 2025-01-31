import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { routes } from "./routes/index";

const app = new Hono();

// Middlewares
app.use(cors()).use(logger()).use(prettyJSON());

// Routes
routes.forEach(({ path, router }) => {
  app.route(path, router);
});

export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 4444,
};
