import { AuthService } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => AuthService.getUser(),
  });
};
