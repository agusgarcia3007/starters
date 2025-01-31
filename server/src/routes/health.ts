import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) => {
  return c.json({ message: "Health check passed", time: Date.now() });
});

export default router;
