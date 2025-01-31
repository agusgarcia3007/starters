import authRouter from "@/routes/auth";
import healthRouter from "@/routes/health";
import { Hono } from "hono";

export const routes: { path: string; router: Hono }[] = [
  {
    path: `/auth`,
    router: authRouter,
  },
  {
    path: `/health`,
    router: healthRouter,
  },
];
