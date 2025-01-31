import { db } from "@/db";
import { sessionsTable } from "@/db/schema";
import { sign } from "hono/jwt";

export const createSession = async (userId: string, userAgent?: string) => {
  // Token expires in 7 days
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  // Crear token con la misma estructura que usamos en login
  const token = await sign({ sub: userId }, Bun.env.JWT_SECRET!);

  const [session] = await db
    .insert(sessionsTable)
    .values({
      userId,
      token,
      userAgent,
      expiresAt,
    })
    .returning();

  return session;
};
