import { Context, Next } from "hono";
import { db } from "@/db";
import { sessionsTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verify } from "hono/jwt";

// Declare custom variables in Hono context
declare module "hono" {
  interface ContextVariableMap {
    userId: string;
  }
}

export async function authMiddleware(c: Context, next: Next) {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token provided");
      return c.json({ error: "No token provided" }, 401);
    }

    const payload = await verify(token, Bun.env.JWT_SECRET!);
    const userId = payload.sub as string;

    // Check if token exists and is valid in database
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(
        and(eq(sessionsTable.token, token), eq(sessionsTable.isValid, true))
      );

    if (!session) {
      return c.json({ error: "Invalid or expired session" }, 401);
    }

    // Set userId in context for use in routes
    c.set("userId", userId);

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ error: "Invalid token" }, 401);
  }
}
