import { db } from "@/db";
import { sessionsTable, usersTable, type UsersInsert } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/hashing";
import { createSession } from "@/lib/sessions";
import { eq, and, ne } from "drizzle-orm";
import { Hono } from "hono";
import { authMiddleware } from "@/middlewares/auth";
import { sign } from "hono/jwt";

const auth = new Hono();

auth.post("/signup", async (c) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const hashedPassword = await hashPassword(password);

    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      return c.json({ error: "Email already exists" }, 400);
    }

    const user: UsersInsert = {
      name,
      email,
      password: hashedPassword,
    };

    const [newUser] = await db.insert(usersTable).values(user).returning();

    const token = await createSession(newUser.id, c.req.header("user-agent"));

    return c.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      token: token.token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

auth.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    // Invalidar sesiones anteriores
    await db
      .update(sessionsTable)
      .set({ isValid: false })
      .where(eq(sessionsTable.userId, user.id));

    // Crear nueva sesión usando la función createSession
    const session = await createSession(user.id, c.req.header("user-agent"));

    return c.json({
      token: session.token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

auth.post("/logout", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json({ error: "No token provided" }, 401);
    }

    // Invalidate the session
    await db
      .update(sessionsTable)
      .set({ isValid: false })
      .where(eq(sessionsTable.token, token));

    return c.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

auth.get("/profile", authMiddleware, async (c) => {
  try {
    const userId = c.get("userId");

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default auth;
