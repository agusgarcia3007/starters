import { Profile } from "@/components/auth/profile";
import { ServerPrefetch } from "@/components/query/server-prefetch";
import { AuthService } from "@/services/auth";

export default function ProfilePage() {
  return (
    <ServerPrefetch
      queryKey={["profile"]}
      queryFn={() => AuthService.getUser()}
    >
      <Profile />
    </ServerPrefetch>
  );
}
