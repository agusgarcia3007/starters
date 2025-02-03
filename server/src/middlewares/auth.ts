import { Next, Context } from "hono";
import { verify } from "hono/jwt";
import { bearerAuth } from "hono/bearer-auth";

// Extendemos el tipo de Variables de Hono
declare module "hono" {
  interface ContextVariableMap {
    userId: string;
  }
}

export const authMiddleware = async (c: Context, next: Next) => {
  const auth = bearerAuth({
    realm: "Secure Area",
    prefix: "Bearer",
    verifyToken: async (token) => {
      try {
        const payload = await verify(token, Bun.env.JWT_SECRET!);
        if (payload.sub && typeof payload.sub === "string") {
          c.set("userId", payload.sub);
          return true;
        }
        return false;
      } catch (error) {
        console.error("JWT verification error:", error);
        return false;
      }
    },
    noAuthenticationHeaderMessage: "Authorization header is required",
    invalidAuthenticationHeaderMessage: "Invalid authorization header",
    invalidTokenMessage: "Invalid token",
  });

  return auth(c, next);
};
