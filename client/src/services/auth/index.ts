import http from "@/lib/http";

export class AuthService {
  public static async login(email: string, password: string) {
    return await http.post("/auth/login", { email, password });
  }

  public static async signup(name: string, email: string, password: string) {
    return await http.post("/auth/signup", { name, email, password });
  }

  public static async getUser() {
    const { data } = await http.get("/auth/profile");
    return data;
  }

  public static async logout() {
    return await http.post("/auth/logout");
  }
}
