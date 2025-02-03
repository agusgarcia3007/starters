import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { routes } from "./routes/index";

const app = new Hono();

app
  .use(
    cors({
      origin: Bun.env.CORS_ORIGIN || "*",
      credentials: true,
    })
  )
  .use(logger())
  .use(prettyJSON())
  .use(secureHeaders());

// Not Found handler
app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

// Routes
routes.forEach(({ path, router }) => {
  app.route(path, router);
});

export default {
  fetch: app.fetch,
  port: Bun.env.PORT || 4444,
};
